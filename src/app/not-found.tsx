import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell grid min-h-[80dvh] place-items-center pt-16">
      <div className="text-center">
        <p className="label">Sheet not found · 404</p>
        <h1 className="mt-6 text-5xl font-medium tracking-[-0.04em] sm:text-7xl">
          This drawing <span className="font-serif font-normal italic">isn&apos;t in the set.</span>
        </h1>
        <Link href="/" className="mt-10 inline-flex h-11 items-center bg-ink px-5 text-sm font-medium text-paper hover:bg-accent">
          Back to the cover sheet
        </Link>
      </div>
    </section>
  );
}
