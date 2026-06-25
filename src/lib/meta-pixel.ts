import { clearMetaCookies } from "@/lib/consent";

/** Meta Pixel — conjunto de dados Figueiral Reviews (Events Manager). */
export const META_PIXEL_ID = "1825830558822025";

const META_SCRIPT_SRC = "https://connect.facebook.net/en_US/fbevents.js";

let metaPixelInitialized = false;
let marketingConsentActive = false;

type FbqFn = (...args: unknown[]) => void;

function callFbq(...args: unknown[]) {
  const fbq = (window as Window & { fbq?: FbqFn }).fbq;
  if (typeof fbq === "function") {
    fbq(...args);
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
