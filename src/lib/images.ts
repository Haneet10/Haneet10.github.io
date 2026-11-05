import data from "@/content/images.generated.json";

type Entry = { width: number; height: number; widths: number[] };
const images = data as Record<string, Entry>;

export function getImage(key: string) {
  const entry = images[key];
  if (!entry) throw new Error(`Unknown image "${key}". Add it to scripts/image-manifest.mjs and run npm run images.`);
  const srcSet = entry.widths.map((w) => `/images/${key}-${w}.webp ${w}w`).join(", ");
  const fallback = `/images/${key}-${entry.widths[Math.min(1, entry.widths.length - 1)]}.webp`;
  return { ...entry, srcSet, src: fallback, ratio: entry.width / entry.height };
}
