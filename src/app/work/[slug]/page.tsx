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
import { SheetToc } from "@/components/SheetToc";
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
    description: `${p.purpose.lead} ${p.result.lead}`,
    alternates: { canonical: `/work/${p.slug}/` },
    openGraph: { title: p.title, description: p.tagline, images: ogImage ? [ogImage] : ["/og.png"] },
  };
}

function Chapter({ id, n, title, children }: { id: string; n: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal as="section">
      <div id={id} className="scroll-mt-28 border-t border-line pt-6">
        <p className="label flex items-center gap-3">
          <span className="font-mono text-accent">{n}</span>
          {title}
        </p>
        <div className="mt-8">{children}</div>
      </div>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const idx = projects.indexOf(p);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const no = String(idx + 1).padStart(2, "0");
  const sheet = `02.${no}`;
  const hasPhotos = Boolean(p.gallery?.length || p.video);

  const toc = [
    { id: "brief", label: "Brief", mark: "01" },
    { id: "process", label: "Process", mark: "02" },
    { id: "failure-mode", label: p.challenges.length > 1 ? "Failure modes" : "Failure mode", mark: "03" },
    { id: "outcome", label: "Outcome", mark: "04" },
    ...(p.next?.length ? [{ id: "rev-b", label: "Rev. B", mark: "05" }] : []),
    ...(p.interactive ? [{ id: "model", label: "Working model", mark: "◆" }] : []),
    { id: "spec", label: p.engineers ? "Specification & detail" : "Specification", mark: "Σ" },
    ...(hasPhotos ? [{ id: "photos", label: "Photos", mark: "▣" }] : []),
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
              <span className="text-accent">{no}</span>
              <span className="h-px w-6 bg-line-2" aria-hidden />
              {p.disciplines.join(" · ")}
            </p>
            <h1 className="mt-6 text-[clamp(2.6rem,6.5vw,5.25rem)] font-medium leading-[0.95] tracking-[-0.045em]">{p.title}</h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink-2">{p.tagline}</p>
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
                <dt className="label pt-0.5">Methods</dt>
                <dd className="leading-relaxed text-ink-2">{p.skills.join(" · ")}</dd>
              </div>
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
              <div className={`ticks relative overflow-hidden bg-paper-2 ${getImage(p.cover.image).ratio < 1.2 ? "aspect-[16/10] sm:aspect-[21/9]" : ""}`}>
                <Picture image={p.cover.image} alt={p.cover.alt} focus={p.cover.focus} priority sizes="100vw" fill={getImage(p.cover.image).ratio < 1.2} />
              </div>
              <figcaption className="label mt-3 flex justify-between">
                <span>Fig. {sheet}.0</span>
                <span className="hidden sm:inline">{p.context}</span>
              </figcaption>
            </figure>
          </Reveal>
        )}

        {/* Outcomes */}
        <Reveal>
          <dl className={`mt-12 grid grid-cols-2 gap-px border border-line-2 bg-line-2 ${p.outcomes.length >= 3 ? "lg:grid-cols-3" : ""}`}>
            {p.outcomes.map((o) => (
              <div key={o.label} className="bg-paper p-5 sm:p-7">
                <dt className="sr-only">{o.label}</dt>
                <dd>
                  <span className="block text-[clamp(2.2rem,5vw,3.5rem)] font-medium leading-none tracking-[-0.045em] tabular-nums">{o.value}</span>
                  <span className="mt-3 block text-sm text-muted">{o.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Body */}
        <div className="grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-8">
          <aside className="hidden lg:col-span-3 lg:block">
            <SheetToc items={toc} />
          </aside>

          <div className="space-y-24 lg:col-span-8 lg:col-start-5">
            <Chapter id="brief" n="01" title="Brief · the problem">
              <p className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-medium leading-[1.25] tracking-[-0.02em]">{p.purpose.lead}</p>
              {p.purpose.body?.map((para) => (
                <p key={para.slice(0, 32)} className="mt-6 text-[17px] leading-[1.75] text-ink-2">
                  {para}
                </p>
              ))}
            </Chapter>

            <Chapter id="process" n="02" title="Process · how it was built">
              <ol className="relative">
                {p.approach.map((step, i) => (
                  <li key={step.heading} className="relative grid grid-cols-[2.5rem_1fr] gap-4 pb-10 last:pb-0 sm:grid-cols-[3.5rem_1fr]">
                    {i < p.approach.length - 1 && <span className="absolute bottom-0 left-[0.95rem] top-9 w-px bg-line-2 sm:left-[1.2rem]" aria-hidden />}
                    <span className="relative z-10 grid h-8 w-8 place-items-center border border-ink bg-paper font-mono text-[11px] sm:h-10 sm:w-10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="pt-1 sm:pt-2">
                      <h3 className="text-xl font-medium tracking-[-0.02em]">{step.heading}</h3>
                      <p className="mt-2 text-[16px] leading-[1.7] text-ink-2">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Chapter>

            <Chapter id="failure-mode" n="03" title={p.challenges.length > 1 ? "Failure modes · and the fixes" : "Failure mode · and the fix"}>
              <div className="space-y-6">
                {p.challenges.map((c, i) => (
                  <div key={c.title}>
                    <p className="mb-3 flex items-baseline gap-3 text-[15px] font-medium">
                      <span className="font-mono text-[11px] text-accent">FM-{i + 1}</span>
                      {c.title}
                    </p>
                    <div className="grid gap-px border border-line-2 bg-line-2 sm:grid-cols-2">
                      <div className="bg-paper p-6 sm:p-8">
                        <p className="label flex items-center gap-2">
                          <span className="inline-block h-2 w-2 border border-ink" aria-hidden /> Observed
                        </p>
                        <p className="mt-4 text-[17px] leading-[1.65] text-ink">{c.problem}</p>
                        {c.cause && (
                          <p className="mt-4 border-t border-line pt-4 text-[15px] leading-[1.65] text-ink-2">
                            <span className="label mr-2">Cause</span>
                            {c.cause}
                          </p>
                        )}
                      </div>
                      <div className="bg-paper-2 p-6 sm:p-8">
                        <p className="label flex items-center gap-2 !text-accent">
                          <span className="inline-block h-2 w-2 bg-accent" aria-hidden /> Resolved
                        </p>
                        <p className="mt-4 text-[17px] leading-[1.65] text-ink">{c.fix}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Chapter>

            <Chapter id="outcome" n="04" title="Outcome · what it delivered">
              <p className="border-l-2 border-accent pl-5 text-[clamp(1.5rem,2.6vw,2.1rem)] font-medium leading-[1.25] tracking-[-0.02em]">
                {p.result.lead}
              </p>
              {p.result.body?.map((para) => (
                <p key={para.slice(0, 32)} className="mt-6 text-[17px] leading-[1.75] text-ink-2">
                  {para}
                </p>
              ))}
              {p.quote && (
                <figure className="mt-12 border-l border-line-2 pl-6 sm:pl-8">
                  <p className="label">Margin note</p>
                  <blockquote className="mt-4 font-serif text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.25] tracking-[-0.01em]">
                    &ldquo;{p.quote.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 font-mono text-[12px] text-muted">
                    — {p.quote.by ?? "H.S."}
                    {p.quote.source && <span className="italic">, {p.quote.source}</span>}
                  </figcaption>
                </figure>
              )}
            </Chapter>

            {p.next?.length ? (
              <Chapter id="rev-b" n="05" title="Rev. B · what the next version changes">
                <ol className="border-t border-ink">
                  {p.next.map((item, i) => (
                    <li key={item.slice(0, 32)} className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-line py-4">
                      <span className="pt-0.5 font-mono text-[12px] text-accent">B.{i + 1}</span>
                      <span className="text-[16px] leading-[1.65] text-ink-2">{item}</span>
                    </li>
                  ))}
                </ol>
              </Chapter>
            ) : null}

            {p.interactive && (
              <Reveal as="section">
                <div id="model" className="scroll-mt-28">
                  {p.interactive === "ramp-calculator" && <RampCalculator />}
                  {p.interactive === "amortization" && <AmortizationFigure />}
                </div>
              </Reveal>
            )}

            <Reveal as="section">
              <div id="spec" className="scroll-mt-28">
                <p className="label">Specification</p>
                <dl className="mt-4 grid border-t border-ink sm:grid-cols-2 sm:gap-x-8">
                  {p.specs.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6 border-b border-line py-3 text-sm">
                      <dt className="text-muted">{k}</dt>
                      <dd className="text-right font-mono text-[13px]">{v}</dd>
                    </div>
                  ))}
                </dl>
                {p.engineers && (
                  <div className="mt-10 border border-line bg-paper-2 p-6 sm:p-8">
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
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {hasPhotos && (
          <section id="photos" aria-label="Photos" className="scroll-mt-24 border-t border-line pb-24 pt-10">
            <div className="mb-8 flex items-baseline justify-between">
              <p className="label">Photos · {(p.gallery?.length ?? 0) + (p.video ? 1 : 0)}</p>
            </div>
            <Gallery figures={p.gallery ?? []} video={p.video} sheet={sheet} />
          </section>
        )}
      </div>

      {/* Previous / next */}
      <nav aria-label="More projects" className="grid border-t border-line sm:grid-cols-2">
        {[
          { p: prev, dir: "Previous", Icon: ArrowLeft },
          { p: next, dir: "Next", Icon: ArrowRight },
        ].map(({ p: q, dir, Icon }) => (
          <Link
            key={dir}
            href={`/work/${q.slug}/`}
            className={`group flex flex-col gap-4 bg-paper-2 px-4 py-10 transition-colors hover:bg-paper-3 sm:px-8 sm:py-14 lg:px-12 ${
              dir === "Next" ? "border-t border-line sm:items-end sm:border-l sm:border-t-0 sm:text-right" : ""
            }`}
          >
            <span className="label flex items-center gap-2">
              {dir === "Previous" && <Icon className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden />}
              {dir} sheet · {String(projects.indexOf(q) + 1).padStart(2, "0")}
              {dir === "Next" && <Icon className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-1" aria-hidden />}
            </span>
            <span className="text-2xl font-medium tracking-[-0.03em] sm:text-4xl">{q.title}</span>
          </Link>
        ))}
      </nav>
    </article>
  );
}
