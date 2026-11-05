import Link from "next/link";
import { skills } from "@/content/resume";
import { getProject, projects } from "@/content/projects";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <section id="skills" aria-label="Technical skills" className="shell py-16 sm:py-24 lg:py-28">
      <SectionHeading
        sheet="04"
        title="Skills"
        note="Tools & methods"
        lead="Tools and methods, each tied to the project where it was used."
      />
      <div className="grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
        {skills.map((group, gi) => (
          <Reveal key={group.title} delay={(gi % 3) * 0.06} className="bg-paper p-6 sm:p-8">
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-medium tracking-tight">{group.title}</h3>
              <span className="font-mono text-[11px] text-faint">04.{gi + 1}</span>
            </div>
            <p className="label mt-1">{group.note}</p>
            <ul className="mt-6 divide-y divide-line border-t border-line">
              {group.items.map((s) => (
                <li key={s.name} className="py-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[15px] text-ink">{s.name}</span>
                    {s.evidence && (
                      <span className="flex shrink-0 gap-1">
                        {s.evidence.map((slug) => {
                          const p = getProject(slug);
                          return p ? (
                            <Link
                              key={slug}
                              href={`/work/${slug}/`}
                              title={p.title}
                              className="border border-line px-1.5 font-mono text-[10px] leading-5 text-muted transition-colors hover:border-accent hover:text-accent"
                            >
                              {String(skillsIndex(slug)).padStart(2, "0")}
                              <span className="sr-only"> {p.title}</span>
                            </Link>
                          ) : null;
                        })}
                      </span>
                    )}
                  </div>
                  {s.detail && <p className="mt-0.5 text-[13px] text-muted">{s.detail}</p>}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
        <Reveal className="flex flex-col justify-end bg-paper-2 p-6 sm:p-8">
          <p className="label">Key</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-2">
            Numbered tags refer to entries in the project register. <span className="font-mono text-[11px] text-muted">[03]</span> means the skill is
            used in project 03.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function skillsIndex(slug: string) {
  return projects.findIndex((p) => p.slug === slug) + 1;
}
