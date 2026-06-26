import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

/** Deteta idioma do browser — default EN (público internacional). */
export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") {
    return "en";
  }

  return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

export type BookingSuccessContent = Dictionary["bookingSuccess"];
