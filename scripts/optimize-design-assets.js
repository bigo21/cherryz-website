// Optimise les assets du handoff design vers public/ (tailles réellement affichées).
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = "design_handoff_site_cherryz/assets";
const OUT_PHOTOS = "public/photos";
const OUT_LOGOS = "public/logos";

// Largeur cible par usage (le rendu réel est bien plus petit que la source ~2000-2750px)
const widthFor = (name) => {
  if (/-hero\.jpg$/.test(name)) return 1920;          // heros plein écran
  if (/^(pourquoi-cherryz|service-)/.test(name)) return 1100;
  if (/^(approche-|cas-)/.test(name)) return 800;
  if (/^zone-/.test(name)) return 700;
  if (/^fond-/.test(name)) return 220;                // vignettes 46x46
  return 1200;
};

async function run() {
  fs.mkdirSync(OUT_PHOTOS, { recursive: true });
  fs.mkdirSync(OUT_LOGOS, { recursive: true });

  let srcTotal = 0, outTotal = 0;

  // --- Photos (JPEG) ---
  const photos = fs.readdirSync(path.join(SRC, "photos")).filter((f) => /\.jpe?g$/i.test(f));
  for (const f of photos) {
    const src = path.join(SRC, "photos", f);
    const dst = path.join(OUT_PHOTOS, f);
    srcTotal += fs.statSync(src).size;
    await sharp(src)
      .resize({ width: widthFor(f), withoutEnlargement: true })
      .jpeg({ quality: 76, mozjpeg: true })
      .toFile(dst);
    outTotal += fs.statSync(dst).size;
  }

  // --- Logos (PNG, transparence conservée) ---
  const logos = fs.readdirSync(path.join(SRC, "logos")).filter((f) => /\.png$/i.test(f));
  for (const f of logos) {
    const src = path.join(SRC, "logos", f);
    const dst = path.join(OUT_LOGOS, f);
    srcTotal += fs.statSync(src).size;
    await sharp(src)
      .resize({ height: 320, withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true })
      .toFile(dst);
    outTotal += fs.statSync(dst).size;
  }

  const mb = (n) => (n / 1024 / 1024).toFixed(1) + " Mo";
  console.log(`${photos.length} photos + ${logos.length} logos`);
  console.log(`Source : ${mb(srcTotal)}  →  Optimisé : ${mb(outTotal)}  (${Math.round((1 - outTotal / srcTotal) * 100)}% de gain)`);
}

run().catch((e) => { console.error(e); process.exit(1); });
