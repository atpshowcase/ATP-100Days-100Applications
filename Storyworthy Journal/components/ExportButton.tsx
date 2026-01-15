'use client';

import { JournalEntry } from '@/types/journal';

interface ExportButtonProps {
    entries: JournalEntry[];
}

export default function ExportButton({ entries }: ExportButtonProps) {
    const handleExport = () => {
        if (entries.length === 0) {
            alert('No entries to export');
            return;
        }

        // Create text format
        const textContent = entries
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map(entry => {
                const date = new Date(entry.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                return `${date}\n${entry.sentence}\n`;
            })
            .join('\n');

        const fullContent = `STORYWORTHY JOURNAL\n${'='.repeat(50)}\n\n${textContent}`;

        // Create and download file
        const blob = new Blob([fullContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `storyworthy-journal-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleExport}
            className="px-4 py-2 text-xs uppercase tracking-wider border border-gray-300 hover:border-black transition-colors"
            disabled={entries.length === 0}
        >
            Export as Text
        </button>
    );
}
