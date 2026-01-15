export interface BudgetItem {
  id: string;
  name: string;
  planned: number;
  actual: number;
  category: 'income' | 'expense';
  subcategory: string;
}

export interface MonthlyBudget {
  month: string;
  year: number;
  income: BudgetItem[];
  expenses: BudgetItem[];
}

export interface BudgetSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  savingsRate: number;
}
