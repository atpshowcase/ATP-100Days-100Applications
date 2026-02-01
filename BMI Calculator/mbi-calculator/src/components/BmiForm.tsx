"use client";

import { useState } from "react";

type Props = {
  onCalculate: (data: { weightKg: number; heightCm: number }) => void;
};

export default function BmiForm({ onCalculate }: Props) {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h) return;
    onCalculate({ weightKg: w, heightCm: h });
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <label className="flex flex-col">
        <span className="text-sm font-medium">Weight (kg)</span>
        <input
          inputMode="decimal"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="mt-1 rounded border px-3 py-2"
          placeholder="e.g. 72"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm font-medium">Height (cm)</span>
        <input
          inputMode="decimal"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="mt-1 rounded border px-3 py-2"
          placeholder="e.g. 175"
        />
      </label>

      <div className="flex gap-2">
        <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
          Calculate
        </button>
        <button
          type="button"
          onClick={() => {
            setWeight("");
            setHeight("");
          }}
          className="rounded border px-4 py-2"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
