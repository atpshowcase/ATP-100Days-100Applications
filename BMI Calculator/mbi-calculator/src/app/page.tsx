"use client";

import Header from "@/components/Header";
import BmiForm from "@/components/BmiForm";
import Results from "@/components/Results";
import History from "@/components/History";
import { calculateBmi, getBmiCategory } from "@/lib/bmi";
import { useEffect, useState } from "react";

type RecordItem = {
  id: string;
  weightKg: number;
  heightCm: number;
  bmi: number;
  category: string;
  when: number;
};

export default function Home() {
  const [bmi, setBmi] = useState<number | null>(null);
  const [history, setHistory] = useState<RecordItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mbi.history");
      if (raw) setHistory(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mbi.history", JSON.stringify(history));
  }, [history]);

  function handleCalculate(payload: { weightKg: number; heightCm: number }) {
    const bmiVal = calculateBmi(payload.weightKg, payload.heightCm);
    const category = getBmiCategory(bmiVal);
    setBmi(bmiVal);
    const rec: RecordItem = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      weightKg: payload.weightKg,
      heightCm: payload.heightCm,
      bmi: bmiVal,
      category,
      when: Date.now(),
    };
    setHistory((s) => [rec, ...s].slice(0, 10));
  }

  function clearHistory() {
    setHistory([]);
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans p-6">
      <main className="mx-auto max-w-2xl">
        <Header />
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <BmiForm onCalculate={handleCalculate} />
          </div>
          <div className="space-y-4">
            <Results bmi={bmi} />
            <History items={history} onClear={clearHistory} />
          </div>
        </div>
      </main>
    </div>
  );
}
