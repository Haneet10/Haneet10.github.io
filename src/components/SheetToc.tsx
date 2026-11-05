"use client";

import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/scroll";

type Item = { id: string; label: string; mark: string };

/** Sticky "On this sheet" contents with the current chapter highlighted. */
export function SheetToc({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        }
        const first = items.find((i) => visible.has(i.id));
        if (first) setActive(first.id);
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this sheet" className="sticky top-28">
      <p className="label">On this sheet</p>
      <ol className="relative mt-4 border-t border-line">
        {items.map((t) => {
          const on = active === t.id;
          return (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(t.id);
                }}
                aria-current={on ? "location" : undefined}
                className={`relative flex items-center gap-3 border-b border-line py-2.5 text-sm transition-colors duration-300 ${
                  on ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span
                  className={`absolute -left-3 top-1/2 h-4 w-[2px] -translate-y-1/2 bg-accent transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"}`}
                  aria-hidden
                />
                <span className="w-5 font-mono text-[11px] text-accent">{t.mark}</span>
                {t.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
