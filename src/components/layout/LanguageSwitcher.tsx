"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

export function LanguageSwitcher({
  lang,
  ariaLabel,
  variant = "default",
  inverse = false
}: {
  lang: Locale;
  ariaLabel: string;
  variant?: "default" | "header" | "drawer";
  /** Fundo escuro (hero) — texto claro legível sobre imagem. */
  inverse?: boolean;
}) {
  const pathname = usePathname();

  function hrefFor(locale: Locale) {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }

  const inactiveHeader = inverse
    ? "text-cream/[0.78] transition hover:text-cream"
    : "text-charcoal/[0.82] transition hover:text-charcoal";

  const inactive =
    variant === "drawer"
      ? "text-charcoal hover:text-charcoal"
      : variant === "header"
        ? inactiveHeader
        : "text-charcoal/70 transition hover:text-charcoal";

  const separatorHeader = inverse ? "text-cream/40" : "text-walnut/45";

  const separator =
    variant === "drawer" ? "text-walnut/40" : variant === "header" ? separatorHeader : "text-walnut/30";

  function linkClass(locale: Locale) {
    if (locale !== lang) return inactive;
    if (variant === "header" && inverse) return "font-semibold text-cream";
    return "font-semibold text-brandGreen";
  }

  return (
    <div
      aria-label={ariaLabel}
      className={`flex shrink-0 items-center font-medium uppercase ${variant === "header" ? "gap-px text-[15px] leading-none tracking-[0.065em] min-[900px]:text-[15.5px] xl:text-[16px]" : "gap-2 text-[0.65rem] font-semibold tracking-[0.22em]"}`}
    >
      {locales.map((locale, index) => (
        <span key={locale} className={`flex items-center ${variant === "header" ? "gap-0.5" : "gap-2"}`}>
          {index > 0 ? (
            <span className={`shrink-0 px-px text-[0.85em] leading-none ${separator}`} aria-hidden>
              |
            </span>
          ) : null}
          <Link href={hrefFor(locale)} hrefLang={locale === "pt" ? "pt-PT" : "en"} className={linkClass(locale)}>
            {locale}
          </Link>
        </span>
      ))}
    </div>
  );
}
