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
      <div className="mx-4 mt-4 rounded-full border border-walnut/10 bg-[rgba(246,241,234,0.86)] shadow-[0_16px_48px_rgba(92,68,48,0.1)] backdrop-blur-2xl sm:mx-6 lg:mx-10">
        <div className="mx-auto grid h-[4.75rem] w-full max-w-[88rem] grid-cols-[minmax(9.5rem,1fr)_auto] items-center gap-5 px-6 sm:px-8 xl:grid-cols-[minmax(11rem,15rem)_minmax(0,1fr)_auto] xl:gap-8 xl:px-10">
          <Link href={localizedPath(lang)} className="group min-w-0 justify-self-start">
            <span className="block font-display text-[1.7rem] leading-none text-charcoal transition group-hover:text-gold">
              Figueiral
            </span>
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.38em] text-gold/85">
              {navigation.brandLine}
            </span>
          </Link>
          <nav aria-label={navigation.ariaMain} className="hidden min-w-0 items-center justify-center gap-5 xl:flex 2xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localizedPath(lang, item.href)}
                className="relative shrink-0 whitespace-nowrap text-[0.7rem] uppercase tracking-[0.22em] text-charcoal/68 transition duration-300 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-gold/80 after:transition-all after:duration-300 hover:text-charcoal hover:after:w-full 2xl:text-[0.76rem] 2xl:tracking-[0.24em]"
              >
                {navigation[item.labelKey]}
              </Link>
            ))}
          </nav>
          <div className="hidden shrink-0 items-center justify-end gap-5 xl:flex">
            <div className="border-l border-walnut/10 pl-5">
              <LanguageSwitcher lang={lang} ariaLabel={navigation.language} />
            </div>
            <LuxuryButton href={localizedPath(lang, "/reservations")} className="min-h-11 min-w-[8.25rem] px-6">
              {navigation.reserve}
            </LuxuryButton>
          </div>
          <Link
            href={localizedPath(lang, "/reservations")}
            className="justify-self-end rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold xl:hidden"
          >
            {navigation.reserve}
          </Link>
        </div>
      </div>
      <nav
        aria-label={navigation.ariaMobile}
        className="section-shell mt-3 flex gap-5 overflow-x-auto px-5 pb-3 text-[0.66rem] uppercase tracking-[0.24em] text-charcoal/65 xl:hidden"
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
