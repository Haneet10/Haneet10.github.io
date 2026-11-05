import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${profile.name}, Mechanical Engineering (Co-op) at the University of Waterloo.`,
  alternates: { canonical: "/resume/" },
};

// Pages are pre-rendered images of the PDF so the résumé reads well on every device,
// including phones that can't display embedded PDFs.
const pages = [
  { src: "/resume/page-1.webp", width: 1275, height: 1650 },
  { src: "/resume/page-2.webp", width: 1275, height: 1650 },
];

export default function ResumePage() {
  const pdf = profile.resume ?? "";
  return (
    <section className="pt-16">
      <div className="shell">
        <div className="flex items-center justify-between border-b border-line py-3">
          <Link href="/" className="label group inline-flex items-center gap-2 hover:!text-ink">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden />
            Cover sheet
          </Link>
          <span className="label">Sheet R · Résumé</span>
        </div>

        <header className="grid gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <p className="label">{profile.name}</p>
            <h1 className="mt-6 text-[clamp(2.8rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.045em]">
              Résumé
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              Everything on this site in two pages, plus extra-curriculars. Download the PDF or read it below.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap items-end gap-3 lg:col-span-5 lg:justify-end">
            <a
              href={pdf}
              download="Haneet-Singh-Resume.pdf"
              className="group inline-flex h-11 items-center gap-2 bg-ink px-5 text-sm font-medium text-paper transition-colors hover:bg-accent"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download PDF
            </a>
            <a
              href={pdf}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 border border-line-2 px-5 text-sm font-medium transition-colors hover:border-ink"
            >
              Open in a new tab
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </Reveal>
        </header>

        <div className="grid gap-10 pb-24 sm:pb-32">
          {pages.map((p, i) => (
            <Reveal key={p.src}>
              <figure className="mx-auto max-w-4xl">
                <div className="ticks border border-line-2 bg-white p-0 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.35)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.src}
                    width={p.width}
                    height={p.height}
                    alt={`Résumé of ${profile.name}, page ${i + 1} of ${pages.length}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="label mt-3 flex justify-between">
                  <span>Page {i + 1} / {pages.length}</span>
                  <span>PDF · Letter</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
