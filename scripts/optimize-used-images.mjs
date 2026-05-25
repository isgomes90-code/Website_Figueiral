import fs from "fs";
import path from "path";
import sharp from "sharp";

const targets = [
  { rel: "images/people/mesa-convivio.webp", maxWidth: 1800 },
  { rel: "images/terrace/Esplanada-1.webp", maxWidth: 1800 },
  { rel: "images/terrace/Esplanada-3.webp", maxWidth: 1800 },
  { rel: "images/hero/Entrada-restaurante.webp", maxWidth: 1800 },
  { rel: "images/food/Camarao-grelhado-Entrada.webp", maxWidth: 1400 },
  { rel: "images/food/Camarao-alho-fogo.webp", maxWidth: 1600 },
  { rel: "images/food/Picanha-grelha-1.webp", maxWidth: 1600 },
  { rel: "images/food/Picanha-grelha-4.webp", maxWidth: 1600 },
  { rel: "images/food/cogumelos-com-alho-entrada-2.webp", maxWidth: 1600 },
  { rel: "images/wine/Vinho-garrafeira.webp", maxWidth: 1400 },
  { rel: "images/people/Empratamento-2.webp", maxWidth: 1400 },
  { rel: "images/people/Convicio-clientes-3.webp", maxWidth: 1400 },
  { rel: "images/people/Rececao-clientes.webp", maxWidth: 1400 },
  { rel: "images/food/Chateaubriand.webp", maxWidth: 1200 },
  { rel: "images/food/Picanha-fundo-branco.webp", maxWidth: 1400 },
  { rel: "images/food/Profiteroles-chocolate.webp", maxWidth: 1200 },
  { rel: "images/food/Tarte-maca.webp", maxWidth: 1200 }
];

const jpgToWebp = [
  "images/hero/Camarao-grelha.jpg",
  "images/food/Picanha-acompanhamentos.jpg",
  "images/people/Convicio-clientes-2.jpg",
  "images/food/Picanha-grelha-2.jpg",
  "images/people/Eraldo.webp"
];

async function optimizeWebp(rel, maxWidth) {
  const file = path.join("public", rel);
  if (!fs.existsSync(file)) return null;
  const before = fs.statSync(file).size;
  const tmp = `${file}.opt.tmp`;
  await sharp(file)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 76 })
    .toFile(tmp);
  fs.unlinkSync(file);
  fs.renameSync(tmp, file);
  const after = fs.statSync(file).size;
  return { rel, before, after };
}

async function convertToWebp(rel) {
  const file = path.join("public", rel);
  if (!fs.existsSync(file)) return null;
  const outRel = rel.replace(/\.jpe?g$/i, ".webp");
  const out = path.join("public", outRel);
  const before = fs.statSync(file).size;
  await sharp(file)
    .rotate()
    .resize({ width: 1800, withoutEnlargement: true })
    .webp({ quality: 76 })
    .toFile(out);
  const after = fs.statSync(out).size;
  return { rel: outRel, before, after, from: rel };
}

const results = [];

for (const t of targets) {
  try {
    const r = await optimizeWebp(t.rel, t.maxWidth);
    if (r) results.push(r);
  } catch (e) {
    console.error("fail", t.rel, e.message);
  }
}

for (const rel of jpgToWebp) {
  try {
    const r = await convertToWebp(rel);
    if (r) results.push(r);
  } catch (e) {
    console.error("fail", rel, e.message);
  }
}

for (const r of results) {
  console.log(
    `${Math.round(r.before / 1024)}KB -> ${Math.round(r.after / 1024)}KB\t${"from" in r ? `${r.from} => ${r.rel}` : r.rel}`
  );
}
