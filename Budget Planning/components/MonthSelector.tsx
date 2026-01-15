'use client';

import { monthNames } from '@/data/sampleData';

interface MonthSelectorProps {
    currentMonth: string;
    currentYear: number;
    onMonthChange: (month: string) => void;
    onYearChange: (year: number) => void;
}

export default function MonthSelector({
    currentMonth,
    currentYear,
    onMonthChange,
    onYearChange
}: MonthSelectorProps) {
    const handlePrevMonth = () => {
        const currentIndex = monthNames.indexOf(currentMonth);
        if (currentIndex > 0) {
            onMonthChange(monthNames[currentIndex - 1]);
        } else {
            onMonthChange(monthNames[11]);
            onYearChange(currentYear - 1);
        }
    };

    const handleNextMonth = () => {
        const currentIndex = monthNames.indexOf(currentMonth);
        if (currentIndex < 11) {
            onMonthChange(monthNames[currentIndex + 1]);
        } else {
            onMonthChange(monthNames[0]);
            onYearChange(currentYear + 1);
        }
    };

    return (
        <div className="card p-8">
            <div className="flex items-center justify-between">
                <button
                    onClick={handlePrevMonth}
                    className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-200 font-mono text-lg active:scale-95"
                    aria-label="Previous month"
                >
                    ←
                </button>

                <div className="text-center">
                    <h1 className="text-3xl font-bold uppercase tracking-tight">{currentMonth} {currentYear}</h1>
                    <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider font-medium">Monthly Budget Planning</p>
                </div>

                <button
                    onClick={handleNextMonth}
                    className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-200 font-mono text-lg active:scale-95"
                    aria-label="Next month"
                >
                    →
                </button>
            </div>
        </div>
    );
}
