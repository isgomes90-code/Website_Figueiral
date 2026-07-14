import { hasAnalyticsConsent, hasMarketingConsent } from "@/lib/consent";

/** Google Ads — etiqueta base e conversões. */
export const GOOGLE_ADS_ID = "AW-18309325247";

/** Google Analytics 4 — definir em NEXT_PUBLIC_GA4_ID (Vercel / .env.local). */
export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GA4_ID?.trim() ?? "";

/** Conversão real: reserva concluída (página /booking-successful). */
export const GOOGLE_ADS_BOOKING_COMPLETED_CONVERSION =
  "AW-18309325247/BV6XCNjqzNAcEL_DyJpE";

/** ID principal para carregar gtag.js (GA4 se configurado, senão Google Ads). */
export function getGoogleTagLoaderId() {
  return GOOGLE_ANALYTICS_ID || GOOGLE_ADS_ID;
}

/** Dispara evento gtag apenas no cliente, quando a biblioteca já carregou. */
export function gtagEvent(...args: unknown[]) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag(...args);
}

/** Conversão: chegada à página de reservas (/pt|/en/reservations). */
export function trackReservationPageConversion() {
  if (!hasMarketingConsent()) {
    return;
  }
}

/** Conversão real: reserva concluída via ResDiary (página de sucesso). */
export function trackBookingCompletedConversion(bookingReference: string) {
  if (!hasMarketingConsent()) {
    return;
  }

  const reference = bookingReference.trim();
  if (!reference) {
    return;
  }

  gtagEvent("event", "conversion", {
    send_to: GOOGLE_ADS_BOOKING_COMPLETED_CONVERSION,
    value: 230.0,
    currency: "EUR",
    transaction_id: reference
  });
}

/** Funil: clique no botão RESERVAR do header (não é conversão). */
export function trackReserveMenuClick() {
  if (!hasMarketingConsent()) {
    return;
  }

  gtagEvent("event", "click_reservar_menu");
}

/** Evento analítico genérico — apenas com consentimento Analítica. */
export function trackAnalyticsEvent(eventName: string, params?: Record<string, unknown>) {
  if (!hasAnalyticsConsent()) {
    return;
  }

  gtagEvent("event", eventName, params);
}
