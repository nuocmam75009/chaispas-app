import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/db';
import { PrismaClient } from '@prisma/client';

interface DecodedToken {
  userId: string;
  email: string;
  username: string;
}

interface Choice {
  text: string;
  number: number;
  selectedChoiceId: number
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
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

    const { choices, selectedChoice, decisionTime } = req.body;

    if (!choices || !selectedChoice || !decisionTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create decision with choices in a transaction
    const decision = await prisma.$transaction(async (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>) => {
      // Create all choices first
      const createdChoices = await Promise.all(
        choices.map((choice: Choice) =>
          tx.choice.create({
            data: {
              text: choice.text,
              number: choice.number,
              userId: decoded.userId,
            },
          })
        )
      );

      // Find the selected choice
      const selectedChoiceRecord = createdChoices.find(
        (choice) => choice.text === selectedChoice.text && choice.number === selectedChoice.number
      );

      if (!selectedChoiceRecord) {
        throw new Error('Selected choice not found');
      }

      // Create the decision with the selected choice
      const decision = await tx.decision.create({
        data: {
          userId: decoded.userId,
          decisionTime,
          selectedChoiceId: selectedChoiceRecord.id,
        },
      });

      // Update choices with decision ID
      await Promise.all(
        createdChoices.map((choice) =>
          tx.choice.update({
            where: { id: choice.id },
            data: { decisionId: decision.id },
          })
        )
      );

      return decision;
    });

    res.status(201).json({
      success: true,
      decisionId: decision.id,
    });
  } catch (error) {
    console.error('Save decision error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}