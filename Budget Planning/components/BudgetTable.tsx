'use client';

import { BudgetItem } from '@/types/budget';
import { formatCurrency, getVariance } from '@/lib/utils';
import { useState } from 'react';

interface BudgetTableProps {
    items: BudgetItem[];
    title: string;
    type: 'income' | 'expense';
}

export default function BudgetTable({ items, title, type }: BudgetTableProps) {
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

    // Group items by subcategory
    const groupedItems = items.reduce((acc, item) => {
        if (!acc[item.subcategory]) {
            acc[item.subcategory] = [];
        }
        acc[item.subcategory].push(item);
        return acc;
    }, {} as Record<string, BudgetItem[]>);

    const toggleCategory = (category: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(category)) {
            newExpanded.delete(category);
        } else {
            newExpanded.add(category);
        }
        setExpandedCategories(newExpanded);
    };

    const calculateCategoryTotal = (categoryItems: BudgetItem[], field: 'planned' | 'actual') => {
        return categoryItems.reduce((sum, item) => sum + item[field], 0);
    };

    return (
        <div className="card overflow-hidden">
            <div className="bg-black text-white px-6 py-4">
                <h2 className="text-lg font-bold uppercase tracking-wider">{title}</h2>
            </div>

            <div className="divide-y divide-gray-200">
                {Object.entries(groupedItems).map(([subcategory, categoryItems]) => {
                    const isExpanded = expandedCategories.has(subcategory);
                    const plannedTotal = calculateCategoryTotal(categoryItems, 'planned');
                    const actualTotal = calculateCategoryTotal(categoryItems, 'actual');
                    const variance = getVariance(plannedTotal, actualTotal);

                    return (
                        <div key={subcategory}>
                            {/* Category Header */}
                            <button
                                onClick={() => toggleCategory(subcategory)}
                                className="w-full px-6 py-4 hover:bg-gray-50 transition-colors text-left flex justify-between items-center group"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-400 group-hover:text-black transition-colors">
                                        {isExpanded ? '▼' : '▶'}
                                    </span>
                                    <span className="font-semibold uppercase text-xs tracking-wider">{subcategory}</span>
                                </div>
                                <div className="flex gap-12 font-mono text-sm">
                                    <div className="text-right">
                                        <div className="text-xs text-gray-400 mb-0.5">Planned</div>
                                        <div className="text-gray-600">{formatCurrency(plannedTotal)}</div>
                                    </div>
                                    <div className="text-right min-w-[140px]">
                                        <div className="text-xs text-gray-400 mb-0.5">Actual</div>
                                        <div className="font-semibold">{formatCurrency(actualTotal)}</div>
                                    </div>
                                </div>
                            </button>

                            {/* Category Items */}
                            {isExpanded && (
                                <div className="bg-gray-50">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200 bg-white">
                                                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider font-semibold text-gray-600">Item</th>
                                                <th className="text-right px-4 py-3 text-xs uppercase tracking-wider font-semibold text-gray-600">Planned</th>
                                                <th className="text-right px-4 py-3 text-xs uppercase tracking-wider font-semibold text-gray-600">Actual</th>
                                                <th className="text-right px-6 py-3 text-xs uppercase tracking-wider font-semibold text-gray-600">Variance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categoryItems.map((item) => {
                                                const itemVariance = getVariance(item.planned, item.actual);
                                                const isOverBudget = type === 'expense' && itemVariance > 0;
                                                const isUnderIncome = type === 'income' && itemVariance < 0;

                                                return (
                                                    <tr key={item.id} className="border-b border-gray-200 hover:bg-white transition-colors">
                                                        <td className="px-6 py-3.5 text-sm">{item.name}</td>
                                                        <td className="px-4 py-3.5 text-right font-mono text-sm text-gray-600">
                                                            {formatCurrency(item.planned)}
                                                        </td>
                                                        <td className="px-4 py-3.5 text-right font-mono text-sm font-semibold">
                                                            {formatCurrency(item.actual)}
                                                        </td>
                                                        <td className={`px-6 py-3.5 text-right font-mono text-sm font-semibold ${isOverBudget || isUnderIncome ? 'text-gray-500' : 'text-black'
                                                            }`}>
                                                            {itemVariance > 0 ? '+' : ''}{formatCurrency(itemVariance)}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Total Row */}
            <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
                <span className="font-bold uppercase tracking-wider text-sm">Total {title}</span>
                <span className="font-mono font-bold text-xl tracking-tight">
                    {formatCurrency(items.reduce((sum, item) => sum + item.actual, 0))}
                </span>
            </div>
        </div>
    );
}
