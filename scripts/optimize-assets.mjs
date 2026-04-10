import { readdir, stat, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const SRC_DIR = new URL('../public/images/', import.meta.url).pathname.replace(/^\//, '');
const OUT_DIR = SRC_DIR; // overwrite in place

const profiles = {
  // Large background / hero — 1600px wide, high quality
  'hero-bg':               { width: 1920, quality: 72 },
  'preventivo-bg':         { width: 1920, quality: 72 },
  // Service card images — displayed ~600-800px wide on desktop
  'tecnico-fotovoltaico':  { width: 1200, quality: 78 },
  'tecnico-condizionatore':{ width: 1200, quality: 78 },
  'tecnico-caldaia':       { width: 1200, quality: 78 },
  'tecnico-solare-termico':{ width: 1200, quality: 78 },
  // About section
  'chi-siamo-team':        { width: 1000, quality: 78 },
  'chi-siamo-lavoro':      { width: 1000, quality: 78 },
  // Gallery
  'pannelli-casa-sicilia': { width: 1200, quality: 78 },
  'impianto-completato':   { width: 1200, quality: 78 },
};

const humanSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
};

async function main() {
  const files = await readdir(SRC_DIR);
  const pngs = files.filter((f) => f.toLowerCase().endsWith('.png'));

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of pngs) {
    const base = parse(file).name;
    const profile = profiles[base] || { width: 1400, quality: 78 };
    const srcPath = join(SRC_DIR, file);
    const outPath = join(OUT_DIR, `${base}.jpg`);

    const beforeStat = await stat(srcPath);
    totalBefore += beforeStat.size;

    await sharp(srcPath)
      .resize({ width: profile.width, withoutEnlargement: true })
      .jpeg({ quality: profile.quality, mozjpeg: true, progressive: true })
      .toFile(outPath);

    const afterStat = await stat(outPath);
    totalAfter += afterStat.size;

    const saved = (1 - afterStat.size / beforeStat.size) * 100;
    console.log(
      `  ${file.padEnd(32)} ${humanSize(beforeStat.size).padStart(10)} → ${humanSize(
        afterStat.size
      ).padStart(10)}  (-${saved.toFixed(0)}%)`
    );
  }

  console.log('\n  TOTAL:'.padEnd(34), humanSize(totalBefore).padStart(10), '→', humanSize(totalAfter).padStart(10));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
