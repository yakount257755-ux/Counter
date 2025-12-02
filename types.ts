export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
  isAi?: boolean;
}

export enum CalculatorMode {
  STANDARD = 'STANDARD',
  AI_SOLVER = 'AI_SOLVER',
}

export type Theme = 'light' | 'dark';

export interface ButtonConfig {
  label: string;
  value: string;
  type: 'number' | 'operator' | 'action' | 'scientific';
  className?: string;
  secondaryLabel?: string; // For Burmese numeral toggle
}