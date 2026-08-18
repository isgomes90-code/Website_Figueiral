import { clearMetaCookies, hasMarketingConsent } from "@/lib/consent";

/** Meta Pixel — conjunto de dados Figueiral Reviews (Events Manager). */
export const META_PIXEL_ID = "1942926293087749";

const META_SCRIPT_SRC = "https://connect.facebook.net/en_US/fbevents.js";
const META_LEAD_SENT_STORAGE_KEY = "figueiral_meta_lead_sent";

let metaPixelInitialized = false;
let marketingConsentActive = false;

type FbqFn = (...args: unknown[]) => void;

function callFbq(...args: unknown[]) {
  const fbq = (window as Window & { fbq?: FbqFn }).fbq;
  if (typeof fbq === "function") {
    fbq(...args);
  }
}

function hasMetaLeadBeenSent(bookingReference: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const raw = window.sessionStorage.getItem(META_LEAD_SENT_STORAGE_KEY);
    if (!raw) {
      return false;
    }

    const sent = JSON.parse(raw) as string[];
    return Array.isArray(sent) && sent.includes(bookingReference);
  } catch {
    return false;
  }
}

function markMetaLeadSent(bookingReference: string) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const raw = window.sessionStorage.getItem(META_LEAD_SENT_STORAGE_KEY);
    const sent = raw ? (JSON.parse(raw) as string[]) : [];
    if (!sent.includes(bookingReference)) {
      sent.push(bookingReference);
      window.sessionStorage.setItem(META_LEAD_SENT_STORAGE_KEY, JSON.stringify(sent));
    }
  } catch {
    window.sessionStorage.setItem(META_LEAD_SENT_STORAGE_KEY, JSON.stringify([bookingReference]));
  }
}

export function isMetaPixelActive() {
  return marketingConsentActive && metaPixelInitialized;
}

/** PageView em navegação client-side (Next.js App Router). */
export function trackMetaPageView() {
  if (!isMetaPixelActive()) {
    return;
  }

  callFbq("track", "PageView");
}

/** Lead — reserva concluída (página /booking-successful). Só com consentimento Marketing. */
export function trackMetaLead(bookingReference: string): boolean {
  if (!hasMarketingConsent()) {
    return false;
  }

  const reference = bookingReference.trim();
  if (!reference) {
    return false;
  }

  if (hasMetaLeadBeenSent(reference)) {
    return false;
  }

  if (!isMetaPixelActive()) {
    initMetaPixel();
  }

  callFbq("track", "Lead", { value: 230.0, currency: "EUR" }, { eventID: reference });
  markMetaLeadSent(reference);
  return true;
}

/** Carrega fbevents.js, init único e PageView inicial. */
export function initMetaPixel() {
  if (typeof window === "undefined") {
    return;
  }

  marketingConsentActive = true;

  if (metaPixelInitialized) {
    return;
  }

  const frame = window as Window & { fbq?: FbqFn; _fbq?: FbqFn };

  if (typeof frame.fbq === "function") {
    callFbq("init", META_PIXEL_ID);
    callFbq("track", "PageView");
    metaPixelInitialized = true;
    return;
  }

  frame.fbq = function fbq(...args: unknown[]) {
    const current = frame.fbq as FbqFn & { queue?: unknown[]; callMethod?: FbqFn };
    if (current.callMethod) {
      current.callMethod(...args);
      return;
    }
    current.queue = current.queue || [];
    current.queue.push(args);
  };

  frame._fbq = frame.fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = META_SCRIPT_SRC;
  document.head.appendChild(script);

  callFbq("init", META_PIXEL_ID);
  callFbq("track", "PageView");
  metaPixelInitialized = true;
}

/** Revoga marketing — bloqueia eventos futuros e limpa cookies Meta. */
export function revokeMetaPixel() {
  marketingConsentActive = false;
  metaPixelInitialized = false;
  clearMetaCookies();

  if (typeof window !== "undefined") {
    const frame = window as Window & { fbq?: FbqFn; _fbq?: FbqFn };
    delete frame.fbq;
    delete frame._fbq;
  }
}
