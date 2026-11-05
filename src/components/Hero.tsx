import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { NozzleFigure } from "./NozzleFigure";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import { HeroIntro } from "./HeroIntro";

const titleBlock: [string, string][] = [
  ["Drawn by", profile.name],
  ["Discipline", "Mechanical Eng. · Co-op"],
  ["Institution", "University of Waterloo"],
  ["Class of", profile.classOf],
  ["Interests", "Propulsion · Robotics"],
  ["Sheet", "00 / 06"],
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-16">
      <div
        className="grid-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_40%,#000_30%,transparent_80%)]"
        aria-hidden
      />
      <div className="shell relative">
        <div className="flex items-center justify-between border-b border-line py-3">
          <span className="label">Sheet 00 · Cover</span>
          <span className="label hidden sm:block">Portfolio · Rev A · Nov 2026</span>
        </div>

        <div className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-24">
          <HeroIntro className="lg:col-span-5">
            <p className="label mb-6 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 bg-accent" aria-hidden />
              Mechanical Engineering · University of Waterloo
            </p>
            <h1 id="hero-title" className="text-[clamp(3.4rem,9vw,7.25rem)] font-medium leading-[0.9] tracking-[-0.045em]">
              Haneet
              <br />
              <span className="font-serif font-normal italic tracking-[-0.02em]">Singh</span>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-2 sm:text-xl">
              I build across hardware, software and the numbers in between, from wheelchair ramps installed to code to
              structural solvers that run in your browser.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/#work"
                className="group inline-flex h-11 items-center gap-2 bg-ink px-5 text-sm font-medium text-paper transition-colors hover:bg-accent"
              >
                View the work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
              </Link>
              <Link
                href="/#contact"
                className="group inline-flex h-11 items-center gap-2 border border-line-2 px-5 text-sm font-medium transition-colors hover:border-ink"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden />
              <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="grid h-11 w-11 place-items-center text-muted transition-colors hover:text-ink">
                <GitHubIcon className="h-[18px] w-[18px]" />
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="grid h-11 w-11 place-items-center text-muted transition-colors hover:text-ink">
                <LinkedInIcon className="h-[17px] w-[17px]" />
              </a>
            </div>
          </HeroIntro>

          <div className="lg:col-span-7 lg:pl-6">
            <NozzleFigure />
          </div>
        </div>

        {/* Title block */}
        <dl className="grid grid-cols-2 gap-px border border-line-2 bg-line-2 sm:grid-cols-3 lg:grid-cols-6">
          {titleBlock.map(([k, v]) => (
            <div key={k} className="bg-paper px-4 py-3">
              <dt className="label !text-[10px]">{k}</dt>
              <dd className={`mt-1 text-sm ${k === "Sheet" ? "font-mono text-accent" : "text-ink"}`}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
