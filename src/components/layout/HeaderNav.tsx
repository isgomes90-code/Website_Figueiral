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

/**
 * Desktop horizontal nav só a partir de `xl` (1280px): evita links comprimidos entre ~1024–1279px.
 */

/** Normaliza pathname para comparação (sem query/hash; remove trailing slash excepto `/`). */
function normalizeRoutePath(path: string): string {
  let p = path.split("?")[0]?.split("#")[0] ?? "";
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

/** Uma página ativa de cada vez — igualdade exacta com a rota localizada. */
function isNavItemActive(pathname: string, lang: Locale, itemHref: string): boolean {
  const current = normalizeRoutePath(pathname);
  const target =
    itemHref === "/" ? normalizeRoutePath(localizedPath(lang)) : normalizeRoutePath(localizedPath(lang, itemHref));
  return current === target;
}

function isReservationsActive(pathname: string, lang: Locale): boolean {
  return normalizeRoutePath(pathname) === normalizeRoutePath(localizedPath(lang, "/reservations"));
}

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

const deskNavLinkBase =
  "relative inline-flex shrink-0 whitespace-nowrap pb-1 text-[0.72rem] font-semibold uppercase tracking-[0.19em] text-charcoal/[0.88] outline-none ring-offset-[rgba(249,246,241,0.96)] transition-[color] duration-300 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:text-charcoal hover:after:scale-x-100 focus-visible:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2";

const deskNavLinkActive = "text-charcoal after:!scale-x-100";

export function HeaderNav({ dictionary, lang }: { dictionary: Dictionary; lang: Locale }) {
  const navigation = dictionary.navigation;
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);

  const reservationsActive = isReservationsActive(pathname, lang);

  /** Um único «Reservar» com `aria-current="page"` visível de cada vez (drawer vs barra). */
  const reserveAriaPageBar = reservationsActive && !mobileOpen;
  const reserveAriaPageDrawer = reservationsActive && mobileOpen;

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
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
  const navbarBottom = "calc(0.875rem + 4.85rem + 0.35rem)";

  return (
    <header className="fixed inset-x-0 top-0 z-[100] min-w-0 overflow-x-hidden xl:overflow-visible">
      <div className="mx-4 mt-3 min-w-0 sm:mx-6 sm:mt-3.5 lg:mx-10 xl:overflow-visible">
        <div
          className={`relative z-[110] mx-auto w-full max-w-[88rem] min-w-0 overflow-x-hidden border-x border-t border-walnut/[0.11] bg-[#FAF7F3]/97 px-5 py-2.5 shadow-[0_10px_28px_rgba(58,42,30,0.06)] backdrop-blur-md sm:px-7 xl:overflow-visible xl:rounded-[2.45rem] xl:border xl:border-walnut/[0.11] xl:bg-[rgba(249,246,241,0.96)] xl:px-8 xl:py-2.5 max-xl:rounded-b-none max-xl:rounded-t-[1.85rem]`}
        >
          <div className="grid min-h-[4.85rem] w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 sm:gap-x-4 xl:grid-cols-[auto_minmax(8rem,1fr)_auto] xl:gap-x-8 2xl:gap-x-10">
            <div className="min-w-0 shrink">
              <Link
                href={localizedPath(lang)}
                className="group flex max-w-[11.5rem] flex-col items-start gap-1 sm:max-w-[13rem] sm:gap-1.5"
                aria-label={`${siteConfig.name} — ${navigation.brandLine}`}
              >
                <span className="relative h-[2.72rem] w-[4.55rem] shrink-0 sm:h-[3.15rem] sm:w-[5.25rem] xl:h-[3.35rem] xl:w-[5.55rem]">
                  <Image
                    src={figueiralLogoSrc}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 640px) 128px, (max-width: 1280px) 148px, 162px"
                    className="object-contain object-left drop-shadow-[0_1px_2px_rgba(58,44,34,0.06)] transition-opacity duration-300 group-hover:opacity-95"
                  />
                </span>
                <span className="block max-w-full text-[0.54rem] font-semibold uppercase leading-snug tracking-[0.28em] text-gold/[0.88] sm:text-[0.57rem] sm:tracking-[0.32em]">
                  {navigation.brandLine}
                </span>
              </Link>
            </div>

            <div className={`col-start-2 flex max-w-fit min-w-0 items-center justify-end gap-3 xl:hidden`}>
              <LuxuryButton
                href={reserveHref}
                className="hidden !min-h-10 !min-w-0 whitespace-nowrap !px-4 !py-3 !text-[0.61rem] !tracking-[0.24em] min-[460px]:inline-flex"
                ariaCurrent={reserveAriaPageBar}
              >
                {navigation.reserve}
              </LuxuryButton>
              <button
                type="button"
                className="mobile-menu-button inline-flex h-11 min-w-[2.75rem] shrink-0 items-center justify-center rounded-full border border-charcoal/[0.22] bg-[#F8F5F0] text-charcoal shadow-sm ring-2 ring-transparent transition hover:border-gold/50 hover:bg-paper hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-[0.98]"
                aria-expanded={mobileOpen}
                aria-controls={panelId}
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
              className="relative z-[112] hidden min-h-0 min-w-0 shrink xl:col-start-2 xl:row-start-1 xl:flex xl:flex-nowrap xl:items-center xl:justify-center xl:gap-x-6 xl:gap-y-0 2xl:gap-x-[1.375rem]"
            >
              {navItems.map((item) => {
                const active = isNavItemActive(pathname, lang, item.href);
                return (
                  <Link
                    key={item.href}
                    href={localizedPath(lang, item.href)}
                    className={`${deskNavLinkBase} ${active ? deskNavLinkActive : ""}`}
                    {...(active ? { "aria-current": "page" as const } : {})}
                  >
                    {navigation[item.labelKey]}
                  </Link>
                );
              })}
            </nav>

            <div className={`hidden min-w-0 shrink-0 xl:col-start-3 xl:row-start-1 xl:flex xl:items-center xl:justify-end`}>
              <div className={`flex flex-wrap items-center justify-end gap-x-3 gap-y-2 border-walnut/15 xl:border-l xl:pl-6 2xl:gap-x-4 2xl:pl-7`}>
                <LanguageSwitcher variant="header" lang={lang} ariaLabel={navigation.language} />
                <LuxuryButton href={reserveHref} className="inline-flex whitespace-nowrap !min-h-11 min-w-0 shrink !px-6" ariaCurrent={reserveAriaPageBar}>
                  {navigation.reserve}
                </LuxuryButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`xl:hidden`} aria-live="polite">
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
              className="animate-mobile-nav-panel-in fixed left-4 right-4 z-[99] mx-auto max-h-[calc(100dvh-7rem)] max-w-[88rem] origin-top overflow-hidden rounded-b-[1.35rem] border border-walnut/20 bg-[#F4EFE8] shadow-[0_28px_70px_rgba(55,42,34,0.22)] sm:left-6 sm:right-6 lg:left-10 lg:right-10"
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
                            ? "border-l-[3px] border-gold bg-[rgba(156,121,87,0.14)] font-semibold text-charcoal focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                            : "border-l-[3px] border-transparent font-medium text-charcoal hover:bg-[rgba(156,121,87,0.1)] active:bg-[rgba(156,121,87,0.14)] focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
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
