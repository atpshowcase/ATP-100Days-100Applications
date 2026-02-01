"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark =
      saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <header className="flex w-full items-center justify-between py-6">
      <h1 className="text-xl font-semibold">MBI Calculator</h1>
      <div className="flex items-center gap-4">
        <button
          aria-pressed={dark}
          onClick={toggle}
          className="rounded-full border px-3 py-1 text-sm"
        >
          {dark ? "Dark" : "Light"}
        </button>
      </div>
    </header>
  );
}
