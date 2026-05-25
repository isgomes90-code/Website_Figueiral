import { chromium } from "playwright";
import { mkdirSync } from "fs";

mkdirSync(".screens/logo", { recursive: true });
const browser = await chromium.launch();

const sites = [
  ["https://www.figueiral.pt", "live"],
  ["http://localhost:3000/pt", "local"]
];

for (const [url, site] of sites) {
  for (const [w, tag] of [[1440, "desktop"], [390, "mobile"]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    } catch (e) {
      console.log(`[${site}/${tag}] goto warning: ${e.message}`);
    }
    await page.waitForTimeout(1800);
    await page.screenshot({ path: `.screens/logo/${site}-${tag}.png`, clip: { x: 0, y: 0, width: w, height: 200 } });

    const items = await page.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll("img")) {
        const r = el.getBoundingClientRect();
        if (r.width < 8 || r.height < 8 || r.top > 220) continue;
        out.push({
          src: (el.currentSrc || el.src || "").split("/").pop().slice(0, 48),
          renderW: Math.round(r.width), renderH: Math.round(r.height),
          naturalW: el.naturalWidth, naturalH: el.naturalHeight,
          top: Math.round(r.top), left: Math.round(r.left)
        });
      }
      return out.sort((a, b) => a.top - b.top);
    });

    console.log(`\n=== ${site} ${tag} (viewport ${w}px) ===`);
    for (const l of items) {
      const ratio = (l.renderW / l.renderH).toFixed(2);
      console.log(`  render ${l.renderW}x${l.renderH} (ratio ${ratio})  natural ${l.naturalW}x${l.naturalH}  pos(${l.left},${l.top})  ${l.src}`);
    }
    await ctx.close();
  }
}

await browser.close();
console.log("\ndone");
