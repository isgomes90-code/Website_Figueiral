/** Meta Pixel — conjunto de dados Figueiral Reviews (Events Manager). */
export const META_PIXEL_ID = "1825830558822025";

/** PageView em navegação client-side (Next.js App Router). */
export function trackMetaPageView() {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  window.fbq("track", "PageView");
}
