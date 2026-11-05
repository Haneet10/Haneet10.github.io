"use client";

import { useEffect, useState } from "react";
import { sections } from "@/content/profile";
import { scrollToId } from "@/lib/scroll";

/** Fixed index of the home page's sheets. Shows where you are and jumps anywhere in one click. */
export function SectionRail() {
  const [active, setActive] = useState<string>("top");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id);
        const current = [...sections].reverse().find((s) => visible.has(s.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav aria-label="Sections" className="group/rail fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 min-[1600px]:block">
      <div className="relative">
        <span className="absolute -right-1.5 top-0 h-full w-px bg-line" aria-hidden />
        <span
          className="absolute -right-1.5 top-0 w-px bg-accent transition-[height] duration-150"
          style={{ height: `${progress * 100}%` }}
          aria-hidden
        />
        <ul className="space-y-1">
          {sections.map((s) => {
            const on = active === s.id;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => scrollToId(s.id)}
                  aria-current={on ? "true" : undefined}
                  className="group flex h-7 items-center justify-end gap-2.5 pl-6"
                >
                  <span
                    className={`label pointer-events-none whitespace-nowrap bg-paper/90 px-1.5 py-0.5 backdrop-blur transition-all duration-300 ${
                      on
                        ? "!text-ink opacity-0 group-hover/rail:opacity-100 group-focus-visible:opacity-100 min-[1800px]:opacity-100"
                        : "translate-x-1 opacity-0 group-hover/rail:translate-x-0 group-hover/rail:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className={`font-mono text-[10px] tabular-nums transition-colors ${on ? "text-accent" : "text-faint group-hover:text-ink"}`}>
                    {s.sheet}
                  </span>
                  <span className="flex w-5 justify-end" aria-hidden>
                    <span
                      className={`h-px transition-[width,background-color] duration-500 ease-[var(--ease-draft)] ${on ? "w-5 bg-accent" : "w-2.5 bg-line-2 group-hover:w-4 group-hover:bg-ink"}`}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
