import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const principles = [
  {
    n: "01",
    title: "Check the math",
    body: "Every result gets compared against a hand calculation or a textbook case. Both of my software projects ship with automated tests that do exactly that.",
  },
  {
    n: "02",
    title: "Build it for real",
    body: "Ramps on real driveways, a joystick cut on a drill mill, a robot soldered by hand. An idea teaches you a lot more once it physically exists.",
  },
  {
    n: "03",
    title: "Make it legible",
    body: "A summer in graphic design taught me that a clear drawing, interface or README is part of the engineering, not decoration on top of it.",
  },
];

const now: [string, string][] = [
  ["Studying", "1A Mechanical Engineering, Waterloo"],
  ["Team", "Waterloo Rocketry · Propulsion (2026)"],
  ["Building", "Truss Lab and Mech Lab"],
  ["Looking for", "Engineering co-op roles"],
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="shell py-20 sm:py-28">
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
            Alongside that I write software that makes engineering easier to check: a Python toolkit for mechanics hand
            calculations and a structural solver that runs in the browser. I&apos;m drawn to <strong>propulsion and
            aerospace</strong>, which is why I joined Waterloo Rocketry&apos;s propulsion team, and to the analytical
            side of <strong>finance</strong>, where the same habits of modelling and checking apply.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-3">
        {principles.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.08} className="bg-paper p-6 sm:p-8">
            <span className="font-mono text-xs text-accent">{p.n}</span>
            <h3 className="mt-6 text-xl font-medium tracking-tight">{p.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{p.body}</p>
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
