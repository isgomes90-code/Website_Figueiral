import type { Locale } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

/** Culturas BCP-47 suportadas pelo widget ResDiary (confirmado empiricamente na URL). */
const RESDIARY_CULTURE: Record<Locale, string> = {
  pt: "pt-PT",
  en: "en-GB"
};

export function getResDiaryCulture(locale: Locale) {
  return RESDIARY_CULTURE[locale];
}

/** URL do #rdwidgeturl — standard embed com cultura dinâmica. */
export function getResDiaryWidgetEmbedUrl(locale: Locale) {
  const culture = getResDiaryCulture(locale);
  const params = new URLSearchParams({
    includeJquery: "false",
    culture
  });

  return `${siteConfig.booking.widgetUrl}?${params.toString()}`;
}
