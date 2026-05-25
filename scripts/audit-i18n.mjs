import fs from "fs";

const pt = JSON.parse(fs.readFileSync("src/i18n/dictionaries/pt.json", "utf8"));
const en = JSON.parse(fs.readFileSync("src/i18n/dictionaries/en.json", "utf8"));

function flatten(obj, prefix = "") {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) Object.assign(out, flatten(v, key));
    else out[key] = v;
  }
  return out;
}

const fpt = flatten(pt);
const fen = flatten(en);
const ptKeys = Object.keys(fpt).sort();
const enKeys = Object.keys(fen).sort();

console.log("Dictionary keys PT:", ptKeys.length, "EN:", enKeys.length);
console.log("Missing in EN:", ptKeys.filter((k) => !(k in fen)).length);
console.log("Missing in PT:", enKeys.filter((k) => !(k in fpt)).length);

const identical = ptKeys.filter((k) => k in fen && String(fpt[k]) === String(fen[k]) && typeof fpt[k] === "string");
console.log("\nIdentical string values (", identical.length, "):");
identical.forEach((k) => console.log(" ", k, "=>", JSON.stringify(fpt[k]).slice(0, 60)));

console.log("\nGallery alt count PT:", pt.seo.gallery.length, "EN:", en.seo.gallery.length);
console.log("Gallery images in site.ts:", 10);
