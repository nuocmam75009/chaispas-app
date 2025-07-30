import { DecisionHistory, AnalyticsData, Choice } from '../types/analytics';

const STORAGE_KEY = 'chaispas_analytics';

export const saveDecision = (choices: Choice[], selectedChoice: Choice, decisionTime: number): void => {
  const history = getDecisionHistory();

  const newDecision: DecisionHistory = {
    id: Date.now().toString(),
    timestamp: new Date(),
    choices,
    selectedChoice,
    decisionTime,
  };

  history.push(newDecision);

  // Keep only last 100 decisions to prevent localStorage overflow
  if (history.length > 100) {
    history.splice(0, history.length - 100);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const getDecisionHistory = (): DecisionHistory[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const history = JSON.parse(stored);
    return history.map((item: DecisionHistory) => ({
      ...item,
      timestamp: new Date(item.timestamp),
    }));
  } catch (error) {
    console.error('Error loading decision history:', error);
    return [];
  }
};

export const calculateAnalytics = (): AnalyticsData => {
  const history = getDecisionHistory();

  if (history.length === 0) {
    return {
      totalDecisions: 0,
      averageChoicesPerDecision: 0,
      mostCommonChoices: [],
      decisionHistory: [],
      recentDecisions: [],
      totalChoices: 0,
      averageDecisionTime: 0,
    };
  }

  // Calculate total choices
  const totalChoices = history.reduce((sum, decision) => sum + decision.choices.length, 0);

  // Calculate average choices per decision
  const averageChoicesPerDecision = totalChoices / history.length;

  // Calculate average decision time
  const totalDecisionTime = history.reduce((sum, decision) => sum + decision.decisionTime, 0);
  const averageDecisionTime = totalDecisionTime / history.length;

  // Get most common choices
  const choiceCounts: { [key: string]: number } = {};
  history.forEach(decision => {
    decision.choices.forEach(choice => {
      choiceCounts[choice.text] = (choiceCounts[choice.text] || 0) + 1;
    });
  });

  const mostCommonChoices = Object.entries(choiceCounts)
    .map(([text, count]) => ({ text, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Get recent decisions (last 10)
  const recentDecisions = history.slice(-10).reverse();

  return {
    totalDecisions: history.length,
    averageChoicesPerDecision: Math.round(averageChoicesPerDecision * 100) / 100,
    mostCommonChoices,
    decisionHistory: history,
    recentDecisions,
    totalChoices,
    averageDecisionTime: Math.round(averageDecisionTime),
  };
};

export const clearAnalytics = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const exportAnalytics = (): string => {
  const history = getDecisionHistory();
  return JSON.stringify(history, null, 2);
};

export const importAnalytics = (data: string): boolean => {
  try {
    const history = JSON.parse(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return true;
  } catch (error) {
    console.error('Error importing analytics:', error);
    return false;
  }
};