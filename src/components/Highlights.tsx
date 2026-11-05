import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { highlights } from "@/content/profile";

/** Key results under the hero. Each cell is a button to the evidence behind the number. */
export function Highlights() {
  return (
    <div className="border border-line-2">
      <div className="flex items-center justify-between border-b border-line-2 px-4 py-2.5">
        <span className="label !text-[10px]">Key results</span>
        <span className="label hidden !text-[10px] sm:block">Select any figure for the evidence</span>
      </div>
      <ul className="grid grid-cols-2 gap-px bg-line-2 lg:grid-cols-4">
        {highlights.map((h) => (
          <li key={h.label} className="bg-paper">
            <Link href={h.href} className="group relative flex h-full flex-col justify-between gap-6 p-4 transition-colors duration-300 hover:bg-paper-2 sm:p-5">
              <span className="flex items-baseline gap-1.5">
                <span className="text-[clamp(1.9rem,4vw,2.75rem)] font-medium leading-none tracking-[-0.04em] tabular-nums">{h.value}</span>
                <span className="font-mono text-xs text-accent">{h.unit}</span>
              </span>
              <span className="pr-5 text-[13px] leading-snug text-muted transition-colors group-hover:text-ink-2">{h.label}</span>
              <ArrowUpRight
                className="absolute right-3 top-3 h-4 w-4 text-faint opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
