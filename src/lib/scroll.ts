// Shared smooth-scroll helpers. Uses Lenis when it is running, native scrolling otherwise.
import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Re-read page height and position, e.g. after a route change. */
export function syncLenis() {
  if (!lenis) return;
  lenis.resize();
  lenis.scrollTo(window.scrollY, { immediate: true, force: true });
}

const HEADER_OFFSET = -72;

export function scrollToId(id: string) {
  if (id === "top") {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", window.location.pathname);
    return;
  }
  const el = document.getElementById(id);
  if (!el) return false;
  if (lenis) {
    // Resync first: after a route change Lenis still holds the old page's height and position.
    syncLenis();
    lenis.scrollTo(el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET, { force: true });
  } else el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
  return true;
}
