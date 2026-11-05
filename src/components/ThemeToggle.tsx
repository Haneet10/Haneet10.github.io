"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as "light" | "dark") ?? "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      className="group relative grid h-10 w-10 place-items-center text-muted transition-colors hover:text-ink"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light theme" : "Dark theme"}
    >
      {/* A half-filled circle: the classic drafting symbol for a section, rotating between themes */}
      <svg viewBox="0 0 20 20" className={`h-[18px] w-[18px] transition-transform duration-500 ease-[var(--ease-draft)] ${dark ? "rotate-180" : ""}`} aria-hidden>
        <circle cx="10" cy="10" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path d="M10 2.75a7.25 7.25 0 0 1 0 14.5z" fill="currentColor" />
      </svg>
    </button>
  );
}
