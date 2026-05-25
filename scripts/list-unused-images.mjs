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

const unused = [];

function walk(dir, rel = "") {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const nextRel = path.join(rel, entry.name).replace(/\\/g, "/");
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "press") continue;
      walk(full, nextRel);
      continue;
    }
    if (!/\.(webp|jpe?g|png|gif|svg)$/i.test(entry.name) || /logo|rstfi|\.bak\./i.test(entry.name)) continue;
    const src = `/images/${nextRel}`;
    if (!used.has(src)) {
      unused.push({ rel: nextRel, size: fs.statSync(full).size });
    }
  }
}

walk("public/images");
unused.sort((a, b) => b.size - a.size);

let total = 0;
for (const item of unused) {
  total += item.size;
  console.log(`${Math.round(item.size / 1024)}KB\t${item.rel}`);
}
console.log("---");
console.log(`Total: ${unused.length} files, ${Math.round((total / 1024 / 1024) * 10) / 10} MB`);
