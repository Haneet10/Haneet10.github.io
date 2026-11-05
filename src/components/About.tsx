import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

// Each principle points at the project that shows it.
const principles = [
  {
    n: "01",
    title: "Start from the constraint",
    body: "A door 36 inches up. Two motors that don't match. A bag of parts and a clock. The constraint decides the design, so I start there.",
    href: "/work/accessibility-ramps/",
    link: "See the ramps",
  },
  {
    n: "02",
    title: "Iterate on the real thing",
    body: "Repeated test runs took the drift out of the rover and the false inputs out of the joystick. Real hardware teaches what a plan can't.",
    href: "/work/arduino-rover/",
    link: "See the rover",
  },
  {
    n: "03",
    title: "Make it legible",
    body: "A summer in graphic design taught me that a clear drawing, interface or write-up is part of the engineering, not decoration on top of it.",
    href: "/#experience",
    link: "See the experience",
  },
];

const now: [string, string][] = [
  ["Studying", "1A Mechanical Engineering, Waterloo"],
  ["Team", "Waterloo Rocketry · Propulsion"],
  ["Interests", "Propulsion, robotics, quant finance"],
  ["Looking for", "Engineering co-op roles"],
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="shell py-16 sm:py-24 lg:py-28">
      <SectionHeading sheet="01" title="About" note="Background & approach" />
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-6">
          <p id="about-title" className="font-serif text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] tracking-[-0.01em]">
            I like problems you can measure, and solutions people can <em className="whitespace-nowrap text-accent">stand on.</em>
          </p>
        </Reveal>
        <Reveal delay={0.1} className="prose-sheet text-[17px] lg:col-span-5 lg:col-start-8">
          <p>
            I&apos;m a first-year <strong>Mechanical Engineering</strong> student in the co-op program at the{" "}
            <strong>University of Waterloo</strong>. In the year before university I worked as a junior technician at a
            home-health company, servicing wheelchairs and scooters and installing accessibility ramps at people&apos;s
            homes. It taught me that engineering is judged by whether it works for the person using it.
          </p>
          <p>
            Outside work I build: an arcade controller machined from a door stop, a rover tuned in code until it stopped
            drifting, and a walkie-talkie my team finished first at a workshop competition. I&apos;m drawn to{" "}
            <strong>propulsion and aerospace</strong>, which is why I joined Waterloo Rocketry&apos;s propulsion team,
            and to the analytical side of <strong>finance</strong>, where the same habits of modelling and checking
            apply.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-3">
        {principles.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.08} className="flex flex-col bg-paper p-6 sm:p-8">
            <span className="font-mono text-xs text-accent">{p.n}</span>
            <h3 className="mt-6 text-xl font-medium tracking-tight">{p.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{p.body}</p>
            <Link href={p.href} className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium">
              <span className="link-underline">{p.link}</span>
              <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8">
        <dl className="grid grid-cols-1 border-b border-line sm:grid-cols-2 lg:grid-cols-4">
          {now.map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-4 border-t border-line py-3 lg:flex-col lg:gap-1">
              <dt className="label w-28 shrink-0 lg:w-auto">{k}</dt>
              <dd className="text-sm">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
