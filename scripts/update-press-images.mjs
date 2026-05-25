import fs from "fs";

const file = "src/data/press.ts";
let content = fs.readFileSync(file, "utf8");

const imageMap = {
  "luxury-editor-must-visit": "/images/press/luxury-editor-review.webp",
  "magg-melhor-picanha-algarve": "/images/press/magg-picanha.webp",
  "revista-bica-melhor-picanha-algarve": "/images/press/bica-picanha.webp",
  "anoticia-melhor-picanha-almancil": "/images/press/anoticia-picanha.webp",
  "observador-picanha-fim-semana": "/images/press/observador-trufa.webp",
  "lux-figueiral-tradicao-almancil": "/images/press/lux-almancil.webp",
  "portugal-news-key-to-success": "/images/press/portugal-news-success.webp",
  "portugal-news-figueiral-experience": "/images/press/portugal-news-experience.webp",
  "business-traveller-restaurant-guide": "/images/press/business-traveller.webp",
  "visit-algarve-figueiral": "/images/press/visit-algarve.webp",
  "viagensa4-figueiral": "/images/press/viagensa4.webp",
  "evoque-tradition-modernity": "/images/press/evoque-modernity.webp",
  "evoque-passion-30-years": "/images/press/evoque-passion.webp"
};

for (const [slug, imagePath] of Object.entries(imageMap)) {
  const blockRegex = new RegExp(
    `(id: "${slug}"[\\s\\S]*?)(image: ")([^"]+)(")`,
    "m"
  );
  content = content.replace(blockRegex, `$1$2${imagePath}$4`);
}

fs.writeFileSync(file, content);
console.log("Updated image paths in press.ts");
