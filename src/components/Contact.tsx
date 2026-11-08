import { profile } from "@/content/profile";
import { Reveal } from "./Reveal";
import { CopyEmail } from "./CopyEmail";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import { ArrowUpRight, Download } from "lucide-react";

export function Contact() {
  const links = [
    { label: "LinkedIn", value: "linkedin.com/in/haneet-singh-uw", href: profile.links.linkedin, Icon: LinkedInIcon },
    { label: "GitHub", value: "github.com/Haneet10", href: profile.links.github, Icon: GitHubIcon },
  ];
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line bg-paper-2">
      <div className="grid-paper pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" aria-hidden />
      <div className="shell relative py-20 sm:py-28">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-accent">06</span>
          <span className="label">Sheet 06 · Contact</span>
        </div>
        <Reveal>
          <h2 id="contact-title" className="mt-10 max-w-4xl text-[clamp(2.6rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.045em]">
            Have a project, a role or a question? <span className="font-serif font-normal italic text-muted">Let&apos;s talk.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-14 grid gap-px border border-line-2 bg-line-2 sm:grid-cols-2">
          <div className="bg-paper p-6 sm:p-8">
            <p className="label">Email</p>
            <a href={`mailto:${profile.email}`} className="mt-3 block break-all text-xl font-medium tracking-tight hover:text-accent sm:text-2xl">
              {profile.email}
            </a>
            <CopyEmail email={profile.email} />
          </div>
          {links.map(({ label, value, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex flex-col justify-between gap-8 bg-paper p-6 transition-colors hover:bg-paper-3 sm:p-8">
              <div className="flex items-center justify-between">
                <p className="label">{label}</p>
                <ArrowUpRight className="h-4 w-4 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden />
              </div>
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5" />
                <span className="text-lg tracking-tight">{value}</span>
              </div>
            </a>
          ))}
          <a href={profile.portfolioPdf} download className="group flex flex-col justify-between gap-8 bg-ink p-6 text-paper transition-colors hover:bg-accent sm:p-8">
            <div className="flex items-center justify-between">
              <p className="label !text-paper/60">Printable portfolio</p>
              <Download className="h-4 w-4 text-accent transition-all group-hover:translate-y-0.5 group-hover:text-paper" aria-hidden />
            </div>
            <div>
              <span className="block text-lg tracking-tight">Haneet Singh · Engineering Portfolio</span>
              <span className="mt-1 block font-mono text-[11px] text-paper/60">PDF · {profile.portfolioPages} pages · letter</span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
