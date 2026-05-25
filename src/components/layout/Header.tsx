import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { HeaderNav } from "@/components/layout/HeaderNav";

export function Header({
  navigation,
  logoAlt,
  lang
}: {
  navigation: Dictionary["navigation"];
  logoAlt: string;
  lang: Locale;
}) {
  return <HeaderNav navigation={navigation} logoAlt={logoAlt} lang={lang} />;
}
