'use client';

import { useState } from 'react';

interface JournalEntryFormProps {
    date: string;
    initialSentence?: string;
    onSave: (sentence: string) => void;
}

export default function JournalEntryForm({ date, initialSentence = '', onSave }: JournalEntryFormProps) {
    const [sentence, setSentence] = useState(initialSentence);
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!sentence.trim()) return;

        setIsSaving(true);
        await onSave(sentence);
        setIsSaving(false);
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-sm uppercase tracking-wider text-gray-500">
                        {formatDate(date)}
                    </h2>
                    <p className="text-xs text-gray-400">
                        What's your one sentence for today?
                    </p>
                </div>

                <div className="relative">
                    <textarea
                        value={sentence}
                        onChange={(e) => setSentence(e.target.value)}
                        placeholder="Write one sentence that captures your day..."
                        className="w-full min-h-[120px] px-4 py-3 text-base border border-gray-300 focus:border-black focus:outline-none resize-none transition-colors"
                        maxLength={280}
                        disabled={isSaving}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                        {sentence.length}/280
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!sentence.trim() || isSaving}
                    className="w-full py-3 px-6 bg-black text-white text-sm uppercase tracking-wider disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                >
                    {isSaving ? 'Saving...' : 'Save Entry'}
                </button>
            </form>
        </div>
    );
}
