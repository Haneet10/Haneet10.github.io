// Converts source photos into web-ready responsive WebP sets.
// Usage: node scripts/process-images.mjs <source-dir>
// Strips all metadata (including GPS) and writes public/images/<slug>/<name>-<w>.webp
// plus src/content/images.generated.json with intrinsic sizes for layout.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import manifest from "./image-manifest.mjs";

const src = process.argv[2];
if (!src) {
  console.error("usage: node scripts/process-images.mjs <source-dir>");
  process.exit(1);
}
const WIDTHS = [640, 1280, 1920];
const out = {};

for (const item of manifest) {
  let img = sharp(path.join(src, item.file)).rotate(); // honour EXIF orientation
  if (item.rotate) img = img.rotate(item.rotate);
  const buf = await img.toBuffer();
  let base = sharp(buf);
  const meta = await base.metadata();
  if (item.crop) {
    const [l, t, r, b] = item.crop; // fractions of width/height
    const left = Math.round(meta.width * l), top = Math.round(meta.height * t);
    base = base.extract({ left, top, width: Math.round(meta.width * (r - l)), height: Math.round(meta.height * (b - t)) });
  }
  let cropped = await base.toBuffer({ resolveWithObject: true });
  if (item.redact) {
    // Blank out private details (client names, reference numbers) before publishing.
    const { width: w, height: h } = cropped.info;
    const boxes = item.redact.map(([l, t, r, b]) => {
      const bw = Math.round(w * (r - l)), bh = Math.round(h * (b - t));
      return { input: { create: { width: bw, height: bh, channels: 3, background: item.redactColor ?? "#ececec" } }, left: Math.round(w * l), top: Math.round(h * t) };
    });
    cropped = await sharp(cropped.data).composite(boxes).toBuffer({ resolveWithObject: true });
  }
  const { width, height } = cropped.info;
  const dir = path.join("public/images", item.slug);
  await mkdir(dir, { recursive: true });
  const widths = WIDTHS.filter((w) => w < width).concat(Math.min(width, 1920)).filter((v, i, a) => a.indexOf(v) === i);
  for (const w of widths) {
    await sharp(cropped.data).resize({ width: w }).webp({ quality: item.quality ?? 78 }).toFile(path.join(dir, `${item.name}-${w}.webp`));
  }
  out[`${item.slug}/${item.name}`] = { width, height, widths };
  console.log(`${item.slug}/${item.name}`, width, "x", height);
}
await writeFile("src/content/images.generated.json", JSON.stringify(out, null, 2) + "\n");
