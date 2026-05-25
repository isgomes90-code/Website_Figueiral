import fs from "fs";

const src = fs.readFileSync("src/data/press.ts", "utf8");

// Find pt: "..." without matching en: on same object level is hard; check excerpt/title blocks
const blocks = [
  "title",
  "excerpt",
  "summary",
  "context",
  "description",
  "imageAlt"
];

for (const field of blocks) {
  const re = new RegExp(`${field}:\\s*\\{\\s*pt:\\s*"([^"]*)"`, "g");
  let m;
  while ((m = re.exec(src))) {
    const start = m.index;
    const slice = src.slice(start, start + 400);
    const enMatch = slice.match(/en:\s*"([^"]*)"/);
    if (!enMatch) {
      console.log(`MISSING en for ${field}:`, m[1].slice(0, 60));
    } else if (enMatch[1] === m[1]) {
      console.log(`IDENTICAL ${field}:`, m[1].slice(0, 60));
    }
  }
}

const pullPt = (src.match(/pullQuotes:\s*\{\s*pt:\s*\[/g) || []).length;
const pullEn = (src.match(/pullQuotes:\s*\{\s*pt:[\s\S]*?en:\s*\[/g) || []).length;
console.log("\nArticles with pullQuotes pt blocks:", pullPt);
console.log("Articles with pullQuotes en blocks:", pullEn);

const slugCount = (src.match(/slug:\s*"/g) || []).length;
console.log("Total press articles:", slugCount);
