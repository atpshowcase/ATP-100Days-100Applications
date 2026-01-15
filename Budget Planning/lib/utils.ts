import { BudgetItem, BudgetSummary } from '@/types/budget';

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

export const calculateTotal = (items: BudgetItem[], field: 'planned' | 'actual'): number => {
    return items.reduce((sum, item) => sum + item[field], 0);
};

export const calculateBudgetSummary = (
    income: BudgetItem[],
    expenses: BudgetItem[]
): BudgetSummary => {
    const totalIncome = calculateTotal(income, 'actual');
    const totalExpenses = calculateTotal(expenses, 'actual');
    const balance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (balance / totalIncome) * 100 : 0;

    return {
        totalIncome,
        totalExpenses,
        balance,
        savingsRate
    };
};

export const getVariance = (planned: number, actual: number): number => {
    return actual - planned;
};

export const getVariancePercentage = (planned: number, actual: number): number => {
    if (planned === 0) return 0;
    return ((actual - planned) / planned) * 100;
};
