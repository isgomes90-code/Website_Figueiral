import sharp from "sharp";

const SRC = "public/images/Logo_Figueiral_Header_Website.webp";
const OUT_GREEN = "public/images/Logo_Figueiral_Header.webp";
const OUT_CREAM = "public/images/Logo_Figueiral_Header_cream.webp";

const CREAM = [248, 243, 236]; // #F8F3EC

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width;
const H = info.height;

// Verde representativo do logótipo -> distância ao branco define opacidade total.
const GREEN = [60, 101, 65];
const dist = (r, g, b) => Math.sqrt((255 - r) ** 2 + (255 - g) ** 2 + (255 - b) ** 2);
const D_LOGO = dist(...GREEN);
const D_SOLID = D_LOGO * 0.82; // a partir daqui o pixel é 100% opaco

const green = Buffer.alloc(W * H * 4);
const cream = Buffer.alloc(W * H * 4);

let opaque = 0;
for (let p = 0; p < W * H; p++) {
  const i = p * 4;
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  let a = dist(r, g, b) / D_SOLID;
  if (a > 1) a = 1;
  if (a < 0.04) a = 0;

  if (a === 0) {
    // totalmente transparente
    continue; // buffers já a zero
  }
  if (a >= 0.999) opaque++;

  // Remover halo branco: "unmultiply" contra branco para recuperar a cor real.
  const inv = (1 - a) * 255;
  const nr = Math.max(0, Math.min(255, Math.round((r - inv) / a)));
  const ng = Math.max(0, Math.min(255, Math.round((g - inv) / a)));
  const nb = Math.max(0, Math.min(255, Math.round((b - inv) / a)));
  const alpha = Math.round(a * 255);

  green[i] = nr;
  green[i + 1] = ng;
  green[i + 2] = nb;
  green[i + 3] = alpha;

  // Variante creme: mesma máscara alpha, RGB fixo.
  cream[i] = CREAM[0];
  cream[i + 1] = CREAM[1];
  cream[i + 2] = CREAM[2];
  cream[i + 3] = alpha;
}

async function save(buf, out) {
  const meta = await sharp(buf, { raw: { width: W, height: H, channels: 4 } })
    .trim({ background: "#00000000", threshold: 2 })
    .webp({ quality: 95, alphaQuality: 100, effort: 6 })
    .toFile(out);
  return meta;
}

const mg = await save(green, OUT_GREEN);
const mc = await save(cream, OUT_CREAM);

console.log(`origem: ${W}x${H}`);
console.log(`pixeis 100% opacos: ${((100 * opaque) / (W * H)).toFixed(1)}%`);
console.log(`${OUT_GREEN}: ${mg.width}x${mg.height} (rácio ${(mg.width / mg.height).toFixed(3)}) ${mg.size} bytes`);
console.log(`${OUT_CREAM}: ${mc.width}x${mc.height} (rácio ${(mc.width / mc.height).toFixed(3)}) ${mc.size} bytes`);
