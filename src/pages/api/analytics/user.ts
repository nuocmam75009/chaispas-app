import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/db';

interface DecodedToken {
  userId: string;
  email: string;
  username: string;
}

interface DecisionWithChoices {
  id: string;
  userId: string;
  selectedChoiceId: string;
  decisionTime: number;
  createdAt: Date;
  choices: Array<{
    id: string;
    text: string;
    number: number;
    userId: string;
    decisionId: string | null;
  }>;
  selectedChoice: {
    id: string;
    text: string;
    number: number;
    userId: string;
    decisionId: string | null;
  };
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Get user's decisions with choices
    const decisions = await prisma.decision.findMany({
      where: { userId: decoded.userId },
      include: {
        choices: true,
        selectedChoice: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (decisions.length === 0) {
      return res.status(200).json({
        totalDecisions: 0,
        averageChoicesPerDecision: 0,
        mostCommonChoices: [],
        decisionHistory: [],
        recentDecisions: [],
        totalChoices: 0,
        averageDecisionTime: 0,
      });
    }

    // Calculate analytics
    const totalDecisions = decisions.length;
    const totalChoices = decisions.reduce((sum: number, decision: DecisionWithChoices) => sum + decision.choices.length, 0);
    const averageChoicesPerDecision = totalChoices / totalDecisions;
    const averageDecisionTime = decisions.reduce((sum: number, decision: DecisionWithChoices) => sum + decision.decisionTime, 0) / totalDecisions;

    // Get most common choices
    const choiceCounts: { [key: string]: number } = {};
    decisions.forEach((decision: DecisionWithChoices) => {
      decision.choices.forEach((choice) => {
        choiceCounts[choice.text] = (choiceCounts[choice.text] || 0) + 1;
      });
    });

    const mostCommonChoices = Object.entries(choiceCounts)
      .map(([text, count]) => ({ text, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Format decision history
    const decisionHistory = decisions.map((decision: DecisionWithChoices) => ({
      id: decision.id,
      timestamp: decision.createdAt,
      choices: decision.choices,
      selectedChoice: decision.selectedChoice,
      decisionTime: decision.decisionTime,
    }));

    const recentDecisions = decisionHistory.slice(0, 10);

    res.status(200).json({
      totalDecisions,
      averageChoicesPerDecision: Math.round(averageChoicesPerDecision * 100) / 100,
      mostCommonChoices,
      decisionHistory,
      recentDecisions,
      totalChoices,
      averageDecisionTime: Math.round(averageDecisionTime),
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}