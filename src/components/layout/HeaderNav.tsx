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

/** Viewport ≥1200px: menu horizontal (preventivo) */
const NAV_LG = "min-[1200px]";

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
  const navbarBottom = "calc(1rem + 4.75rem)";

  const linkDesk =
    "relative whitespace-nowrap text-[0.72rem] font-medium uppercase tracking-[0.21em] text-charcoal transition duration-300 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:text-charcoal hover:after:w-full";

  return (
    <header className={`fixed inset-x-0 top-0 z-[100] min-w-0 overflow-x-hidden ${NAV_LG}:overflow-visible`}>
      <div className={`mx-4 mt-4 min-w-0 sm:mx-6 lg:mx-10 ${NAV_LG}:overflow-visible`}>
        <div
          className={`mx-auto w-full max-w-[88rem] min-w-0 overflow-x-hidden border-x border-t border-walnut/15 bg-[#F6F1EE]/95 px-5 shadow-[0_16px_48px_rgba(92,68,48,0.12)] backdrop-blur-md sm:px-7 ${NAV_LG}:rounded-full ${NAV_LG}:border ${NAV_LG}:border-walnut/15 ${NAV_LG}:bg-[rgba(246,241,234,0.92)] ${NAV_LG}:px-10 max-[1199px]:rounded-b-none max-[1199px]:rounded-t-[1.95rem]`}
        >
          <div
            className={`grid h-[4.75rem] w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 sm:gap-x-4 ${NAV_LG}:grid-cols-[auto_minmax(0,1fr)_auto] ${NAV_LG}:gap-x-8`}
          >
            <div className="min-w-0 shrink">
              <Link href={localizedPath(lang)} className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
                <span className="relative h-[1.9rem] w-[2.56rem] shrink-0 opacity-[0.94] transition-opacity group-hover:opacity-100 sm:h-[2.1rem] sm:w-[2.76rem]" aria-hidden>
                  <Image
                    src={figueiralLogoSrc}
                    alt=""
                    fill
                    priority
                    sizes="64px"
                    className="object-contain object-left"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-[1.7rem] leading-none text-charcoal transition group-hover:text-gold">
                    Figueiral
                  </span>
                  <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.38em] text-gold">{navigation.brandLine}</span>
                </span>
              </Link>
            </div>

            <div className={`col-start-2 flex max-w-fit min-w-0 items-center justify-end gap-3 ${NAV_LG}:hidden`}>
              <LuxuryButton
                href={reserveHref}
                className="hidden !min-h-10 !min-w-0 whitespace-nowrap !px-4 !py-3 !text-[0.61rem] !tracking-[0.24em] min-[460px]:inline-flex"
              >
                {navigation.reserve}
              </LuxuryButton>
              <button
                type="button"
                className="mobile-menu-button inline-flex h-11 min-w-[2.75rem] shrink-0 items-center justify-center rounded-full border border-charcoal/18 bg-cream text-charcoal shadow-sm transition hover:border-gold/45 hover:bg-paper focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-[#F6F1EE]"
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
              className={`desktop-nav hidden min-h-0 min-w-0 flex-wrap items-center justify-center gap-x-6 gap-y-2 ${NAV_LG}:col-start-2 ${NAV_LG}:row-start-1 ${NAV_LG}:flex ${NAV_LG}:min-w-0 2xl:gap-x-7`}
            >
              {navItems.map((item) => (
                <Link key={item.href} href={localizedPath(lang, item.href)} className={linkDesk}>
                  {navigation[item.labelKey]}
                </Link>
              ))}
            </nav>

            <div className={`hidden min-w-0 max-w-fit shrink gap-x-4 ${NAV_LG}:col-start-3 ${NAV_LG}:row-start-1 ${NAV_LG}:flex ${NAV_LG}:items-center ${NAV_LG}:justify-end ${NAV_LG}:justify-self-end`}>
              <div className={`flex flex-wrap items-center justify-end gap-x-4 gap-y-2 border-walnut/15 ${NAV_LG}:border-l ${NAV_LG}:pl-5 2xl:gap-x-5 2xl:pl-6`}>
                <LanguageSwitcher variant="header" lang={lang} ariaLabel={navigation.language} />
                <LuxuryButton href={reserveHref} className="inline-flex whitespace-nowrap !min-h-11 min-w-0 shrink !px-6">
                  {navigation.reserve}
                </LuxuryButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${NAV_LG}:hidden`} aria-live="polite">
        {mobileOpen ? (
          <div className="fixed inset-0 z-[84]" role="presentation">
            <div
              className="animate-mobile-nav-backdrop-in fixed inset-0 z-[88] cursor-pointer bg-charcoal/48"
              aria-hidden="true"
              onClick={() => setMobileOpen(false)}
            />
            <div
              id={panelId}
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={navigation.ariaMain}
              className="animate-mobile-nav-panel-in fixed left-4 right-4 z-[92] mx-auto max-h-[calc(100dvh-7rem)] max-w-[88rem] origin-top overflow-hidden rounded-b-[1.35rem] border border-walnut/18 bg-[#F2EDE6] shadow-[0_28px_70px_rgba(55,42,34,0.18)] sm:left-6 sm:right-6 lg:left-10 lg:right-10"
              style={{ top: navbarBottom }}
            >
              <div className="max-h-[calc(100dvh-7.75rem)] overflow-y-auto overscroll-contain px-5 pb-8 pt-6 sm:pb-10 sm:pt-8">
                <nav className="flex flex-col gap-0 border-b border-walnut/15 pb-6" aria-label={navigation.ariaMain}>
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={localizedPath(lang, item.href)}
                      className="rounded-xl px-3 py-4 text-[1.08rem] font-medium leading-snug text-charcoal outline-none ring-offset-2 ring-offset-[#F2EDE6] transition hover:bg-sand focus-visible:ring-2 focus-visible:ring-gold sm:py-3.5"
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
