import "server-only";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import pt from "@/i18n/dictionaries/pt.json";
import en from "@/i18n/dictionaries/en.json";

const dictionaries = { pt, en };

export type Dictionary = typeof pt;

export async function getDictionary(lang: string): Promise<Dictionary> {
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;
  return dictionaries[locale];
}
