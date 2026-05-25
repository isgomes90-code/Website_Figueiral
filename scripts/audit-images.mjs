import fs from "fs";
import path from "path";

const used = new Set();

function scanFile(file) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(/\/images\/[^"'`\s)]+/g)) {
    used.add(match[0].split("?")[0]);
  }
}

function scanDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) scanDir(full);
    else if (/\.(tsx?|ts|json|mjs)$/.test(entry.name)) scanFile(full);
  }
}

scanDir("src");

const skipFile = /logo|rstfi|\.bak\.|manifest\.json/i;
const skipDirs = new Set(["press"]);
const all = [];

function walk(dir, rel = "") {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const nextRel = path.join(rel, entry.name).replace(/\\/g, "/");
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (skipDirs.has(entry.name)) continue;
      walk(full, nextRel);
      continue;
    }
    if (!/\.(webp|jpe?g|png)$/i.test(entry.name) || skipFile.test(entry.name)) continue;
    const src = `/images/${nextRel}`;
    const size = fs.statSync(full).size;
    all.push({ src, size, used: used.has(src) });
  }
}

walk("public/images");

all.sort((a, b) => b.size - a.size);

const usedHeavy = all.filter((x) => x.used && x.size > 300_000);
const unusedHeavy = all.filter((x) => !x.used && x.size > 500_000);
const usedTotal = all.filter((x) => x.used).reduce((s, x) => s + x.size, 0);
const unusedTotal = all.filter((x) => !x.used).reduce((s, x) => s + x.size, 0);

console.log("=== USED IMAGES > 300KB ===");
for (const x of usedHeavy) console.log(`${Math.round(x.size / 1024)}KB\t${x.src}`);

console.log("\n=== ALL USED IMAGES (sorted) ===");
for (const x of all.filter((i) => i.used).sort((a, b) => b.size - a.size)) {
  console.log(`${Math.round(x.size / 1024)}KB\t${x.src}`);
}

console.log("\n=== UNUSED IMAGES > 500KB (top 20) ===");
for (const x of unusedHeavy.slice(0, 20)) console.log(`${Math.round(x.size / 1024)}KB\t${x.src}`);

console.log("\n=== SUMMARY ===");
console.log(`Files: ${all.length}`);
console.log(`Used in code: ${all.filter((x) => x.used).length} (${Math.round(usedTotal / 1024 / 1024)} MB)`);
console.log(`Unused on disk: ${all.filter((x) => !x.used).length} (${Math.round(unusedTotal / 1024 / 1024)} MB)`);

console.log("\n=== JPG IN USE (candidates for WebP) ===");
for (const x of all.filter((i) => i.used && /\.jpe?g$/i.test(i.src)).sort((a, b) => b.size - a.size)) {
  console.log(`${Math.round(x.size / 1024)}KB\t${x.src}`);
}
