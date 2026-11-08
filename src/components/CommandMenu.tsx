"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CornerDownLeft, Search } from "lucide-react";
import { profile, sections } from "@/content/profile";
import { projects, reportPdf } from "@/content/projects";
import { scrollToId } from "@/lib/scroll";

type Action = { id: string; group: string; label: string; hint: string; run: () => void; external?: boolean };

/** ⌘K / Ctrl+K jump menu: every section, project and link, reachable from the keyboard. */
export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [mac, setMac] = useState(true);

  useEffect(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform)), []);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCursor(0);
    lastFocus.current?.focus();
  }, []);

  const goSection = useCallback(
    (id: string) => {
      if (pathname === "/") scrollToId(id);
      else router.push(id === "top" ? "/" : `/#${id}`);
    },
    [pathname, router],
  );

  const actions = useMemo<Action[]>(
    () => [
      ...sections.map((s) => ({ id: `s-${s.id}`, group: "Sections", label: s.label, hint: `Sheet ${s.sheet}`, run: () => goSection(s.id) })),
      ...projects.map((p, i) => ({
        id: `p-${p.slug}`,
        group: "Projects",
        label: p.title,
        hint: String(i + 1).padStart(2, "0"),
        run: () => router.push(`/work/${p.slug}/`),
      })),
      { id: "d-portfolio", group: "Downloads", label: "Portfolio (PDF)", hint: `${profile.portfolioPages} pages`, external: true, run: () => window.open(profile.portfolioPdf, "_blank", "noopener") },
      ...projects.map((p) => ({
        id: `d-${p.slug}`,
        group: "Downloads",
        label: `${p.title} report (PDF)`,
        hint: "PDF",
        external: true,
        run: () => window.open(reportPdf(p.slug), "_blank", "noopener"),
      })),
      { id: "l-email", group: "Contact", label: `Email ${profile.email}`, hint: "Mail", run: () => (window.location.href = `mailto:${profile.email}`) },
      { id: "l-linkedin", group: "Contact", label: "LinkedIn", hint: "Opens new tab", external: true, run: () => window.open(profile.links.linkedin, "_blank", "noopener") },
      { id: "l-github", group: "Contact", label: "GitHub", hint: "Opens new tab", external: true, run: () => window.open(profile.links.github, "_blank", "noopener") },
    ],
    [goSection, router],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => `${a.label} ${a.group}`.toLowerCase().includes(q));
  }, [actions, query]);

  useEffect(() => setCursor(0), [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        lastFocus.current = document.activeElement as HTMLElement;
        setOpen((o) => !o);
      }
    };
    const onOpen = () => {
      lastFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-menu", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-menu", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const run = (a: Action) => {
    close();
    setTimeout(a.run, 10);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return close();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(filtered.length - 1, c + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    }
    if (e.key === "Enter" && filtered[cursor]) {
      e.preventDefault();
      run(filtered[cursor]);
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-ink/20 px-4 pt-[12vh] backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Jump to"
            initial={{ opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl border border-line-2 bg-paper shadow-[0_40px_120px_-30px_rgb(0_0_0/0.45)]"
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 text-muted" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Sections, project reports, downloads…"
                aria-label="Search sections, projects and links"
                aria-controls="command-list"
                aria-activedescendant={filtered[cursor] ? `cmd-${filtered[cursor].id}` : undefined}
                className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-faint"
              />
              <kbd className="border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">Esc</kbd>
            </div>
            <ul id="command-list" role="listbox" className="max-h-[56vh] overflow-y-auto overscroll-contain py-2" data-lenis-prevent>
              {filtered.length === 0 && <li className="px-4 py-8 text-center text-sm text-muted">Nothing matches “{query}”.</li>}
              {filtered.map((a, i) => {
                const header = a.group !== lastGroup ? a.group : null;
                lastGroup = a.group;
                const on = i === cursor;
                return (
                  <li key={a.id} role="presentation">
                    {header && <p className="label px-4 pb-1.5 pt-3 !text-[10px]">{header}</p>}
                    <div
                      id={`cmd-${a.id}`}
                      role="option"
                      aria-selected={on}
                      onMouseMove={() => setCursor(i)}
                      onClick={() => run(a)}
                      className={`mx-2 flex cursor-pointer items-center justify-between gap-4 px-3 py-2.5 text-sm transition-colors ${
                        on ? "bg-ink text-paper" : "text-ink"
                      }`}
                    >
                      <span className="truncate">{a.label}</span>
                      <span className={`flex shrink-0 items-center gap-2 font-mono text-[10px] ${on ? "text-paper/70" : "text-faint"}`}>
                        {a.hint}
                        {on && (a.external ? <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /> : <CornerDownLeft className="h-3.5 w-3.5" aria-hidden />)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-faint">
              <span>↑ ↓ to move · ↵ to open</span>
              <span>{mac ? "⌘" : "Ctrl"} K to toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function openCommandMenu() {
  window.dispatchEvent(new Event("open-command-menu"));
}
