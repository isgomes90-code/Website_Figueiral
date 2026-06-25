/**
 * Testes automatizados da camada de consentimento.
 * Executar com: node scripts/test-consent.mjs
 * Requer: npm run start:3007 (ou TEST_BASE_URL)
 */
import { chromium } from "playwright";

const BASE = process.env.TEST_BASE_URL ?? "http://localhost:3007/pt";
const STORAGE_KEY = "figueiral_cookie_consent";

function readConsentEntry(entries, phase) {
  return entries.find((entry) => entry && entry[0] === "consent" && entry[1] === phase);
}

async function clearConsent(page) {
  await page.addInitScript((key) => {
    if (sessionStorage.getItem("__figueiralConsentTestInit")) {
      return;
    }
    sessionStorage.setItem("__figueiralConsentTestInit", "1");
    localStorage.removeItem(key);
  }, STORAGE_KEY);
}

async function waitForNetwork(page, ms = 1500) {
  await page.waitForTimeout(ms);
}

async function waitForBanner(page) {
  await page.locator("#cookie-banner-title").waitFor({ state: "visible", timeout: 10000 });
}

async function getRequests(page) {
  return page.evaluate(() => ({
    metaScript: performance.getEntriesByType("resource").some((entry) =>
      entry.name.includes("connect.facebook.net")
    ),
    metaTr: performance.getEntriesByType("resource").some((entry) =>
      entry.name.includes("facebook.com/tr")
    ),
    gtag: performance.getEntriesByType("resource").some((entry) =>
      entry.name.includes("googletagmanager.com/gtag")
    )
  }));
}

async function getConsentMode(page) {
  return page.evaluate(() => {
    const entries = window.dataLayer ?? [];
    const defaults = readConsentEntry(entries, "default");
    const updates = entries.filter((entry) => readConsentEntry([entry], "update") || (entry && entry[0] === "consent" && entry[1] === "update"));
    const lastUpdate = updates.at(-1)?.[2] ?? null;
    return { defaults: defaults?.[2] ?? null, lastUpdate };
  });
}

async function clickBannerButton(page, label) {
  await page.getByRole("button", { name: label, exact: true }).click();
}

async function runScenario(name, fn) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await fn(page);
    console.log(`PASS  ${name}`);
    return true;
  } catch (error) {
    console.error(`FAIL  ${name}`);
    console.error(error instanceof Error ? error.message : error);
    return false;
  } finally {
    await browser.close();
  }
}

const results = [];

results.push(
  await runScenario("A — primeira visita sem decisão", async (page) => {
    await clearConsent(page);
    await page.goto(BASE, { waitUntil: "networkidle" });
    await waitForNetwork(page);

    const bannerVisible = await page.locator("#cookie-banner-title").isVisible();
    const requests = await getRequests(page);
    const consentMode = await page.evaluate(() => {
      const entries = window.dataLayer ?? [];
      const defaults = entries.find((entry) => entry && entry[0] === "consent" && entry[1] === "default");
      return defaults?.[2] ?? null;
    });

    if (!bannerVisible) throw new Error("Banner não visível");
    if (requests.metaScript || requests.metaTr) throw new Error("Pedidos Meta detectados");
    if (!requests.gtag) throw new Error("gtag.js não carregou");
    if (consentMode?.ad_storage !== "denied") throw new Error("Consent default ad_storage != denied");
    if (consentMode?.analytics_storage !== "denied") {
      throw new Error("Consent default analytics_storage != denied");
    }
  })
);

results.push(
  await runScenario("B — rejeitar não essenciais", async (page) => {
    await clearConsent(page);
    await page.goto(BASE, { waitUntil: "networkidle" });
    await waitForBanner(page);
    await clickBannerButton(page, "Rejeitar não essenciais");
    await waitForNetwork(page);

    const requests = await getRequests(page);
    const stored = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);

    if (requests.metaScript || requests.metaTr) throw new Error("Pedidos Meta após rejeição");
    if (!stored) throw new Error("Preferências não persistidas");

    await page.reload({ waitUntil: "networkidle" });
    await waitForNetwork(page);
    const bannerVisible = await page.locator("#cookie-banner-title").isVisible();
    if (bannerVisible) throw new Error("Banner reapareceu após reload");
  })
);

results.push(
  await runScenario("C — aceitar apenas Analítica", async (page) => {
    await clearConsent(page);
    await page.goto(BASE, { waitUntil: "networkidle" });
    await waitForBanner(page);
    await clickBannerButton(page, "Gerir preferências");
    await page.locator("#consent-analytics").check();
    await page.locator("#consent-marketing").uncheck();
    await clickBannerButton(page, "Guardar preferências");
    await waitForNetwork(page);

    const requests = await getRequests(page);
    const consentMode = await page.evaluate(() => {
      const entries = window.dataLayer ?? [];
      const updates = entries.filter((entry) => entry && entry[0] === "consent" && entry[1] === "update");
      return updates.at(-1)?.[2] ?? null;
    });

    if (requests.metaScript || requests.metaTr) throw new Error("Meta bloqueado deveria estar inactivo");
    if (consentMode?.analytics_storage !== "granted") {
      throw new Error("analytics_storage não granted");
    }
    if (consentMode?.ad_storage !== "denied") {
      throw new Error("ad_storage deveria permanecer denied");
    }
  })
);

results.push(
  await runScenario("D — aceitar Marketing", async (page) => {
    await clearConsent(page);
    await page.goto(BASE, { waitUntil: "networkidle" });
    await waitForBanner(page);
    await clickBannerButton(page, "Aceitar todos");
    await waitForNetwork(page, 2500);

    const requests = await getRequests(page);
    const consentMode = await page.evaluate(() => {
      const entries = window.dataLayer ?? [];
      const updates = entries.filter((entry) => entry && entry[0] === "consent" && entry[1] === "update");
      return updates.at(-1)?.[2] ?? null;
    });

    if (!requests.metaScript) throw new Error("fbevents.js não carregou");
    if (consentMode?.ad_storage !== "granted") {
      throw new Error("ad_storage não granted");
    }

    await page.goto(`${BASE}/menu`, { waitUntil: "networkidle" });
    await waitForNetwork(page, 1500);
  })
);

results.push(
  await runScenario("E — alterar preferências no rodapé", async (page) => {
    await clearConsent(page);
    await page.goto(BASE, { waitUntil: "networkidle" });
    await waitForBanner(page);
    await clickBannerButton(page, "Aceitar todos");
    await waitForNetwork(page, 2500);

    await page.getByRole("button", { name: "Gerir cookies" }).click();
    await page.locator("#consent-marketing").uncheck();
    await clickBannerButton(page, "Guardar preferências");
    await waitForNetwork(page);

    const fbqAfterRevoke = await page.evaluate(() => typeof window.fbq);
    if (fbqAfterRevoke !== "undefined") throw new Error("fbq ainda presente após revogação");

    await page.getByRole("button", { name: "Gerir cookies" }).click();
    await page.locator("#consent-marketing").check();
    await clickBannerButton(page, "Guardar preferências");
    await waitForNetwork(page, 2500);

    const fbqActive = await page.evaluate(() => typeof window.fbq === "function");
    if (!fbqActive) throw new Error("Meta não reinicializou após novo consentimento");
  })
);

const passed = results.filter(Boolean).length;
console.log(`\n${passed}/${results.length} cenários passaram`);
process.exit(passed === results.length ? 0 : 1);
