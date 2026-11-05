"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Figure } from "@/content/projects";
import { getImage } from "@/lib/images";

type Props = { figures: Figure[]; video?: { src: string; caption: string }; sheet: string };

/** Masonry gallery with an accessible keyboard-driven lightbox. */
export function Gallery({ figures, video, sheet }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + figures.length) % figures.length)), [figures.length]);

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const current = open !== null ? figures[open] : null;

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {video && (
          <figure className="break-inside-avoid">
            <video
              src={video.src}
              className="w-full bg-paper-2"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={video.caption}
            />
            <figcaption className="mt-2 flex gap-3 text-[13px] text-muted">
              <span className="font-mono text-[11px] text-faint">▶</span>
              {video.caption}
            </figcaption>
          </figure>
        )}
        {figures.map((f, i) => {
          const img = getImage(f.image);
          return (
            <figure key={f.image} className="break-inside-avoid">
              <button
                type="button"
                onClick={(e) => {
                  lastFocus.current = e.currentTarget;
                  setOpen(i);
                }}
                className="group relative block w-full overflow-hidden bg-paper-2"
                aria-label={`Enlarge: ${f.alt}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  srcSet={img.srcSet}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  width={img.width}
                  height={img.height}
                  alt={f.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full transition-transform duration-700 ease-[var(--ease-draft)] group-hover:scale-[1.025]"
                />
              </button>
              {f.caption && (
                <figcaption className="mt-2 flex gap-3 text-[13px] leading-snug text-muted">
                  <span className="shrink-0 font-mono text-[11px] text-faint">
                    {sheet}.{i + 1}
                  </span>
                  {f.caption}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>

      <AnimatePresence>
        {current && open !== null && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex flex-col bg-paper/95 outline-none backdrop-blur-sm"
            onClick={close}
          >
            <div className="shell flex h-16 shrink-0 items-center justify-between">
              <span className="label">
                {sheet}.{open + 1} · {open + 1} / {figures.length}
              </span>
              <button type="button" onClick={close} className="grid h-10 w-10 place-items-center hover:text-accent" aria-label="Close">
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
              <motion.img
                key={current.image}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                src={getImage(current.image).srcSet.split(", ").at(-1)?.split(" ")[0]}
                alt={current.alt}
                className="max-h-full max-w-full object-contain shadow-[0_30px_80px_-30px_rgb(0_0_0/0.4)]"
                onClick={(e) => e.stopPropagation()}
              />
              {figures.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      step(-1);
                    }}
                    className="absolute left-2 grid h-11 w-11 place-items-center border border-line-2 bg-paper hover:border-ink sm:left-6"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      step(1);
                    }}
                    className="absolute right-2 grid h-11 w-11 place-items-center border border-line-2 bg-paper hover:border-ink sm:right-6"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden />
                  </button>
                </>
              )}
            </div>
            <p className="shell py-5 text-center text-sm text-ink-2">{current.caption ?? current.alt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
