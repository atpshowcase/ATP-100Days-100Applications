"use client";

type RecordItem = {
  id: string;
  weightKg: number;
  heightCm: number;
  bmi: number;
  category: string;
  when: number;
};

type Props = {
  items: RecordItem[];
  onClear: () => void;
};

export default function History({ items, onClear }: Props) {
  if (!items.length) return null;
  return (
    <div className="rounded border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium">History</h3>
        <button onClick={onClear} className="text-sm text-red-600">
          Clear
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.id} className="flex items-center justify-between">
            <div>
              <div className="text-sm">{it.weightKg}kg — {it.heightCm}cm</div>
              <div className="text-xs text-zinc-500">{new Date(it.when).toLocaleString()} • {it.category}</div>
            </div>
            <div className="text-sm font-medium">{it.bmi}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
