"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { navItems, figueiralLogoSrc, siteConfig } from "@/lib/site";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

/** Em conjunto com classes `min-[900px]:*`: abaixo disto, menu hamburger. */
export const HEADER_DESKTOP_NAV_PX = 900;

/**
 * Grelha desktop: logo (faixa útil limitada) | nav centrado (`1fr`) | rail `auto`.
 * Tracking e gaps maiores onde a largura o permite — sem esmagar o tipo.
 */

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

const deskNavPaper =
  "relative inline-flex shrink-0 whitespace-nowrap pb-[0.34rem] text-[0.875rem] font-semibold uppercase leading-snug tracking-[0.065em] text-charcoal/[0.92] outline-none transition-[color] duration-300 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:bg-brandGreen after:transition-transform after:duration-300 hover:text-charcoal hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandGreen/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(252,249,245,0.85)] xl:text-[0.925rem] xl:tracking-[0.075em] 2xl:text-[0.95rem] 2xl:tracking-[0.08em]";

const deskNavGlass =
  "relative inline-flex shrink-0 whitespace-nowrap pb-[0.34rem] text-[0.875rem] font-semibold uppercase leading-snug tracking-[0.065em] text-cream/[0.93] outline-none transition-[color] duration-300 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:origin-center after:scale-x-0 after:bg-gold/80 after:transition-transform after:duration-300 hover:text-cream hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent xl:text-[0.925rem] xl:tracking-[0.075em] 2xl:text-[0.95rem] 2xl:tracking-[0.08em]";

const deskNavActivePaper = "text-charcoal after:!scale-x-100";
const deskNavActiveGlass = "text-cream after:!scale-x-100";

export function HeaderNav({ dictionary, lang }: { dictionary: Dictionary; lang: Locale }) {
  const navigation = dictionary.navigation;
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);

  const heroBlend = normalizeRoutePath(pathname) === `/${lang}`;

  const reservationsActive = isReservationsActive(pathname, lang);

  const reserveAriaPageBar = reservationsActive && !mobileOpen;
  const reserveAriaPageDrawer = reservationsActive && mobileOpen;

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
  const navbarBottom = "calc(max(0.5rem, env(safe-area-inset-top, 0px)) + 4.65rem)";

  const stripShell = heroBlend
    ? "border-b border-white/[0.08] bg-gradient-to-b from-[rgba(10,9,8,0.62)] via-[rgba(10,9,8,0.32)] to-transparent backdrop-blur-[14px] backdrop-saturate-[1.08]"
    : "border-b border-walnut/[0.09] bg-[rgba(252,249,245,0.58)] backdrop-blur-xl backdrop-saturate-[1.05]";

  const deskBase = heroBlend ? deskNavGlass : deskNavPaper;
  const deskActive = heroBlend ? deskNavActiveGlass : deskNavActivePaper;

  const logoSubtitleCls = heroBlend ? "text-gold/[0.82]" : "text-brandGreen/[0.78]";
  const logoImageCls = heroBlend
    ? "object-contain object-left drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] transition-opacity duration-300 group-hover:opacity-95"
    : "object-contain object-left drop-shadow-[0_1px_2px_rgba(58,44,34,0.06)] transition-opacity duration-300 group-hover:opacity-95";

  const mobileBtnCls = heroBlend
    ? "mobile-menu-button inline-flex h-10 min-w-[2.625rem] shrink-0 items-center justify-center rounded-full border border-cream/[0.22] bg-charcoal/[0.38] text-cream shadow-[0_6px_20px_rgba(0,0,0,0.2)] backdrop-blur-md ring-2 ring-transparent transition hover:border-cream/35 hover:bg-charcoal/48 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cream/45 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98]"
    : "mobile-menu-button inline-flex h-10 min-w-[2.625rem] shrink-0 items-center justify-center rounded-full border border-charcoal/[0.18] bg-[rgba(252,249,245,0.88)] text-charcoal shadow-sm ring-2 ring-transparent backdrop-blur-md transition hover:border-brandGreen/35 hover:bg-paper hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brandGreen/45 focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-[0.98]";

  const railBorder = heroBlend ? "border-white/[0.14]" : "border-brandGreen/[0.16]";

  return (
    <header className="fixed inset-x-0 top-0 z-[100] min-w-0 overflow-x-hidden min-[900px]:overflow-visible">
      <div className="relative z-[110] w-full min-w-0 overflow-x-hidden pt-[max(0.35rem,env(safe-area-inset-top))] min-[900px]:overflow-visible">
        <div className={stripShell}>
          <div className="mx-auto grid min-h-[4rem] w-full max-w-[88rem] min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 px-4 pb-3 pt-2 sm:gap-x-2.5 sm:px-5 min-[900px]:grid-cols-[minmax(7.5rem,10.5rem)_minmax(0,1fr)_auto] min-[900px]:items-center min-[900px]:gap-x-3 min-[900px]:px-4 min-[900px]:max-xl:px-[1rem] xl:gap-x-4 xl:px-7 2xl:gap-x-5 2xl:px-9">
            <div className="min-w-0 max-w-[9.25rem] shrink justify-self-start min-[900px]:max-w-full min-[900px]:justify-self-start">
              <Link
                href={localizedPath(lang)}
                className="group inline-flex max-w-full flex-col items-start gap-1 sm:gap-1.5"
                aria-label={`${siteConfig.name} — ${navigation.brandLine}`}
              >
                <span className="relative h-[2.6rem] w-[4.35rem] shrink-0 sm:h-[2.95rem] sm:w-[4.95rem] min-[900px]:max-xl:h-[3.06rem] min-[900px]:max-xl:w-[5.1rem] xl:h-[3.3rem] xl:w-[5.5rem] 2xl:h-[3.5rem] 2xl:w-[5.85rem]">
                  <Image
                    src={figueiralLogoSrc}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 640px) 108px, (max-width: 900px) 124px, (max-width: 1280px) 138px, 154px"
                    className={logoImageCls}
                  />
                </span>
                <span className={`block max-w-full text-[0.6rem] font-semibold uppercase leading-snug tracking-[0.24em] sm:text-[0.62rem] sm:tracking-[0.25em] xl:text-[0.64rem] xl:tracking-[0.26em] ${logoSubtitleCls}`}>
                  {navigation.brandLine}
                </span>
              </Link>
            </div>

            <div className="col-start-2 row-start-1 flex max-w-fit min-w-0 items-center justify-end gap-2.5 min-[900px]:hidden sm:gap-3">
              <LuxuryButton
                href={reserveHref}
                className="hidden !min-h-10 !min-w-0 whitespace-nowrap !px-3.5 !py-2.5 !text-[0.58rem] !tracking-[0.2em] min-[460px]:inline-flex"
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
                <MenuGlyph open={mobileOpen} className={heroBlend ? "text-cream" : "text-charcoal"} />
              </button>
            </div>

            <nav
              id="site-desktop-nav"
              aria-label={navigation.ariaMain}
              className="relative z-[112] hidden min-h-0 min-w-0 shrink flex-nowrap items-center justify-center gap-x-3 min-[900px]:col-start-2 min-[900px]:row-start-1 min-[900px]:flex min-[900px]:w-full xl:gap-x-4 2xl:gap-x-5"
            >
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
            </nav>

            <div className="hidden min-w-0 shrink-0 min-[900px]:col-start-3 min-[900px]:row-start-1 min-[900px]:flex min-[900px]:items-center min-[900px]:justify-self-end">
              <div
                className={`flex flex-nowrap items-center justify-end gap-x-2 border-l min-[900px]:max-xl:pl-2 xl:pl-3 ${railBorder}`}
              >
                <LanguageSwitcher variant="header" lang={lang} ariaLabel={navigation.language} inverse={heroBlend} />
                <LuxuryButton
                  density="headerReserve"
                  href={reserveHref}
                  className="min-w-0 whitespace-nowrap"
                  ariaCurrent={reserveAriaPageBar}
                >
                  {navigation.reserve}
                </LuxuryButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-[900px]:hidden" aria-live="polite">
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
