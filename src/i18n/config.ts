export const locales = ["pt", "en"] as const;
export const defaultLocale = "pt";

export type Locale = (typeof locales)[number];

export function isLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function localizedPath(lang: Locale, path = "") {
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${lang}${normalizedPath}`;
}
