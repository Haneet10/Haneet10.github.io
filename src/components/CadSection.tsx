"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cadModels, type CadModel } from "@/content/cad";
import { getImage } from "@/lib/images";
import { Reveal } from "./Reveal";

const span: Record<CadModel["size"], string> = {
  hero: "lg:col-span-6",
  wide: "sm:col-span-1 lg:col-span-6",
  regular: "lg:col-span-4",
};

/** Render plate. Renders are pre-padded to their tile aspect with their own edge pixels, so they fill it edge to edge. */
function Plate({ image, alt, className = "", sizes }: { image: string; alt: string; className?: string; sizes: string }) {
  const img = getImage(image);
  return (
    <span className={`relative block overflow-hidden bg-[#e9e9e9] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        srcSet={img.srcSet}
        sizes={sizes}
        alt={alt}
        width={img.width}
        height={img.height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-draft)] group-hover:scale-[1.035]"
      />
    </span>
  );
}

export function CadSection() {
  const flat = useMemo(() => cadModels.flatMap((m) => m.figures.map((f) => ({ ...f, model: m }))), []);
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const show = (image: string) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setOpen(flat.findIndex((f) => f.image === image));
  };
  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + flat.length) % flat.length)), [flat.length]);

  useEffect(() => {
    if (open === null) return;
    document.documentElement.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const current = open !== null ? flat[open] : null;

  return (
    <div id="cad" className="mt-28 scroll-mt-24 sm:mt-36">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink pb-5">
        <div>
          <p className="label">Sheet 02.B · {cadModels.length} models</p>
          <h3 className="mt-2 text-2xl font-medium tracking-tight">SolidWorks models</h3>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          Parts and assemblies modelled in SolidWorks, from machined components to a mug with my name on the bottom.
        </p>
      </div>

      <div className="mt-px grid gap-px border-x border-b border-line-2 bg-line-2 sm:grid-cols-2 lg:grid-cols-12">
        {cadModels.map((m, mi) => {
          const [hero, ...rest] = m.figures;
          const isGroup = m.id === "keychain";
          return (
            <Reveal key={m.id} delay={0.04 * (mi % 3)} className={`flex flex-col bg-paper ${span[m.size]} ${m.size === "hero" ? "sm:col-span-2 lg:col-span-6" : ""}`}>
              {isGroup ? (
                <div className="grid grid-cols-2 gap-px bg-line">
                  {m.figures.map((f) => (
                    <button key={f.image} type="button" onClick={() => show(f.image)} className="group relative text-left" aria-label={`Enlarge: ${m.title}, ${f.caption}`}>
                      <Plate image={f.image} alt={f.alt} className="aspect-[4/3]" sizes="(min-width: 1024px) 25vw, 50vw" />
                      <span className="label absolute bottom-2 left-2 bg-paper/90 px-1.5 py-0.5 !text-[10px] !text-ink">{f.caption}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => show(hero.image)}
                    className="group block text-left"
                    aria-label={`Enlarge: ${m.title}`}
                  >
                    <Plate
                      image={hero.image}
                      alt={hero.alt}
                      className={m.size === "regular" ? "aspect-[4/3]" : m.tall ? "aspect-[16/10] lg:aspect-[16/15]" : "aspect-[16/10]"}
                      sizes={m.size === "regular" ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
                    />
                  </button>
                  {rest.length > 0 && (
                    <div className="grid grid-cols-2 gap-px border-t border-line bg-line">
                      {rest.map((f) => (
                        <button key={f.image} type="button" onClick={() => show(f.image)} className="group relative text-left" aria-label={`Enlarge: ${m.title}, ${f.caption}`}>
                          <Plate image={f.image} alt={f.alt} className="aspect-[16/10]" sizes="(min-width: 1024px) 25vw, 50vw" />
                          <span className="label absolute bottom-2 left-2 bg-paper/90 px-1.5 py-0.5 !text-[10px] !text-ink">{f.caption}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
              <div className="flex flex-1 flex-col gap-2 border-t border-line p-5 sm:p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="text-lg font-medium tracking-tight">{m.title}</h4>
                  <span className={`label shrink-0 whitespace-nowrap !text-[10px] ${m.kind === "Just for fun" ? "!text-accent" : ""}`}>
                    {String(mi + 1).padStart(2, "0")} · {m.kind}
                  </span>
                </div>
                <p className="text-[14px] leading-relaxed text-ink-2">{m.note}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${current.model.title}: ${current.caption}`}
            tabIndex={-1}
            className="fixed inset-0 z-[90] flex flex-col bg-ink/90 backdrop-blur-sm outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            data-lenis-prevent
          >
            <div className="flex items-center justify-between px-4 py-4 text-paper sm:px-8">
              <p className="font-mono text-[11px] tracking-wider text-paper/70">
                {String((open ?? 0) + 1).padStart(2, "0")} / {String(flat.length).padStart(2, "0")}
              </p>
              <button type="button" onClick={close} className="grid h-10 w-10 place-items-center text-paper/80 hover:text-paper" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={(e) => e.stopPropagation()}>
              <motion.div
                key={current.image}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full max-h-[78vh] w-full max-w-5xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getImage(current.image).srcSet.split(", ").at(-1)?.split(" ")[0]}
                  alt={current.alt}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </motion.div>
              <button type="button" onClick={() => step(-1)} className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center text-paper/70 hover:text-paper sm:left-6" aria-label="Previous">
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button type="button" onClick={() => step(1)} className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center text-paper/70 hover:text-paper sm:right-6" aria-label="Next">
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            <div className="px-4 py-5 text-center text-sm text-paper sm:px-8" onClick={(e) => e.stopPropagation()}>
              <span className="font-medium">{current.model.title}</span>
              <span className="text-paper/60"> · {current.caption}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
