'use client';

import { useState } from 'react';
import { BudgetItem } from '@/types/budget';

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (item: Omit<BudgetItem, 'id'>) => void;
    type: 'income' | 'expense';
    subcategories: string[];
}

export default function AddItemModal({ isOpen, onClose, onAdd, type, subcategories }: AddItemModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        planned: '',
        actual: '',
        subcategory: subcategories[0] || ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onAdd({
            name: formData.name,
            planned: parseFloat(formData.planned) || 0,
            actual: parseFloat(formData.actual) || 0,
            category: type,
            subcategory: formData.subcategory
        });

        // Reset form
        setFormData({
            name: '',
            planned: '',
            actual: '',
            subcategory: subcategories[0] || ''
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white max-w-md w-full shadow-card animate-in fade-in duration-200">
                <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
                    <h2 className="text-lg font-bold uppercase tracking-wider">
                        Add {type === 'income' ? 'Income' : 'Expense'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-300 text-2xl leading-none transition-colors w-8 h-8 flex items-center justify-center"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-gray-700">
                            Item Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input-field"
                            placeholder="e.g., Monthly Salary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-gray-700">
                            Category
                        </label>
                        <select
                            value={formData.subcategory}
                            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                            className="input-field"
                        >
                            {subcategories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-gray-700">
                            Planned Amount ($)
                        </label>
                        <input
                            type="number"
                            value={formData.planned}
                            onChange={(e) => setFormData({ ...formData, planned: e.target.value })}
                            className="input-field font-mono"
                            placeholder="0"
                            required
                            min="0"
                            step="1"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-gray-700">
                            Actual Amount ($)
                        </label>
                        <input
                            type="number"
                            value={formData.actual}
                            onChange={(e) => setFormData({ ...formData, actual: e.target.value })}
                            className="input-field font-mono"
                            placeholder="0"
                            required
                            min="0"
                            step="1"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-secondary flex-1"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary flex-1"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
