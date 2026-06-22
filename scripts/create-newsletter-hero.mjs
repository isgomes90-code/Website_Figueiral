import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const inputPath = path.join(
  rootDir,
  "public/images/newsletter/verao-2026/hero-brasa.jpg"
);
const outputPath = path.join(
  rootDir,
  "public/images/newsletter/verao-2026/hero-brasa-email.jpg"
);

const JPEG_QUALITY = 88;
const SUBTLE_DARKEN = 0.93;

function buildFadeSvg(width, height) {
  return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0" />
      <stop offset="45%" stop-color="#000000" stop-opacity="0.05" />
      <stop offset="65%" stop-color="#000000" stop-opacity="0.25" />
      <stop offset="82%" stop-color="#000000" stop-opacity="0.65" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.95" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#fade)" />
</svg>`);
}

async function main() {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input image not found: ${inputPath}`);
  }

  const inputMeta = await sharp(inputPath).metadata();
  const { width, height } = inputMeta;

  if (!width || !height) {
    throw new Error("Could not read image dimensions.");
  }

  const fadeOverlay = buildFadeSvg(width, height);

  await sharp(inputPath)
    .rotate()
    .modulate({ brightness: SUBTLE_DARKEN })
    .composite([{ input: fadeOverlay, blend: "over" }])
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(outputPath);

  const outputMeta = await sharp(outputPath).metadata();
  const outputSize = fs.statSync(outputPath).size;

  console.log("Newsletter hero image created successfully.");
  console.log(`Input:  ${inputPath}`);
  console.log(`Output: ${outputPath}`);
  console.log(`Original dimensions: ${width} x ${height}px`);
  console.log(
    `Final dimensions:    ${outputMeta.width} x ${outputMeta.height}px`
  );
  console.log(`Final file size:     ${(outputSize / 1024).toFixed(1)} KB`);
  console.log(`JPEG quality:        ${JPEG_QUALITY}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
