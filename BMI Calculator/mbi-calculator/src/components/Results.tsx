"use client";

import { getBmiCategory } from "@/lib/bmi";

type Props = {
  bmi: number | null;
};

export default function Results({ bmi }: Props) {
  if (bmi === null) return null;
  const category = getBmiCategory(bmi);
  return (
    <div className="rounded border p-4">
      <p className="text-sm text-zinc-600">Your BMI</p>
      <div className="mt-2 flex items-baseline gap-3">
        <div className="text-4xl font-semibold">{bmi}</div>
        <div className="rounded bg-zinc-100 px-2 py-1 text-sm">{category}</div>
      </div>
    </div>
  );
}
