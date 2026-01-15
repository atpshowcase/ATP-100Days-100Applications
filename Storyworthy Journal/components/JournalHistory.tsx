'use client';

import { JournalEntry } from '@/types/journal';

interface JournalHistoryProps {
    entries: JournalEntry[];
    onSelectDate: (date: string) => void;
}

export default function JournalHistory({ entries, onSelectDate }: JournalHistoryProps) {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (entries.length === 0) {
        return (
            <div className="w-full max-w-2xl mx-auto px-4 py-12 text-center">
                <p className="text-sm text-gray-400">No entries yet. Start writing your story today.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-6">Your Story</h3>
            <div className="space-y-6">
                {entries.map((entry) => (
                    <div
                        key={entry.id}
                        onClick={() => onSelectDate(entry.date)}
                        className="border-l-2 border-black pl-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <div className="text-xs text-gray-500 mb-1">
                            {formatDate(entry.date)}
                        </div>
                        <p className="text-base leading-relaxed">
                            {entry.sentence}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
