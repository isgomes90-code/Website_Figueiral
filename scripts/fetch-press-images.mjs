/**
 * Fetches og:image from press article URLs, crops to 16:10, converts to WebP.
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const OUT_DIR = path.join(process.cwd(), "public", "images", "press");

const ARTICLES = [
  {
    slug: "anoticia-melhor-picanha-almancil",
    file: "anoticia-picanha.webp",
    url: "https://anoticia.pt/2024/10/09/em-almancil-e-possivel-degustar-aquela-que-e-considerada-a-melhor-picanha-do-algarve/"
  },
  {
    slug: "magg-melhor-picanha-algarve",
    file: "magg-picanha.webp",
    url: "https://magg.sapo.pt/viagens/travelmagg/artigos/a-melhor-picanha-do-algarve"
  },
  {
    slug: "revista-bica-melhor-picanha-algarve",
    file: "bica-picanha.webp",
    url: "https://revistabica.com/restaurante-figueiral-convida-a-degustar-a-melhor-picanha-do-algarve/"
  },
  {
    slug: "observador-picanha-fim-semana",
    file: "observador-trufa.webp",
    url: "https://observador.pt/2023/11/03/picanha-trufa-branca-e-uma-amizade-cantada-em-palco-12-coisas-para-fazer-no-fim-de-semana/"
  },
  {
    slug: "lux-figueiral-tradicao-almancil",
    file: "lux-almancil.webp",
    url: "https://www.lux.iol.pt/lifestyle/09-10-2023/figueiral-o-restaurante-com-maior-tradicao-em-almancil"
  },
  {
    slug: "luxury-editor-must-visit",
    file: "luxury-editor-review.webp",
    url: "https://theluxuryeditor.com/review/figueiral-restaurant-the-must-visit-family-owned-gastronomic-destination-near-quinta-do-lago-portugal/"
  },
  {
    slug: "portugal-news-key-to-success",
    file: "portugal-news-success.webp",
    url: "https://www.theportugalnews.com/news/2022-10-14/the-key-to-success-figueiral-restaurant/71167"
  },
  {
    slug: "portugal-news-figueiral-experience",
    file: "portugal-news-experience.webp",
    url: "https://www.theportugalnews.com/news/2022-10-28/a-figueiral-experience/71541"
  },
  {
    slug: "business-traveller-restaurant-guide",
    file: "business-traveller.webp",
    url: "https://www.businesstraveller.com/sponsored/restaurant-guide-dine-in-style/"
  },
  {
    slug: "visit-algarve-figueiral",
    file: "visit-algarve.webp",
    url: "https://visitalgarve.pt/equipamento/9222/restaurante-figueiral"
  },
  {
    slug: "viagensa4-figueiral",
    file: "viagensa4.webp",
    url: "https://viagensa4.com/restaurante-figueiral/"
  },
  {
    slug: "evoque-tradition-modernity",
    file: "evoque-modernity.webp",
    url: "https://evoquemagazine.pt/figueiral-tradition-and-modernity/"
  },
  {
    slug: "evoque-passion-30-years",
    file: "evoque-passion.webp",
    url: "https://evoquemagazine.pt/figueiral-a-passion-with-more-than-30-years/"
  }
];

const TARGET_WIDTH = 1200;
const TARGET_HEIGHT = 750;

function extractImageUrl(html, pageUrl) {
  const patterns = [
    /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::secure_url)?["']/i,
    /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return resolveUrl(match[1], pageUrl);
  }

  const articleImg =
    html.match(/<article[\s\S]*?<img[^>]+src=["']([^"']+)["']/i)?.[1] ??
    html.match(/<img[^>]+class=["'][^"']*(?:featured|hero|wp-post-image)[^"']*["'][^>]+src=["']([^"']+)["']/i)?.[1] ??
    html.match(/<img[^>]+src=["']([^"']+)["'][^>]+class=["'][^"']*(?:featured|hero|wp-post-image)/i)?.[1];

  return articleImg ? resolveUrl(articleImg, pageUrl) : null;
}

function resolveUrl(src, base) {
  try {
    return new URL(src.replace(/&amp;/g, "&"), base).toString();
  } catch {
    return src;
  }
}

function isUsableImage(url) {
  const lower = url.toLowerCase();
  if (lower.endsWith(".svg") || lower.includes("logo") || lower.includes("icon")) return false;
  if (lower.includes("avatar") || lower.includes("gravatar")) return false;
  return true;
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml"
    },
    redirect: "follow"
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function downloadImage(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept: "image/*,*/*"
    },
    redirect: "follow"
  });
  if (!res.ok) throw new Error(`Image HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function processArticle(article) {
  const outPath = path.join(OUT_DIR, article.file);
  console.log(`\n→ ${article.slug}`);

  const html = await fetchHtml(article.url);
  const imageUrl = extractImageUrl(html, article.url);

  if (!imageUrl || !isUsableImage(imageUrl)) {
    throw new Error(`No usable image found for ${article.slug}`);
  }

  console.log(`  source: ${imageUrl}`);
  const buffer = await downloadImage(imageUrl);

  await sharp(buffer)
    .rotate()
    .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: "cover", position: "centre" })
    .webp({ quality: 82, effort: 4 })
    .toFile(outPath);

  const stats = fs.statSync(outPath);
  console.log(`  saved: ${outPath} (${Math.round(stats.size / 1024)} KB)`);

  return { slug: article.slug, file: article.file, imageUrl };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const results = [];
  const failures = [];

  for (const article of ARTICLES) {
    try {
      results.push(await processArticle(article));
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      failures.push({ slug: article.slug, error: message });
      console.error(`  ✗ ${message}`);
    }
  }

  fs.writeFileSync(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), results, failures }, null, 2)
  );

  console.log(`\nDone: ${results.length} ok, ${failures.length} failed`);
  if (failures.length) process.exitCode = 1;
}

main();
