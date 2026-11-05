"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { registerLenis, scrollToId, syncLenis } from "@/lib/scroll";

/** Inertial smooth scrolling (skipped for reduced motion), plus smooth same-page anchor links. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    registerLenis(lenis);
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      registerLenis(null);
    };
  }, []);

  // Intercept links to sections on the current page ("/#work", "#photos") so they glide instead of jumping.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || !url.hash) return;
      const samePage = url.pathname.replace(/\/$/, "") === window.location.pathname.replace(/\/$/, "");
      if (!samePage) return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (document.getElementById(id) || id === "top") {
        e.preventDefault();
        scrollToId(id);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Arriving on the home page with a hash (e.g. from a project page): glide to it once laid out.
  useEffect(() => {
    const r = requestAnimationFrame(syncLenis);
    if (!window.location.hash) return () => cancelAnimationFrame(r);
    const id = decodeURIComponent(window.location.hash.slice(1));
    const t = setTimeout(() => scrollToId(id), 60);
    return () => {
      cancelAnimationFrame(r);
      clearTimeout(t);
    };
  }, [pathname]);

  return null;
}
