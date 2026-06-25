/** Google Ads — etiqueta base e conversões (sem Google Analytics). */
export const GOOGLE_ADS_ID = "AW-624854441";

export const GOOGLE_ADS_RESERVATION_CONVERSION =
  "AW-624854441/ltOcCKv_s8UcEKmL-qkC";

/** Dispara evento gtag apenas no cliente, quando a biblioteca já carregou. */
export function gtagEvent(...args: unknown[]) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag(...args);
}

/** Conversão: chegada à página de reservas (/pt|/en/reservations). */
export function trackReservationPageConversion() {
  gtagEvent("event", "conversion", {
    send_to: GOOGLE_ADS_RESERVATION_CONVERSION
  });
}

/** Funil: clique no botão RESERVAR do header (não é conversão). */
export function trackReserveMenuClick() {
  gtagEvent("event", "click_reservar_menu");
}
