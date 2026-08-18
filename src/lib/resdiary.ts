import type { Locale } from "@/i18n/config";

/** Culturas BCP-47 suportadas pelo widget ResDiary (confirmado empiricamente na URL). */
const RESDIARY_CULTURE: Record<Locale, string> = {
  pt: "pt-PT",
  en: "en-GB"
};

const RESDIARY_WIDGET_BASE =
  "https://booking.resdiary.com/widget/Standard/RestauranteFigueiral";

/** Widget ID predefinido — canal Website. */
export const RESDIARY_DEFAULT_WIDGET_ID = "13421";

/** Allowlist: parâmetro channel → Widget ID ResDiary. */
const RESDIARY_CHANNEL_WIDGET: Readonly<Record<string, string>> = {
  meta_paid: "33287"
};

export function getResDiaryCulture(locale: Locale) {
  return RESDIARY_CULTURE[locale];
}

/** Resolve Widget ID a partir de channel allowlisted; default 13421 (Website). */
export function resolveResDiaryWidgetId(channel: string | null | undefined): string {
  if (!channel) {
    return RESDIARY_DEFAULT_WIDGET_ID;
  }

  const normalized = channel.trim();
  if (!normalized) {
    return RESDIARY_DEFAULT_WIDGET_ID;
  }

  return RESDIARY_CHANNEL_WIDGET[normalized] ?? RESDIARY_DEFAULT_WIDGET_ID;
}

/** URL do #rdwidgeturl — standard embed com cultura dinâmica e canal allowlisted. */
export function getResDiaryWidgetEmbedUrl(locale: Locale, channel?: string | null) {
  const culture = getResDiaryCulture(locale);
  const widgetId = resolveResDiaryWidgetId(channel);
  const params = new URLSearchParams({
    includeJquery: "false",
    culture
  });

  return `${RESDIARY_WIDGET_BASE}/${widgetId}?${params.toString()}`;
}
