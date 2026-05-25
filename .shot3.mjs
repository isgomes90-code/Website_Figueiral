import { chromium } from "playwright";
import { mkdirSync } from "fs";
mkdirSync(".screens", { recursive: true });
const browser = await chromium.launch();

// 1. Raw logo on split bg to reveal artwork bounds vs canvas
const ctx0 = await browser.newContext({ viewport: { width: 900, height: 640 } });
const p0 = await ctx0.newPage();
await p0.setContent(`<body style="margin:0">
  <div style="display:flex">
    <div style="background:#2a221d;padding:30px"><img src="http://localhost:3000/images/RSTFI_logo_ret.webp" style="width:380px;border:1px solid red;display:block"/></div>
    <div style="background:#f6f1ea;padding:30px"><img src="http://localhost:3000/images/RSTFI_logo_ret.webp" style="width:380px;border:1px solid red;display:block"/></div>
  </div></body>`);
await p0.waitForTimeout(700);
await p0.screenshot({ path: ".screens/logo-raw.png" });
await ctx0.close();

// 2. Header in context — home (over hero) + interior (light bar) + scrolled
for (const [w, tag] of [[1440, "desktop"], [390, "mobile"]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 820 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/pt", { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  await page.screenshot({ path: `.screens/header-home-${tag}.png`, clip: { x: 0, y: 0, width: w, height: 150 } });
  const ip = await ctx.newPage();
  await ip.goto("http://localhost:3000/pt/menu", { waitUntil: "networkidle" });
  await ip.waitForTimeout(600);
  await ip.screenshot({ path: `.screens/header-menu-${tag}.png`, clip: { x: 0, y: 0, width: w, height: 150 } });
  await ctx.close();
}
await browser.close();
console.log("done");
