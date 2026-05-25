import fs from "fs";
import path from "path";
import sharp from "sharp";

const jobs = [
  { rel: "images/hero/Preparacao-picanha.webp", targetKb: 180, maxWidth: 1800, qualities: [72, 68] },
  { rel: "images/hero/Entrada-restaurante.webp", targetKb: 180, maxWidth: 1280, qualities: [75, 70, 65] },
  { rel: "images/food/Vulcao-chocolate.webp", targetKb: 120, maxWidth: 1400, qualities: [75, 70, 65] },
  { rel: "images/people/Empratamento-3.webp", targetKb: 120, maxWidth: 1400, qualities: [75, 70, 65] }
];

async function replaceInPlace(file, tmp) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      fs.copyFileSync(tmp, file);
      fs.unlinkSync(tmp);
      return;
    } catch (error) {
      if (attempt === 4) throw error;
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }
}

async function compressJob({ rel, targetKb, maxWidth, qualities }) {
  const file = path.join("public", rel);
  if (!fs.existsSync(file)) {
    return { rel, skipped: true, reason: "missing" };
  }

  const before = fs.statSync(file).size;
  let chosen = null;

  for (const quality of qualities) {
    const tmp = `${file}.opt.tmp`;
    await sharp(file)
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(tmp);
    const after = fs.statSync(tmp).size;
    chosen = { quality, after, tmp };
    if (after <= targetKb * 1024) break;
  }

  await replaceInPlace(file, chosen.tmp);
  return {
    rel,
    before,
    after: chosen.after,
    quality: chosen.quality,
    targetKb,
    ok: chosen.after <= targetKb * 1024
  };
}

for (const job of jobs) {
  const result = await compressJob(job);
  if (result.skipped) {
    console.log(`SKIP\t${result.rel}\t${result.reason}`);
    continue;
  }
  console.log(
    `${Math.round(result.before / 1024)}KB -> ${Math.round(result.after / 1024)}KB (q${result.quality}) ${result.ok ? "OK" : "ABOVE TARGET"}\t${result.rel}`
  );
}
