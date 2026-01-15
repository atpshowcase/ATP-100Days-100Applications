'use client';

import { BudgetSummary as BudgetSummaryType } from '@/types/budget';
import { formatCurrency } from '@/lib/utils';

interface BudgetSummaryProps {
    summary: BudgetSummaryType;
}

export default function BudgetSummary({ summary }: BudgetSummaryProps) {
    return (
        <div className="card p-8">
            <h2 className="text-xl font-bold mb-6 tracking-tight">Financial Summary</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Income */}
                <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">Total Income</span>
                    <p className="font-mono font-bold text-2xl tracking-tight">{formatCurrency(summary.totalIncome)}</p>
                </div>

                {/* Expenses */}
                <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">Total Expenses</span>
                    <p className="font-mono font-bold text-2xl tracking-tight">{formatCurrency(summary.totalExpenses)}</p>
                </div>

                {/* Balance */}
                <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">Balance</span>
                    <p className={`font-mono font-bold text-2xl tracking-tight ${summary.balance >= 0 ? 'text-black' : 'text-gray-600'}`}>
                        {formatCurrency(summary.balance)}
                    </p>
                </div>

                {/* Savings Rate */}
                <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">Savings Rate</span>
                    <p className="font-mono font-bold text-2xl tracking-tight">{summary.savingsRate.toFixed(1)}%</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-600">Savings Progress</span>
                    <span className="text-xs font-medium text-gray-600">Target: 20%</span>
                </div>
                <div className="h-3 bg-gray-100 relative overflow-hidden rounded-sm">
                    <div
                        className="h-full bg-black transition-all duration-700 ease-out"
                        style={{ width: `${Math.min(Math.max(summary.savingsRate, 0), 100)}%` }}
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center font-medium">
                    {summary.savingsRate >= 20 ? '✓ Target achieved!' : `${(20 - summary.savingsRate).toFixed(1)}% more to reach target`}
                </p>
            </div>
        </div>
    );
}
