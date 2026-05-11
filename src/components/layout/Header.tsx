import Link from "next/link";
import { navItems } from "@/lib/site";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export function Header({ dictionary, lang }: { dictionary: Dictionary; lang: Locale }) {
  const navigation = dictionary.navigation;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-3 mt-3 rounded-full border border-walnut/15 bg-[rgba(243,238,231,0.82)] shadow-[0_18px_60px_rgba(92,68,48,0.12)] backdrop-blur-2xl sm:mx-5 lg:mx-8">
        <div className="section-shell flex h-[4.6rem] items-center justify-between px-5 sm:px-7 lg:px-9">
          <Link href={localizedPath(lang)} className="group">
            <span className="block font-display text-[1.7rem] leading-none text-charcoal transition group-hover:text-gold">
              Figueiral
            </span>
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.38em] text-gold/85">
              {navigation.brandLine}
            </span>
          </Link>
          <nav aria-label={navigation.ariaMain} className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localizedPath(lang, item.href)}
                className="relative text-[0.78rem] uppercase tracking-[0.2em] text-charcoal/70 transition duration-300 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:text-charcoal hover:after:w-full"
              >
                {navigation[item.labelKey]}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-5 lg:flex">
            <LanguageSwitcher lang={lang} ariaLabel={navigation.language} />
            <LuxuryButton href={localizedPath(lang, "/reservations")} className="min-h-11 px-6">
              {navigation.reserve}
            </LuxuryButton>
          </div>
          <Link
            href={localizedPath(lang, "/reservations")}
            className="rounded-full border border-gold/45 bg-gold/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold lg:hidden"
          >
            {navigation.reserve}
          </Link>
        </div>
      </div>
      <nav
        aria-label={navigation.ariaMobile}
        className="section-shell mt-3 flex gap-5 overflow-x-auto px-5 pb-3 text-[0.66rem] uppercase tracking-[0.24em] text-charcoal/65 lg:hidden"
      >
        {navItems.map((item) => (
          <Link key={item.href} href={localizedPath(lang, item.href)} className="shrink-0 transition hover:text-gold">
            {navigation[item.labelKey]}
          </Link>
        ))}
        <LanguageSwitcher lang={lang} ariaLabel={navigation.language} />
      </nav>
    </header>
  );
}
