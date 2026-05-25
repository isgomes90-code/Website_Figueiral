import { chromium } from "playwright";
import { mkdirSync } from "fs";

mkdirSync(".screens/logo", { recursive: true });
const browser = await chromium.launch();

for (const [w, tag] of [[1440, "desktop"], [390, "mobile"]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/pt", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  // estado 1: topo, hero escuro -> logo creme
  await page.screenshot({ path: `.screens/logo/new-hero-${tag}.png`, clip: { x: 0, y: 0, width: w, height: 170 } });

  // estado 2: scrolled -> header paper -> logo verde
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(900);
  await page.screenshot({ path: `.screens/logo/new-paper-${tag}.png`, clip: { x: 0, y: 0, width: w, height: 170 } });

  // medir o logo renderizado
  const m = await page.evaluate(() => {
    const img = document.querySelector("header img");
    if (!img) return null;
    const r = img.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height), nat: img.naturalWidth + "x" + img.naturalHeight, src: (img.currentSrc || "").split("/").pop() };
  });
  console.log(`${tag}: render ${m ? m.w + "x" + m.h : "?"}  natural ${m?.nat}  src=${m?.src}`);
  await ctx.close();
}

await browser.close();
console.log("done");
