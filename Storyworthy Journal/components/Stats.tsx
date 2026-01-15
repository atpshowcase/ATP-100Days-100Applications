'use client';

import { JournalEntry } from '@/types/journal';

interface StatsProps {
    entries: JournalEntry[];
}

export default function Stats({ entries }: StatsProps) {
    const calculateStreak = () => {
        if (entries.length === 0) return 0;

        const sortedDates = entries
            .map(e => new Date(e.date))
            .sort((a, b) => b.getTime() - a.getTime());

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check if there's an entry for today or yesterday
        const latestEntry = sortedDates[0];
        latestEntry.setHours(0, 0, 0, 0);

        const daysDiff = Math.floor((today.getTime() - latestEntry.getTime()) / (1000 * 60 * 60 * 24));

        if (daysDiff > 1) return 0; // Streak broken

        let currentDate = new Date(latestEntry);

        for (let i = 0; i < sortedDates.length; i++) {
            const entryDate = new Date(sortedDates[i]);
            entryDate.setHours(0, 0, 0, 0);

            if (entryDate.getTime() === currentDate.getTime()) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else if (entryDate.getTime() < currentDate.getTime()) {
                break;
            }
        }

        return streak;
    };

    const totalEntries = entries.length;
    const currentStreak = calculateStreak();

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                    <div className="text-3xl font-light mb-1">{totalEntries}</div>
                    <div className="text-xs uppercase tracking-wider text-gray-500">Total Entries</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-light mb-1">{currentStreak}</div>
                    <div className="text-xs uppercase tracking-wider text-gray-500">Day Streak</div>
                </div>
            </div>
        </div>
    );
}
