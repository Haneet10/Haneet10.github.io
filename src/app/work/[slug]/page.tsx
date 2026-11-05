import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { Picture } from "@/components/Picture";
import { Reveal } from "@/components/Reveal";
import { Gallery } from "@/components/Gallery";
import { RampCalculator } from "@/components/RampCalculator";
import { AmortizationFigure } from "@/components/AmortizationFigure";
import { GitHubIcon } from "@/components/Icons";
import { getImage } from "@/lib/images";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const ogImage = p.cover ? getImage(p.cover.image).srcSet.split(", ").at(-2)?.split(" ")[0] : undefined;
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}/` },
    openGraph: { title: p.title, description: p.tagline, images: ogImage ? [ogImage] : ["/og.png"] },
  };
}

const LETTERS = "ABCDEFGH";

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length];
  const sheet = `02.${String(idx + 1).padStart(2, "0")}`;

  const toc = [
    ...p.sections.map((s, i) => ({ id: `s-${i}`, label: s.heading, mark: LETTERS[i] })),
    ...(p.interactive ? [{ id: "figure", label: "Try it", mark: "◆" }] : []),
    ...(p.engineers ? [{ id: "engineers", label: "For engineers", mark: "Σ" }] : []),
    ...(p.gallery?.length || p.video ? [{ id: "gallery", label: "Photos", mark: "▣" }] : []),
  ];

  return (
    <article className="pt-16">
      <div className="shell">
        <div className="flex items-center justify-between border-b border-line py-3">
          <Link href="/#work" className="label group inline-flex items-center gap-2 hover:!text-ink">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden />
            All work
          </Link>
          <span className="label">Sheet {sheet}</span>
        </div>

        {/* Title block */}
        <header className="grid gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <p className="label flex items-center gap-3">
              <span className="text-accent">{String(idx + 1).padStart(2, "0")}</span>
              <span className="h-px w-6 bg-line-2" aria-hidden />
              {p.disciplines.join(" · ")}
            </p>
            <h1 className="mt-6 text-[clamp(2.6rem,6.5vw,5.25rem)] font-medium leading-[0.95] tracking-[-0.045em]">{p.title}</h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink-2">{p.summary}</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:pt-3">
            <dl className="border-t border-ink">
              {[
                ["Year", p.year],
                ["Context", p.context],
                ["Role", p.role],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-3 text-sm">
                  <dt className="label pt-0.5">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-3 text-sm">
                <dt className="label pt-0.5">Tools</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {p.tools.map((t) => (
                    <span key={t} className="border border-line px-2 py-0.5 font-mono text-[11px] text-ink-2">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            {p.links && (
              <div className="mt-6 flex flex-wrap gap-2">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`group inline-flex h-10 items-center gap-2 px-4 text-sm font-medium transition-colors ${
                      l.kind === "live" ? "bg-ink text-paper hover:bg-accent" : "border border-line-2 hover:border-ink"
                    }`}
                  >
                    {l.kind === "github" && <GitHubIcon className="h-4 w-4" />}
                    {l.label}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </a>
                ))}
              </div>
            )}
          </Reveal>
        </header>

        {p.cover && (
          <Reveal as="div">
            <figure>
              <div className={`ticks relative overflow-hidden bg-paper-2 ${getImage(p.cover.image).ratio < 1 ? "aspect-[16/10] sm:aspect-[21/10]" : ""}`}>
                <Picture image={p.cover.image} alt={p.cover.alt} focus={p.cover.focus} priority sizes="100vw" fill={getImage(p.cover.image).ratio < 1} />
              </div>
              <figcaption className="label mt-3 flex justify-between">
                <span>Fig. {sheet}.0</span>
                <span className="hidden sm:inline">{p.context}</span>
              </figcaption>
            </figure>
          </Reveal>
        )}

        {/* Body */}
        <div className="grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-8">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="On this sheet" className="sticky top-28">
              <p className="label">On this sheet</p>
              <ol className="mt-4 border-t border-line">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="flex gap-3 border-b border-line py-2.5 text-sm text-muted transition-colors hover:text-ink">
                      <span className="w-4 font-mono text-[11px] text-accent">{t.mark}</span>
                      {t.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            {/* Spec sheet */}
            <Reveal>
              <p className="label">Specification</p>
              <dl className="mt-4 grid border-t border-ink sm:grid-cols-2 sm:gap-x-8">
                {p.specs.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-line py-3 text-sm">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-right font-mono text-[13px]">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <div className="mt-20 space-y-16">
              {p.sections.map((s, i) => (
                <Reveal as="section" key={s.heading}>
                  <div id={`s-${i}`} className="scroll-mt-28">
                    <h2 className="flex items-baseline gap-4 text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
                      <span className="font-mono text-sm text-accent">{LETTERS[i]}</span>
                      {s.heading}
                    </h2>
                    <div className="prose-sheet mt-6 text-[17px]">
                      {s.body.map((para) => (
                        <p key={para.slice(0, 32)}>{para}</p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {p.interactive && (
              <Reveal as="section" className="mt-20">
                <div id="figure" className="scroll-mt-28">
                  {p.interactive === "ramp-calculator" && <RampCalculator />}
                  {p.interactive === "amortization" && <AmortizationFigure />}
                </div>
              </Reveal>
            )}

            {p.engineers && (
              <Reveal as="section" className="mt-20">
                <div id="engineers" className="scroll-mt-28 border border-line bg-paper-2 p-6 sm:p-8">
                  <p className="label flex items-center gap-3">
                    <span className="font-mono text-accent">Σ</span> For engineers
                  </p>
                  <div className="mt-5 space-y-4">
                    {p.engineers.map((para) => (
                      <p key={para.slice(0, 32)} className="font-mono text-[13px] leading-[1.8] text-ink-2">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>

        {(p.gallery?.length || p.video) && (
          <section id="gallery" aria-label="Photos" className="scroll-mt-24 border-t border-line pb-24 pt-10">
            <div className="mb-8 flex items-baseline justify-between">
              <p className="label">Photos · {(p.gallery?.length ?? 0) + (p.video ? 1 : 0)}</p>
              <p className="label hidden sm:block">Select to enlarge</p>
            </div>
            <Gallery figures={p.gallery ?? []} video={p.video} sheet={sheet} />
          </section>
        )}
      </div>

      {/* Next */}
      <Link href={`/work/${next.slug}/`} className="group block border-t border-line bg-paper-2 transition-colors hover:bg-paper-3">
        <div className="shell flex items-end justify-between gap-6 py-14 sm:py-20">
          <div>
            <p className="label">Next sheet · {String(projects.indexOf(next) + 1).padStart(2, "0")}</p>
            <p className="mt-4 text-3xl font-medium tracking-[-0.03em] sm:text-5xl">{next.title}</p>
          </div>
          <ArrowRight className="mb-2 h-7 w-7 shrink-0 text-accent transition-transform duration-500 group-hover:translate-x-2" aria-hidden />
        </div>
      </Link>
    </article>
  );
}
