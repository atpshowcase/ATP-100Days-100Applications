import { BudgetItem, MonthlyBudget } from '@/types/budget';

export const sampleBudgetData: MonthlyBudget = {
    month: 'January',
    year: 2025,
    income: [
        {
            id: '1',
            name: 'Salary',
            planned: 8500,
            actual: 8500,
            category: 'income',
            subcategory: 'Primary Income'
        },
        {
            id: '2',
            name: 'Freelance',
            planned: 2000,
            actual: 1500,
            category: 'income',
            subcategory: 'Side Income'
        },
        {
            id: '3',
            name: 'Investment',
            planned: 500,
            actual: 450,
            category: 'income',
            subcategory: 'Passive Income'
        }
    ],
    expenses: [
        // Basic Needs
        {
            id: '4',
            name: 'Rent',
            planned: 2500,
            actual: 2500,
            category: 'expense',
            subcategory: 'Basic Needs'
        },
        {
            id: '5',
            name: 'Electricity',
            planned: 300,
            actual: 280,
            category: 'expense',
            subcategory: 'Basic Needs'
        },
        {
            id: '6',
            name: 'Water',
            planned: 100,
            actual: 95,
            category: 'expense',
            subcategory: 'Basic Needs'
        },
        {
            id: '7',
            name: 'Internet',
            planned: 350,
            actual: 350,
            category: 'expense',
            subcategory: 'Basic Needs'
        },
        {
            id: '8',
            name: 'Groceries',
            planned: 1500,
            actual: 1450,
            category: 'expense',
            subcategory: 'Basic Needs'
        },
        // Transportation
        {
            id: '9',
            name: 'Gas',
            planned: 500,
            actual: 480,
            category: 'expense',
            subcategory: 'Transportation'
        },
        {
            id: '10',
            name: 'Parking',
            planned: 150,
            actual: 140,
            category: 'expense',
            subcategory: 'Transportation'
        },
        {
            id: '11',
            name: 'Toll',
            planned: 200,
            actual: 185,
            category: 'expense',
            subcategory: 'Transportation'
        },
        // Health
        {
            id: '12',
            name: 'Health Insurance',
            planned: 400,
            actual: 400,
            category: 'expense',
            subcategory: 'Health'
        },
        {
            id: '13',
            name: 'Medicine',
            planned: 100,
            actual: 75,
            category: 'expense',
            subcategory: 'Health'
        },
        // Entertainment
        {
            id: '14',
            name: 'Dining Out',
            planned: 600,
            actual: 650,
            category: 'expense',
            subcategory: 'Entertainment'
        },
        {
            id: '15',
            name: 'Streaming',
            planned: 150,
            actual: 150,
            category: 'expense',
            subcategory: 'Entertainment'
        },
        {
            id: '16',
            name: 'Hobbies',
            planned: 300,
            actual: 280,
            category: 'expense',
            subcategory: 'Entertainment'
        },
        // Savings & Investment
        {
            id: '17',
            name: 'Savings',
            planned: 1000,
            actual: 1000,
            category: 'expense',
            subcategory: 'Savings & Investment'
        },
        {
            id: '18',
            name: 'Stock Investment',
            planned: 500,
            actual: 500,
            category: 'expense',
            subcategory: 'Savings & Investment'
        },
        {
            id: '19',
            name: 'Emergency Fund',
            planned: 300,
            actual: 300,
            category: 'expense',
            subcategory: 'Savings & Investment'
        }
    ]
};

export const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
