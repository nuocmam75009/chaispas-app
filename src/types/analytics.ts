export interface DecisionHistory {
  id: string;
  timestamp: Date;
  choices: Choice[];
  selectedChoice: Choice;
  decisionTime: number; // in milliseconds
}

export interface Choice {
  id: string;
  text: string;
  number: number;
}

export interface AnalyticsData {
  totalDecisions: number;
  averageChoicesPerDecision: number;
  mostCommonChoices: Array<{ text: string; count: number }>;
  decisionHistory: DecisionHistory[];
  recentDecisions: DecisionHistory[];
  totalChoices: number;
  averageDecisionTime: number;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }>;
}