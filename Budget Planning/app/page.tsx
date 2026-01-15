'use client';

import { useState } from 'react';
import MonthSelector from '@/components/MonthSelector';
import BudgetSummary from '@/components/BudgetSummary';
import BudgetTable from '@/components/BudgetTable';
import AddItemModal from '@/components/AddItemModal';
import { sampleBudgetData } from '@/data/sampleData';
import { calculateBudgetSummary } from '@/lib/utils';
import { BudgetItem } from '@/types/budget';

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(sampleBudgetData.month);
  const [currentYear, setCurrentYear] = useState(sampleBudgetData.year);
  const [income, setIncome] = useState<BudgetItem[]>(sampleBudgetData.income);
  const [expenses, setExpenses] = useState<BudgetItem[]>(sampleBudgetData.expenses);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const summary = calculateBudgetSummary(income, expenses);

  // Get unique subcategories
  const incomeSubcategories = [...new Set(income.map(item => item.subcategory))];
  const expenseSubcategories = [...new Set(expenses.map(item => item.subcategory))];

  const handleAddIncome = (item: Omit<BudgetItem, 'id'>) => {
    const newItem: BudgetItem = {
      ...item,
      id: Date.now().toString()
    };
    setIncome([...income, newItem]);
  };

  const handleAddExpense = (item: Omit<BudgetItem, 'id'>) => {
    const newItem: BudgetItem = {
      ...item,
      id: Date.now().toString()
    };
    setExpenses([...expenses, newItem]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-subtle sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Budget Planning</h1>
              <p className="text-sm text-gray-600 mt-0.5">Manage your finances wisely</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsIncomeModalOpen(true)}
                className="btn-secondary"
              >
                + Income
              </button>
              <button
                onClick={() => setIsExpenseModalOpen(true)}
                className="btn-primary"
              >
                + Expense
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Month Selector */}
        <MonthSelector
          currentMonth={currentMonth}
          currentYear={currentYear}
          onMonthChange={setCurrentMonth}
          onYearChange={setCurrentYear}
        />

        {/* Summary */}
        <BudgetSummary summary={summary} />

        {/* Income Table */}
        <BudgetTable
          items={income}
          title="Income"
          type="income"
        />

        {/* Expenses Table */}
        <BudgetTable
          items={expenses}
          title="Expenses"
          type="expense"
        />

        {/* Net Balance */}
        <div className="card p-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">Net Balance</h3>
              <p className="text-4xl font-bold font-mono tracking-tight">
                {summary.balance >= 0 ? '+' : ''}{new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(summary.balance)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-medium">Status</p>
              <div className={`px-6 py-3 ${summary.balance >= 0
                  ? 'bg-black text-white'
                  : 'bg-gray-700 text-white'
                } font-bold uppercase tracking-wider text-sm shadow-subtle`}>
                {summary.balance >= 0 ? 'Surplus' : 'Deficit'}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="card p-5 text-center">
          <p className="text-sm text-gray-600">
            💡 <span className="font-medium">Tip:</span> Aim for at least 20% savings rate from your monthly income
          </p>
        </div>
      </main>

      {/* Modals */}
      <AddItemModal
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        onAdd={handleAddIncome}
        type="income"
        subcategories={incomeSubcategories}
      />

      <AddItemModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onAdd={handleAddExpense}
        type="expense"
        subcategories={expenseSubcategories}
      />
    </div>
  );
}
