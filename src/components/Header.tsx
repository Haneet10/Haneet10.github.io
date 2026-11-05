"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { nav, profile } from "@/content/profile";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view (home page only).
  useEffect(() => {
    if (pathname !== "/") return setActive("");
    const ids = nav.map((n) => n.href.split("#")[1]);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id);
        setActive(ids.find((id) => visible.has(id)) ?? "");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open ? "border-b border-line bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${profile.name}, home`} onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center border border-ink font-mono text-[11px] font-medium tracking-wider transition-colors group-hover:bg-ink group-hover:text-paper">
            {profile.initials}
          </span>
          <span className="hidden text-[15px] font-medium tracking-tight sm:block">{profile.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const id = item.href.split("#")[1];
            const isActive = active === id;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-baseline gap-1.5 px-3 py-2 text-sm transition-colors ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span className={`font-mono text-[10px] transition-colors ${isActive ? "text-accent" : "text-faint group-hover:text-accent"}`}>
                  {item.sheet}
                </span>
                {item.label}
              </Link>
            );
          })}
          <span className="mx-2 h-5 w-px bg-line" aria-hidden />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="relative grid h-10 w-10 place-items-center"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className={`absolute h-px w-5 bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute h-px w-5 bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-16 bg-paper md:hidden"
          >
            <ul className="shell divide-y divide-line border-b border-line">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={item.href} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-5">
                    <span className="text-3xl font-medium tracking-tight">{item.label}</span>
                    <span className="font-mono text-xs text-accent">{item.sheet}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="shell mt-8 flex gap-6 text-sm text-muted">
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="hover:text-ink">GitHub</a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink">LinkedIn</a>
              <a href={`mailto:${profile.email}`} className="hover:text-ink">Email</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
