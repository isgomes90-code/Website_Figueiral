"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { figueiralLogoHeaderCreamSrc, figueiralLogoSrc, navItems, siteConfig } from "@/lib/site";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

/** Concordante com classes `min-[900px]:*` — abaixo disso usa-se o menu mobile. */
export const HEADER_DESKTOP_NAV_PX = 900;

const AT_TOP_SCROLL_PX = 28;
const HIDE_AFTER_SCROLL_PX = 100;
const SCROLL_DIRECTION_DELTA_PX = 8;

function normalizeRoutePath(path: string): string {
  let p = path.split("?")[0]?.split("#")[0] ?? "";
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

function isNavItemActive(pathname: string, lang: Locale, itemHref: string): boolean {
  const current = normalizeRoutePath(pathname);
  const target =
    itemHref === "/" ? normalizeRoutePath(localizedPath(lang)) : normalizeRoutePath(localizedPath(lang, itemHref));
  return current === target;
}

function isReservationsActive(pathname: string, lang: Locale): boolean {
  return normalizeRoutePath(pathname) === normalizeRoutePath(localizedPath(lang, "/reservations"));
}

function MenuGlyph({ open, className = "text-charcoal" }: { open: boolean; className?: string }) {
  return open ? (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden className={className}>
      <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden className={className}>
      <path d="M4 6H18M4 11H18M4 16H18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

const deskNavElevatedPaper =
  "relative inline-flex shrink-0 whitespace-nowrap pb-0.5 text-[15px] font-medium leading-snug tracking-[0.065em] text-charcoal/[0.9] outline-none transition-colors duration-300 after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-[2px] after:h-px after:origin-center after:scale-x-0 after:bg-brandGreen after:transition-transform after:duration-300 hover:text-charcoal hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandGreen/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream min-[900px]:text-[15.5px] xl:text-[16px]";

const deskNavTransparentGlass =
  "relative inline-flex shrink-0 whitespace-nowrap pb-0.5 text-[15px] font-medium leading-snug tracking-[0.065em] text-cream/[0.93] outline-none transition-colors duration-300 after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-[2px] after:h-[1.5px] after:origin-center after:scale-x-0 after:bg-gold/85 after:transition-transform after:duration-300 hover:text-cream hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-[900px]:text-[15.5px] xl:text-[16px]";

const deskNavActivePaper = "text-charcoal after:!scale-x-100";
const deskNavActiveGlass = "text-cream after:!scale-x-100";

export function HeaderNav({ dictionary, lang }: { dictionary: Dictionary; lang: Locale }) {
  const navigation = dictionary.navigation;
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [atTopChrome, setAtTopChrome] = useState(true);

  const isHomeHero = normalizeRoutePath(pathname) === `/${lang}`;
  const reservationsActive = isReservationsActive(pathname, lang);
  const reserveAriaPageBar = reservationsActive && !mobileOpen;
  const reserveAriaPageDrawer = reservationsActive && mobileOpen;

  /** Navegação clara sobre o hero apenas no topo inicial; sempre legível quando o bar está em modo sólido. */
  const useTransparentHeroTone = isHomeHero && atTopChrome;

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      setHeaderVisible(true);
    }
  }, [mobileOpen]);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${HEADER_DESKTOP_NAV_PX}px)`);
    function closeIfDesktop() {
      if (mq.matches) setMobileOpen(false);
    }
    closeIfDesktop();
    mq.addEventListener("change", closeIfDesktop);
    return () => mq.removeEventListener("change", closeIfDesktop);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY || 0;
    setAtTopChrome(lastScrollY.current <= AT_TOP_SCROLL_PX);

    let ticking = false;
    function syncFromScroll() {
      const y = window.scrollY || 0;
      const prev = lastScrollY.current;
      lastScrollY.current = y;

      const atTop = y <= AT_TOP_SCROLL_PX;
      setAtTopChrome(atTop);

      const delta = y - prev;
      const scrollingDown = delta > SCROLL_DIRECTION_DELTA_PX;
      const scrollingUp = delta < -SCROLL_DIRECTION_DELTA_PX;

      if (atTop) setHeaderVisible(true);
      else if (scrollingDown && y > HIDE_AFTER_SCROLL_PX) setHeaderVisible(false);
      else if (scrollingUp) setHeaderVisible(true);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        syncFromScroll();
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
  const navbarBottom = "calc(max(0.5rem, env(safe-area-inset-top, 0px)) + 5.25rem)";

  const deskBase = useTransparentHeroTone ? deskNavTransparentGlass : deskNavElevatedPaper;
  const deskActive = useTransparentHeroTone ? deskNavActiveGlass : deskNavActivePaper;

  const shellClasses =
    atTopChrome && !mobileOpen
      ? "border-b border-transparent bg-transparent shadow-none backdrop-blur-0"
      : "border-b border-walnut/[0.1] bg-[rgba(253,251,246,0.92)] shadow-[0_8px_32px_rgba(45,37,31,0.04)] backdrop-blur-md";

  const logoSrc = useTransparentHeroTone ? figueiralLogoHeaderCreamSrc : figueiralLogoSrc;
  const logoImageCls = useTransparentHeroTone ? "header-logo-image header-logo-image--cream" : "header-logo-image header-logo-image--paper";

  const mobileBtnTone = useTransparentHeroTone ? "border-cream/25 text-cream bg-charcoal/[0.2]" : "border-charcoal/15 text-charcoal bg-paper/[0.75]";

  const mobileBtnCls = `mobile-menu-button inline-flex h-11 min-w-[2.75rem] shrink-0 items-center justify-center rounded-full border shadow-sm ring-2 ring-transparent transition hover:brightness-[1.04] hover:shadow-md focus:outline-none focus-visible:ring-2 active:scale-[0.98] ${mobileBtnTone} ${
    useTransparentHeroTone ? "focus-visible:ring-cream/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent" : "focus-visible:ring-brandGreen/45 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
  }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] min-w-0 overflow-x-hidden transition-[transform] duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] min-[900px]:overflow-visible ${
        headerVisible ? "translate-y-0" : "-translate-y-[110%]"
      }`}
      data-header-state={headerVisible ? "visible" : "hidden"}
    >
      <div className={`relative ${shellClasses}`}>
        <div className="header-inner relative mx-auto grid w-full max-w-[88rem] min-w-0 grid-cols-[auto_1fr_auto] items-center gap-x-3 px-5 pb-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:gap-x-4 sm:px-7 sm:pb-5 sm:pt-[max(0.85rem,env(safe-area-inset-top))] lg:gap-x-5 lg:px-11 xl:gap-x-6">
          <div className="header-logo relative z-[4] min-w-0 shrink-0 self-center">
            <Link href={localizedPath(lang)} className="header-logo-link" aria-label={siteConfig.name}>
              <span className="relative block h-[4.35rem] w-[7.45rem] sm:h-[4.85rem] sm:w-[8.27rem] min-[900px]:h-[5rem] min-[900px]:w-[8.55rem] xl:h-[5.85rem] xl:w-[9.98rem]">
                <Image
                  src={logoSrc}
                  alt={dictionary.seo.images.logoHeader}
                  fill
                  priority
                  sizes="(max-width: 899px) 132px, (max-width: 1279px) 154px, 160px"
                  className={logoImageCls}
                />
              </span>
            </Link>
          </div>

          {/* Mobile controlo */}
          <div className="col-start-3 flex flex-nowrap items-center justify-end gap-x-2.5 min-[900px]:hidden sm:gap-x-3">
            <LuxuryButton
              href={reserveHref}
              className="hidden !min-h-[2.5rem] !min-w-0 whitespace-nowrap !px-4 !py-2 !text-[0.625rem] !tracking-[0.18em] min-[460px]:inline-flex"
              ariaCurrent={reserveAriaPageBar}
            >
              {navigation.reserve}
            </LuxuryButton>
            <button
              type="button"
              className={mobileBtnCls}
              aria-expanded={mobileOpen}
              aria-controls={panelId}
              aria-haspopup="true"
              aria-label={mobileOpen ? navigation.menuClose : navigation.menuOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <MenuGlyph open={mobileOpen} className={useTransparentHeroTone ? "text-cream" : "text-charcoal"} />
            </button>
          </div>

          {/* Nav centrada na coluna do meio — sem overlap com logo/acções */}
          <nav
            id="site-desktop-nav"
            aria-label={navigation.ariaMain}
            className="col-start-2 hidden min-w-0 min-[900px]:block"
          >
            <div className="flex flex-nowrap items-center justify-center gap-x-3 min-[900px]:gap-x-4 lg:gap-x-5 xl:gap-x-7 2xl:gap-x-9">
              {navItems.map((item) => {
                const active = isNavItemActive(pathname, lang, item.href);
                return (
                  <Link
                    key={item.href}
                    href={localizedPath(lang, item.href)}
                    className={`${deskBase} ${active ? deskActive : ""}`}
                    {...(active ? { "aria-current": "page" as const } : {})}
                  >
                    {navigation[item.labelKey]}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="header-actions relative z-[2] col-start-3 hidden shrink-0 flex-nowrap items-center justify-end gap-x-4 min-[900px]:flex lg:gap-x-5 xl:gap-x-7">
            <LanguageSwitcher variant="header" lang={lang} ariaLabel={navigation.language} inverse={useTransparentHeroTone} />
            <span className={`h-5 w-px shrink-0 ${useTransparentHeroTone ? "bg-cream/[0.32]" : "bg-walnut/25"}`} aria-hidden />
            <LuxuryButton density="headerReserve" href={reserveHref} className="whitespace-nowrap" ariaCurrent={reserveAriaPageBar}>
              {navigation.reserve}
            </LuxuryButton>
          </div>
        </div>
      </div>

      <div className="min-[900px]:hidden" aria-live="polite">
        {mobileOpen ? (
          <div className="fixed inset-0 z-[95]" role="presentation">
            <div
              className="animate-mobile-nav-backdrop-in fixed inset-0 z-[96] cursor-pointer bg-charcoal/[0.48]"
              aria-hidden="true"
              onClick={() => setMobileOpen(false)}
            />
            <div
              id={panelId}
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={navigation.ariaMain}
              className="animate-mobile-nav-panel-in fixed left-4 right-4 z-[99] mx-auto max-h-[calc(100dvh-7rem)] max-w-[88rem] origin-top overflow-hidden rounded-b-[1.35rem] border border-walnut/20 bg-[#F4EFE8] shadow-[0_28px_70px_rgba(55,42,34,0.22)] sm:left-6 sm:right-6"
              style={{ top: navbarBottom }}
            >
              <div className="max-h-[calc(100dvh-7.75rem)] overflow-y-auto overflow-x-hidden overscroll-contain px-5 pb-8 pt-6 sm:pb-10 sm:pt-8">
                <nav className="flex flex-col gap-0 border-b border-walnut/18 pb-6" aria-label={navigation.ariaMain}>
                  {navItems.map((item) => {
                    const active = isNavItemActive(pathname, lang, item.href);
                    return (
                      <Link
                        key={item.href}
                        href={localizedPath(lang, item.href)}
                        className={`rounded-r-xl px-4 py-4 text-[1.05rem] leading-snug outline-none ring-offset-[#F4EFE8] transition-colors sm:py-3.5 ${
                          active
                            ? "border-l-[3px] border-brandGreen bg-[rgba(88,96,86,0.1)] font-semibold text-charcoal focus-visible:ring-2 focus-visible:ring-brandGreen/45 focus-visible:ring-offset-2"
                            : "border-l-[3px] border-transparent font-medium text-charcoal hover:bg-[rgba(111,121,108,0.11)] active:bg-[rgba(111,121,108,0.15)] focus-visible:ring-2 focus-visible:ring-brandGreen/40 focus-visible:ring-offset-2"
                        }`}
                        onClick={() => setMobileOpen(false)}
                        {...(active ? { "aria-current": "page" as const } : {})}
                      >
                        {navigation[item.labelKey]}
                      </Link>
                    );
                  })}
                </nav>

                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-walnut/18 py-6">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-charcoal">{navigation.language}</span>
                  <LanguageSwitcher variant="drawer" lang={lang} ariaLabel={navigation.language} />
                </div>

                <div className="pt-7">
                  <LuxuryButton
                    href={reserveHref}
                    className="flex w-full !min-h-[3.25rem] justify-center whitespace-nowrap"
                    onClick={() => setMobileOpen(false)}
                    ariaCurrent={reserveAriaPageDrawer}
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
