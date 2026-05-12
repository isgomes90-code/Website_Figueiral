import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { HeaderNav } from "@/components/layout/HeaderNav";

export function Header({ dictionary, lang }: { dictionary: Dictionary; lang: Locale }) {
  return <HeaderNav dictionary={dictionary} lang={lang} />;
}
