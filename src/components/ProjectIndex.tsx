"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import { disciplines, projects, type Discipline } from "@/content/projects";
import { getImage } from "@/lib/images";

type Filter = "All" | Discipline;

/** The full register of projects: filterable, with a cursor-following preview on desktop. */
export function ProjectIndex() {
  const [filter, setFilter] = useState<Filter>("All");
  const [hovered, setHovered] = useState<string | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 30, mass: 0.6 });
  const y = useSpring(my, { stiffness: 260, damping: 30, mass: 0.6 });

  const list = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.disciplines.includes(filter))), [filter]);
  const counts = useMemo(
    () => Object.fromEntries(disciplines.map((d) => [d, projects.filter((p) => p.disciplines.includes(d)).length])),
    [],
  );
  const hoveredProject = projects.find((p) => p.slug === hovered);

  return (
    <div className="mt-28 sm:mt-36">
      <div className="flex flex-col gap-6 border-b border-ink pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label">Register</p>
          <h3 className="mt-2 text-2xl font-medium tracking-tight">All projects</h3>
        </div>
        <div role="tablist" aria-label="Filter projects by discipline" className="-mx-1 flex flex-wrap gap-1">
          {(["All", ...disciplines] as Filter[]).map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f)}
                className={`relative px-3 py-1.5 text-sm transition-colors ${active ? "text-paper" : "text-muted hover:text-ink"}`}
              >
                {active && <motion.span layoutId="filter-pill" className="absolute inset-0 bg-ink" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                <span className="relative">
                  {f}
                  <sup className={`ml-1 font-mono text-[9px] ${active ? "text-paper/70" : "text-faint"}`}>
                    {f === "All" ? projects.length : counts[f]}
                  </sup>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <ul
        className="relative"
        onPointerMove={(e) => {
          mx.set(e.clientX);
          my.set(e.clientY);
        }}
        onPointerLeave={() => setHovered(null)}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((p) => {
            const idx = projects.indexOf(p) + 1;
            return (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-b border-line"
              >
                <Link
                  href={`/work/${p.slug}/`}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(p.slug)}
                  onFocus={() => setHovered(null)}
                  className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 py-5 transition-colors sm:grid-cols-[3rem_1fr_11rem_4rem_1.5rem] sm:gap-6 sm:py-6"
                >
                  <span className="relative hidden font-mono text-xs text-faint transition-colors group-hover:text-accent sm:block">
                    {String(idx).padStart(2, "0")}
                  </span>
                  {/* Mobile thumbnail */}
                  <span className="relative block aspect-square w-14 overflow-hidden bg-paper-2 sm:hidden">
                    {p.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={getImage(p.cover.image).srcSet.split(" ")[0]} alt="" className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <span className="grid h-full w-full place-items-center font-mono text-xs text-faint">{String(idx).padStart(2, "0")}</span>
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-lg font-medium tracking-tight transition-transform duration-500 ease-[var(--ease-draft)] sm:text-xl sm:group-hover:translate-x-1.5">
                      {p.title}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-muted sm:truncate">{p.tagline}</span>
                  </span>
                  <span className="label hidden sm:block">{p.disciplines.join(" · ")}</span>
                  <span className="hidden font-mono text-xs text-muted sm:block">{p.year}</span>
                  <ArrowRight className="h-4 w-4 text-faint transition-all group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden />
                </Link>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {/* Cursor preview (desktop pointer only) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden [@media(hover:hover)]:block"
        style={{ x, y }}
      >
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              key={hoveredProject.slug}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-6 top-6 w-72 border border-line-2 bg-paper p-1.5 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.35)]"
            >
              {hoveredProject.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getImage(hoveredProject.cover.image).srcSet.split(" ")[0]}
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div className="grid-paper grid aspect-[4/3] place-items-center bg-paper-2">
                  <span className="label">{hoveredProject.tools[0]}</span>
                </div>
              )}
              <div className="flex justify-between px-1.5 pb-0.5 pt-2">
                <span className="label !text-ink">{hoveredProject.title}</span>
                <span className="label">{hoveredProject.year}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
