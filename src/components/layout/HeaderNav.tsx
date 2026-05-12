"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { navItems, figueiralLogoSrc } from "@/lib/site";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

/** Navegação horizontal a partir do breakpoint `lg` (1024px) — típicos portáteis já vêem todas as páginas. */
const NAV = "lg";

function MenuGlyph({ open }: { open: boolean }) {
  return open ? (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden className="text-charcoal">
      <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden className="text-charcoal">
      <path d="M4 6H18M4 11H18M4 16H18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function HeaderNav({ dictionary, lang }: { dictionary: Dictionary; lang: Locale }) {
  const navigation = dictionary.navigation;
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen || !panelRef.current) return;

    const root = panelRef.current;
    const selector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])'
    ].join(",");

    const focusables = () =>
      [...root.querySelectorAll<HTMLElement>(selector)].filter((el) => root.contains(el) && !el.hasAttribute("disabled"));

    window.requestAnimationFrame(() => focusables()[0]?.focus());

    function onTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const list = focusables().filter((el) => !el.closest('[aria-hidden="true"]'));
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    root.addEventListener("keydown", onTab);
    return () => root.removeEventListener("keydown", onTab);
  }, [mobileOpen]);

  const reserveHref = localizedPath(lang, "/reservations");
  const navbarBottom = "calc(1rem + 5rem + 0.35rem)";

  const linkDesk =
    "relative whitespace-nowrap text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-charcoal/[0.92] transition duration-300 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:text-charcoal hover:after:w-full focus-visible:text-charcoal focus-visible:outline-none focus-visible:after:w-full";

  return (
    <header className={`fixed inset-x-0 top-0 z-[100] min-w-0 overflow-x-hidden ${NAV}:overflow-visible`}>
      <div className={`mx-4 mt-4 min-w-0 sm:mx-6 lg:mx-10 ${NAV}:overflow-visible`}>
        <div
          className={`relative z-[110] mx-auto w-full max-w-[88rem] min-w-0 overflow-x-visible border-x border-t border-walnut/[0.17] bg-[#F8F4EF]/96 px-5 shadow-[0_14px_40px_rgba(58,42,30,0.1)] backdrop-blur-md sm:px-7 ${NAV}:rounded-[2.85rem] ${NAV}:border ${NAV}:border-walnut/[0.14] ${NAV}:bg-[rgba(247,243,237,0.94)] ${NAV}:px-8 max-lg:rounded-b-none max-lg:rounded-t-[1.95rem]`}
        >
          <div
            className={`grid min-h-[5rem] w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 sm:gap-x-4 lg:grid-cols-[auto_minmax(8rem,1fr)_auto] lg:gap-x-8 xl:gap-x-10`}
          >
            <div className="min-w-0 shrink">
              <Link href={localizedPath(lang)} className="group flex min-w-0 items-center gap-3.5 sm:gap-4">
                <span
                  className="relative h-[2.35rem] w-[3.25rem] shrink-0 brightness-[1.03] contrast-[1.06] opacity-[0.97] ring-1 ring-walnut/10 transition-[opacity,ring-color] duration-300 group-hover:opacity-100 sm:h-[2.55rem] sm:w-[3.45rem]"
                  aria-hidden
                >
                  <Image src={figueiralLogoSrc} alt="" fill priority sizes="112px" className="object-contain object-center" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate pt-px font-display text-[1.65rem] leading-none tracking-tight text-charcoal transition group-hover:text-gold sm:text-[1.76rem]">
                    Figueiral
                  </span>
                  <span className="mt-1 block max-w-[11rem] text-[0.58rem] font-semibold uppercase leading-tight tracking-[0.36em] text-gold/[0.88]">
                    {navigation.brandLine}
                  </span>
                </span>
              </Link>
            </div>

            <div className={`col-start-2 flex max-w-fit min-w-0 items-center justify-end gap-3 lg:hidden`}>
              <LuxuryButton
                href={reserveHref}
                className="hidden !min-h-10 !min-w-0 whitespace-nowrap !px-4 !py-3 !text-[0.61rem] !tracking-[0.24em] min-[460px]:inline-flex"
              >
                {navigation.reserve}
              </LuxuryButton>
              <button
                type="button"
                className="mobile-menu-button inline-flex h-11 min-w-[2.75rem] shrink-0 items-center justify-center rounded-full border border-charcoal/[0.22] bg-cream/[0.98] text-charcoal shadow-sm ring-2 ring-transparent transition hover:border-gold/50 hover:bg-paper hover:shadow-md focus:outline-none focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-[0.98]"
                aria-expanded={mobileOpen}
                aria-controls={mobileOpen ? panelId : undefined}
                aria-haspopup="true"
                aria-label={mobileOpen ? navigation.menuClose : navigation.menuOpen}
                onClick={() => setMobileOpen((o) => !o)}
              >
                <MenuGlyph open={mobileOpen} />
              </button>
            </div>

            <nav
              id="site-desktop-nav"
              aria-label={navigation.ariaMain}
              className={`relative z-[112] hidden min-h-0 min-w-0 flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:col-start-2 lg:row-start-1 lg:flex lg:justify-center xl:gap-x-[1.375rem]`}
            >
              {navItems.map((item) => (
                <Link key={item.href} href={localizedPath(lang, item.href)} className={linkDesk}>
                  {navigation[item.labelKey]}
                </Link>
              ))}
            </nav>

            <div className={`hidden min-w-0 shrink-0 lg:col-start-3 lg:row-start-1 lg:flex lg:items-center lg:justify-end`}>
              <div className={`flex flex-wrap items-center justify-end gap-x-3 gap-y-2 border-walnut/15 lg:border-l lg:pl-6 xl:gap-x-4 xl:pl-7`}>
                <LanguageSwitcher variant="header" lang={lang} ariaLabel={navigation.language} />
                <LuxuryButton href={reserveHref} className="inline-flex whitespace-nowrap !min-h-11 min-w-0 shrink !px-6">
                  {navigation.reserve}
                </LuxuryButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`lg:hidden`} aria-live="polite">
        {mobileOpen ? (
          <div className="fixed inset-0 z-[95]" role="presentation">
            <div
              className="animate-mobile-nav-backdrop-in fixed inset-0 z-[96] cursor-pointer bg-charcoal/[0.52] backdrop-blur-[1px]"
              aria-hidden="true"
              onClick={() => setMobileOpen(false)}
            />
            <div
              id={panelId}
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={navigation.ariaMain}
              className="animate-mobile-nav-panel-in fixed left-4 right-4 z-[99] mx-auto max-h-[calc(100dvh-7rem)] max-w-[88rem] origin-top overflow-hidden rounded-b-[1.35rem] border border-walnut/18 bg-[#F8F5F0] shadow-[0_28px_70px_rgba(55,42,34,0.2)] sm:left-6 sm:right-6 lg:left-10 lg:right-10"
              style={{ top: navbarBottom }}
            >
              <div className="max-h-[calc(100dvh-7.75rem)] overflow-y-auto overscroll-contain px-5 pb-8 pt-6 sm:pb-10 sm:pt-8">
                <nav className="flex flex-col gap-0 border-b border-walnut/15 pb-6" aria-label={navigation.ariaMain}>
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={localizedPath(lang, item.href)}
                      className="rounded-xl px-3 py-4 text-[1.05rem] font-medium leading-snug text-charcoal outline-none ring-offset-2 ring-offset-[#F8F5F0] transition hover:bg-sand/[0.75] active:bg-sand focus-visible:ring-2 focus-visible:ring-gold sm:py-3.5"
                      onClick={() => setMobileOpen(false)}
                    >
                      {navigation[item.labelKey]}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-walnut/15 py-6">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-charcoal">{navigation.language}</span>
                  <LanguageSwitcher variant="drawer" lang={lang} ariaLabel={navigation.language} />
                </div>

                <div className="pt-7">
                  <LuxuryButton
                    href={reserveHref}
                    className="flex w-full !min-h-[3.25rem] justify-center whitespace-nowrap"
                    onClick={() => setMobileOpen(false)}
                  >
                    {navigation.reserve}
                  </LuxuryButton>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
