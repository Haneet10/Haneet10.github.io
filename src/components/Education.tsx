import { education } from "@/content/resume";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Education() {
  const hs = education.highSchool;
  return (
    <section id="education" aria-label="Education" className="shell py-16 sm:py-24 lg:py-28">
      <SectionHeading sheet="05" title="Education" note="Academic record" />
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-7">
          <div className="ticks border border-line p-6 sm:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="label">{education.period}</p>
              <p className="label !text-accent">{education.status}</p>
            </div>
            <h3 className="mt-8 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">{education.school}</h3>
            <p className="mt-3 text-lg text-ink-2">{education.degree}</p>
            <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
              <div className="bg-paper p-4">
                <p className="label">Program</p>
                <p className="mt-1 text-sm">Co-op: alternating study and paid work terms</p>
              </div>
              <div className="bg-paper p-4">
                <p className="label">Team</p>
                <p className="mt-1 text-sm">Waterloo Rocketry · Propulsion</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-6">
            <div>
              <h3 className="text-lg font-medium tracking-tight">{hs.school}</h3>
              <p className="text-sm text-muted">{hs.credential} · {hs.period}</p>
            </div>
            <p className="font-mono text-[13px]">{hs.note}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <p className="label">Leadership & involvement</p>
          <ul className="mt-4 border-t border-line">
            {education.involvement.map((item) => (
              <li key={item} className="border-b border-line py-3 text-[15px] leading-snug text-ink-2">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
