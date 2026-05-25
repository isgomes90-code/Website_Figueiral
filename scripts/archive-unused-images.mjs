import fs from "fs";
import path from "path";

const archiveRoot = path.resolve("..", "figueiral-imagens-arquivo");
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

const moved = [];

function walk(dir, rel = "") {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const nextRel = path.join(rel, entry.name).replace(/\\/g, "/");
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "press") continue;
      walk(full, nextRel);
      continue;
    }
    if (!/\.(webp|jpe?g|png|gif|svg|tmp)$/i.test(entry.name) || /logo|rstfi|\.bak\./i.test(entry.name)) continue;
    const src = `/images/${nextRel}`;
    if (used.has(src)) continue;

    const destDir = path.join(archiveRoot, path.dirname(nextRel));
    fs.mkdirSync(destDir, { recursive: true });
    const dest = path.join(archiveRoot, nextRel);
    fs.renameSync(full, dest);
    moved.push({ rel: nextRel, size: fs.statSync(dest).size });
  }
}

walk("public/images");

const totalBytes = moved.reduce((sum, item) => sum + item.size, 0);
console.log(`Moved ${moved.length} files (${Math.round((totalBytes / 1024 / 1024) * 10) / 10} MB)`);
for (const item of moved.sort((a, b) => b.size - a.size)) {
  console.log(`${Math.round(item.size / 1024)}KB\t${item.rel}`);
}
