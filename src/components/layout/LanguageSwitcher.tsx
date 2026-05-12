"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ lang, ariaLabel }: { lang: Locale; ariaLabel: string }) {
  const pathname = usePathname();

  function hrefFor(locale: Locale) {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }

  return (
    <div aria-label={ariaLabel} className="flex shrink-0 items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em]">
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-2">
          {index > 0 ? <span className="text-walnut/30">|</span> : null}
          <Link
            href={hrefFor(locale)}
            hrefLang={locale === "pt" ? "pt-PT" : "en"}
            className={locale === lang ? "text-gold" : "text-charcoal/55 transition hover:text-charcoal"}
          >
            {locale}
          </Link>
        </span>
      ))}
    </div>
  );
}
