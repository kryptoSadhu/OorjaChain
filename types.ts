export type Page = 'dashboard' | 'calculator' | 'wallet' | 'chatbot' | 'about';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface EarningData {
  name: string;
  earnings: number;
}

export interface Transaction {
  id: string;
  date: string;
  amountBTC: number;
  amountINR: number;
  network: string;
  address: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface CalculatorInput {
  panelCapacity: number;
  sunlightHours: number;
  electricityCost: number;
  excessPowerAllocation: number;
}

export interface GeminiResponse {
  dailyEarningsBTC: number;
  dailyEarningsINR: number;
  monthlyEarningsBTC: number;
  monthlyEarningsINR: number;
  yearlyEarningsBTC: number;
  yearlyEarningsINR: number;
  analysis: string;
  assumptions: string[];
}