import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { experience } from "@/content/resume";
import { getProject } from "@/content/projects";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="shell py-20 sm:py-28">
      <SectionHeading
        sheet="03"
        title="Experience"
        note="Work & teams"
        lead="Hands-on field work, design and a rocketry team."
      />
      <ol className="border-t border-ink">
        {experience.map((role, i) => {
          const current = role.end === "Present";
          return (
            <Reveal as="li" key={role.org} className="grid gap-6 border-b border-line py-10 lg:grid-cols-12 lg:gap-8 lg:py-12">
              <div className="flex items-baseline justify-between lg:col-span-3 lg:block">
                <p className="font-mono text-[13px] tabular-nums text-ink-2">
                  {role.start} — {role.end}
                </p>
                <p className="label mt-2 flex items-center gap-2">
                  {current && <span className="relative inline-flex h-1.5 w-1.5"><span className="absolute inset-0 animate-ping bg-accent opacity-60" /><span className="relative h-1.5 w-1.5 bg-accent" /></span>}
                  03.{i + 1}
                </p>
              </div>
              <div className="lg:col-span-4">
                <h3 className="text-2xl font-medium tracking-[-0.02em] sm:text-[1.7rem]">{role.org}</h3>
                <p className="mt-1.5 text-ink-2">{role.title}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {role.tags.map((t) => (
                    <span key={t} className="border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5">
                <p className="text-[17px] leading-relaxed text-ink">{role.summary}</p>
                {role.points.length > 0 && (
                  <ul className="mt-5 space-y-3">
                    {role.points.map((pt) => (
                      <li key={pt} className="relative pl-5 text-[15px] leading-relaxed text-ink-2">
                        <span className="absolute left-0 top-[0.7em] h-px w-2.5 bg-accent" aria-hidden />
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
                {role.projects?.map((slug) => {
                  const p = getProject(slug);
                  return p ? (
                    <Link key={slug} href={`/work/${slug}/`} className="group mt-6 inline-flex items-center gap-2 text-sm font-medium">
                      <span className="link-underline">See the project: {p.title}</span>
                      <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  ) : null;
                })}
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
