import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { projects, reportPdf } from "@/content/projects";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Picture } from "./Picture";
import { ProjectIndex } from "./ProjectIndex";
import { CadSection } from "./CadSection";

export function Work() {
  const featured = projects.filter((p) => p.featured);
  return (
    <section id="work" aria-label="Work" className="shell py-16 sm:py-24 lg:py-28">
      <SectionHeading
        sheet="02"
        title="Work"
        note={`${String(projects.length).padStart(2, "0")} projects`}
        lead="Five builds across the field, the bench and the spreadsheet. Each sheet covers the brief, the process, what failed, and what it delivered."
      />

      <div className="space-y-24 sm:space-y-32">
        {featured.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal key={p.slug} as="article">
              <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
                <Link
                  href={`/work/${p.slug}/`}
                  className={`group block lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
                  aria-label={`${p.title}: full report`}
                >
                  <div className="ticks relative aspect-[4/3] overflow-hidden bg-paper-2">
                    {p.cover && (
                      <Picture
                        image={p.cover.image}
                        alt={p.cover.alt}
                        focus={p.cover.focus}
                        fill
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="transition-transform duration-[1.4s] ease-[var(--ease-draft)] group-hover:scale-[1.035]"
                      />
                    )}
                    <span className="label absolute left-3 top-3 bg-paper/90 px-2 py-1 !text-ink backdrop-blur">
                      Fig. 2.{i + 1}
                    </span>
                    <span className="absolute bottom-3 right-3 inline-flex translate-y-2 items-center gap-1.5 bg-ink px-3 py-1.5 text-xs font-medium text-paper opacity-0 transition-all duration-500 ease-[var(--ease-draft)] group-hover:translate-y-0 group-hover:opacity-100">
                      Sheet 02.0{i + 1} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                </Link>

                <div className={`lg:col-span-5 lg:pt-2 ${flip ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-accent">{String(projects.indexOf(p) + 1).padStart(2, "0")}</span>
                    <span className="h-px w-6 bg-line-2" aria-hidden />
                    <span className="label">
                      {p.year} · {p.disciplines.join(" · ")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-3xl font-medium tracking-[-0.03em] sm:text-[2.6rem] sm:leading-[1.05]">
                    <Link href={`/work/${p.slug}/`} className="link-underline">
                      {p.title}
                    </Link>
                  </h3>

                  <dl className="mt-8 space-y-5 border-t border-line pt-6">
                    <div className="grid grid-cols-[4.5rem_1fr] gap-4">
                      <dt className="label pt-1">Brief</dt>
                      <dd className="text-[15px] leading-relaxed text-ink-2">{p.purpose.lead}</dd>
                    </div>
                    <div className="grid grid-cols-[4.5rem_1fr] gap-4">
                      <dt className="label pt-1 !text-accent">Outcome</dt>
                      <dd className="text-[15px] leading-relaxed text-ink">{p.result.lead}</dd>
                    </div>
                  </dl>

                  <dl
                    className="mt-8 grid gap-px border border-line bg-line"
                    style={{ gridTemplateColumns: `repeat(${Math.min(3, p.outcomes.length)}, minmax(0, 1fr))` }}
                  >
                    {p.outcomes.slice(0, 3).map((o) => (
                      <div key={o.label} className="bg-paper p-3 sm:p-3.5">
                        <dt className="sr-only">{o.label}</dt>
                        <dd>
                          <span className="block whitespace-nowrap text-xl font-medium tracking-[-0.03em] tabular-nums sm:text-2xl">{o.value}</span>
                          <span className="mt-1 block text-[12px] leading-snug text-muted">{o.label}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-8 flex flex-wrap gap-2">
                    <Link
                      href={`/work/${p.slug}/`}
                      className="group inline-flex h-11 items-center gap-2 bg-ink px-5 text-sm font-medium text-paper transition-colors hover:bg-accent"
                    >
                      Read the full report
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                    <a
                      href={reportPdf(p.slug)}
                      download
                      aria-label={`Download the ${p.title} report (PDF)`}
                      className="group inline-flex h-11 items-center gap-2 border border-line-2 px-4 text-sm font-medium transition-colors hover:border-ink"
                    >
                      <Download className="h-4 w-4 text-accent transition-transform group-hover:translate-y-0.5" aria-hidden />
                      PDF
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <ProjectIndex />
      <CadSection />
    </section>
  );
}
