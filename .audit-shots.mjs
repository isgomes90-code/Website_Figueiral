import { chromium } from "playwright";
import { mkdirSync } from "fs";

mkdirSync(".screens/audit", { recursive: true });
const browser = await chromium.launch();

const routes = [
  ["/pt", "home"],
  ["/pt/menu", "menu"],
  ["/pt/wine-experience", "wine"],
  ["/pt/about", "about"],
  ["/pt/gallery", "gallery"],
  ["/pt/reservations", "reservations"],
  ["/pt/contact", "contact"]
];

for (const [w, tag] of [[1440, "desktop"], [390, "mobile"]]) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: 900 },
    reducedMotion: "reduce",
    deviceScaleFactor: 1
  });
  for (const [route, name] of routes) {
    const page = await ctx.newPage();
    await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
    await page.evaluate(() => {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => el.classList.add("reveal-on-scroll--visible"));
    });
    // scroll to bottom to trigger lazy images
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1100);
    const total = await page.evaluate(() => document.body.scrollHeight);
    let idx = 0;
    for (let y = 0; y < total; y += 900) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(350);
      await page.screenshot({ path: `.screens/audit/${name}-${tag}-${idx}.png` });
      idx++;
    }
    await page.close();
  }
  await ctx.close();
}

await browser.close();
console.log("done");
