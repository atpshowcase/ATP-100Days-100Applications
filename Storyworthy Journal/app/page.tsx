'use client';

import { useState, useEffect } from 'react';
import JournalEntryForm from '@/components/JournalEntryForm';
import JournalHistory from '@/components/JournalHistory';
import DateNavigator from '@/components/DateNavigator';
import Stats from '@/components/Stats';
import ExportButton from '@/components/ExportButton';
import { JournalEntry } from '@/types/journal';

export default function Home() {
  const [currentDate, setCurrentDate] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null);
  const [view, setView] = useState<'write' | 'history'>('write');

  // Initialize current date on client side
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setCurrentDate(today);
    loadEntries();
  }, []);

  // Load entry for current date
  useEffect(() => {
    if (currentDate) {
      const entry = entries.find(e => e.date === currentDate);
      setCurrentEntry(entry || null);
    }
  }, [currentDate, entries]);

  const loadEntries = () => {
    const stored = localStorage.getItem('journal-entries');
    if (stored) {
      const parsed = JSON.parse(stored);
      setEntries(parsed.sort((a: JournalEntry, b: JournalEntry) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
    }
  };

  const saveEntry = async (sentence: string) => {
    const now = new Date();

    if (currentEntry) {
      // Update existing entry
      const updated = entries.map(e =>
        e.id === currentEntry.id
          ? { ...e, sentence, updatedAt: now }
          : e
      );
      setEntries(updated);
      localStorage.setItem('journal-entries', JSON.stringify(updated));
    } else {
      // Create new entry
      const newEntry: JournalEntry = {
        id: crypto.randomUUID(),
        date: currentDate,
        sentence,
        createdAt: now,
        updatedAt: now,
      };
      const updated = [...entries, newEntry].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setEntries(updated);
      localStorage.setItem('journal-entries', JSON.stringify(updated));
    }
  };

  const handleSelectDate = (date: string) => {
    setCurrentDate(date);
    setView('write');
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-light text-center tracking-tight">
            Storyworthy Journal
          </h1>
          <p className="text-xs text-gray-500 text-center mt-2 tracking-wide">
            One sentence a day
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-8 justify-center">
            <button
              onClick={() => setView('write')}
              className={`py-4 text-sm uppercase tracking-wider border-b-2 transition-colors ${view === 'write'
                ? 'border-black text-black'
                : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
            >
              Write
            </button>
            <button
              onClick={() => setView('history')}
              className={`py-4 text-sm uppercase tracking-wider border-b-2 transition-colors ${view === 'history'
                ? 'border-black text-black'
                : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
            >
              History ({entries.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-12">
        {view === 'write' ? (
          <>
            <DateNavigator
              currentDate={currentDate}
              onDateChange={setCurrentDate}
            />
            <div className="mt-8">
              <JournalEntryForm
                date={currentDate}
                initialSentence={currentEntry?.sentence || ''}
                onSave={saveEntry}
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-full max-w-2xl mx-auto px-4 mb-8 flex justify-end">
              <ExportButton entries={entries} />
            </div>
            <JournalHistory
              entries={entries}
              onSelectDate={handleSelectDate}
            />
            <Stats entries={entries} />
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-xs text-gray-400 text-center">
            Inspired by Matthew Dicks' Storyworthy
          </p>
        </div>
      </footer>
    </main>
  );
}
