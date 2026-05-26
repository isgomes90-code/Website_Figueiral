import fs from "fs";
import path from "path";

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(tsx|ts|css)$/.test(entry.name)) files.push(full);
  }
  return files;
}

function countPattern(files, regex) {
  const map = new Map();
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(regex)) {
      const key = match[1] ?? match[0];
      map.set(key, (map.get(key) ?? 0) + 1);
    }
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

const files = walk("src");

console.log("=== 1.1 text-[...] (top 40) ===");
countPattern(files, /text-\[([^\]]+)\]/g)
  .slice(0, 40)
  .forEach(([k, v]) => console.log(String(v).padStart(4), k));

console.log("\n=== 1.1 tailwind text-* scale ===");
countPattern(files, /\b(text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl))\b/g).forEach(
  ([k, v]) => console.log(String(v).padStart(4), k)
);

console.log("\n=== 1.1 .type-* classes in globals.css ===");
const css = fs.readFileSync("src/app/globals.css", "utf8");
for (const m of css.matchAll(/\.(type-[\w-]+)\s*\{[^}]*font-size:\s*([^;]+);/g)) {
  console.log(m[1], "→", m[2].trim());
}

console.log("\n=== 1.2 font-* weight (top 20) ===");
countPattern(files, /\b(font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black|display|sans))\b/g)
  .slice(0, 20)
  .forEach(([k, v]) => console.log(String(v).padStart(4), k));

console.log("\n=== 1.3 tracking-* (top 25) ===");
countPattern(
  files,
  /\b(tracking-\[[^\]]+\]|tracking-(?:tighter|tight|normal|wide|wider|widest|[\w/.]+))\b/g
)
  .slice(0, 25)
  .forEach(([k, v]) => console.log(String(v).padStart(4), k));

console.log("\n=== sectionTitle.ts exports ===");
const st = fs.readFileSync("src/lib/sectionTitle.ts", "utf8");
for (const m of st.matchAll(/export const (\w+) = "([^"]+)"/g)) {
  console.log(m[1], "→", m[2].slice(0, 80));
}
