import { Reveal } from "./Reveal";

type Props = { id?: string; sheet: string; title: string; note: string; lead?: React.ReactNode };

/** Sheet header: number, title and a dimension line carrying the section note. */
export function SectionHeading({ sheet, title, note, lead }: Props) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <div className="flex items-center gap-4 border-t border-line-2 pt-4">
        <span className="font-mono text-xs text-accent">{sheet}</span>
        <span className="label">Sheet {sheet}</span>
        <div className="relative hidden flex-1 items-center sm:flex" aria-hidden>
          <span className="h-2.5 w-px bg-line-2" />
          <span className="h-px flex-1 bg-line-2" />
          <span className="label bg-paper px-3 !text-faint">{note}</span>
          <span className="h-px flex-1 bg-line-2" />
          <span className="h-2.5 w-px bg-line-2" />
        </div>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <h2 className="text-4xl font-medium tracking-[-0.03em] sm:text-5xl lg:col-span-5 lg:text-6xl">{title}</h2>
        {lead && <div className="max-w-xl text-lg leading-relaxed text-ink-2 lg:col-span-6 lg:col-start-7 lg:pt-3">{lead}</div>}
      </div>
    </Reveal>
  );
}
