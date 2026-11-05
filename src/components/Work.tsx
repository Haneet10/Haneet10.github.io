import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Picture } from "./Picture";
import { ProjectIndex } from "./ProjectIndex";

export function Work() {
  const featured = projects.filter((p) => p.featured);
  return (
    <section id="work" aria-label="Work" className="shell py-20 sm:py-28">
      <SectionHeading
        sheet="02"
        title="Work"
        note={`${String(projects.length).padStart(2, "0")} projects`}
        lead="Field installs, hardware builds, engineering software and financial models. Each one has its own sheet with the full story, photos and the technical detail."
      />

      <div className="space-y-20 sm:space-y-28">
        {featured.map((p, i) => (
          <Reveal key={p.slug} as="article">
            <Link href={`/work/${p.slug}/`} className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                <div className="ticks relative aspect-[4/3] overflow-hidden bg-paper-2">
                  {p.cover && (
                    <Picture
                      image={p.cover.image}
                      alt={p.cover.alt}
                      focus={p.cover.focus}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="transition-transform duration-[1.2s] ease-[var(--ease-draft)] group-hover:scale-[1.03]"
                    />
                  )}
                  <span className="label absolute left-3 top-3 bg-paper/90 px-2 py-1 !text-ink backdrop-blur">Fig. 2.{i + 1}</span>
                </div>
              </div>
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className="label">{p.year}</span>
                  <span className="h-px w-6 bg-line-2" aria-hidden />
                  <span className="label">{p.disciplines.join(" · ")}</span>
                </div>
                <h3 className="mt-5 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                  <span className="link-underline">{p.title}</span>
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-ink-2">{p.tagline}</p>
                <dl className="mt-8 border-t border-line">
                  {p.specs.slice(0, 4).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6 border-b border-line py-2.5 text-sm">
                      <dt className="text-muted">{k}</dt>
                      <dd className="text-right font-mono text-[13px]">{v}</dd>
                    </div>
                  ))}
                </dl>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                  Read the full sheet
                  <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <ProjectIndex />
    </section>
  );
}
