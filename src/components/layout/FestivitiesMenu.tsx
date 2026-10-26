"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { festivityNavItems } from "@/lib/site";

function normalizeRoutePath(path: string): string {
  let p = path.split("?")[0]?.split("#")[0] ?? "";
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="M2.25 4.5L6 8.25L9.75 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FestivitiesMenu({
  navigation,
  lang,
  variant,
  deskClassName = "",
  activeClassName = "",
  onNavigate
}: {
  navigation: Dictionary["navigation"];
  lang: Locale;
  variant: "desktop" | "mobile";
  deskClassName?: string;
  activeClassName?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const suppressHover = useRef(false);
  const pendingFocus = useRef(false);
  const [open, setOpen] = useState(false);

  const items = festivityNavItems.map((item) => {
    const href = localizedPath(lang, item.href);
    const current = normalizeRoutePath(pathname) === normalizeRoutePath(href);
    return { href, label: navigation[item.labelKey], current };
  });
  const sectionActive = items.some((item) => item.current);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open || !pendingFocus.current) return;
    pendingFocus.current = false;
    menuRef.current?.querySelector<HTMLAnchorElement>('[role="menuitem"]')?.focus();
  }, [open]);

  function openFromHover() {
    if (variant !== "desktop" || suppressHover.current) return;
    setOpen(true);
  }

  function closeFromHover() {
    if (variant !== "desktop") return;
    suppressHover.current = false;
    setOpen(false);
  }

  function toggle() {
    setOpen((current) => {
      if (current) suppressHover.current = true;
      return !current;
    });
  }

  function closeAndFocusTrigger() {
    setOpen(false);
    if (variant === "desktop") buttonRef.current?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      closeAndFocusTrigger();
      return;
    }

    if (variant !== "desktop") return;
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    const menuItems = menuRef.current
      ? [...menuRef.current.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]')]
      : [];

    if (!open || menuItems.length === 0) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        pendingFocus.current = true;
        setOpen(true);
      }
      return;
    }

    event.preventDefault();
    const currentIndex = menuItems.indexOf(document.activeElement as HTMLAnchorElement);
    const nextIndex =
      event.key === "ArrowDown"
        ? currentIndex < 0
          ? 0
          : (currentIndex + 1) % menuItems.length
        : currentIndex < 0
          ? menuItems.length - 1
          : (currentIndex - 1 + menuItems.length) % menuItems.length;
    menuItems[nextIndex]?.focus();
  }

  const panel =
    open ? (
      <div
        ref={menuRef}
        id={menuId}
        role="menu"
        aria-label={navigation.festivitiesSubmenu}
        className={
          variant === "desktop"
            ? "absolute left-1/2 top-full z-[80] min-w-[19.5rem] -translate-x-1/2 pt-3"
            : "pb-1"
        }
      >
        <div
          className={
            variant === "desktop"
              ? "overflow-hidden rounded-[1.15rem] border border-walnut/20 bg-[#F4EFE8] p-2 shadow-[0_28px_70px_rgba(55,42,34,0.18)]"
              : "flex flex-col gap-0.5 pl-3"
          }
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              className={
                variant === "desktop"
                  ? `block rounded-xl px-4 py-3 text-left text-[0.95rem] font-medium leading-snug text-charcoal outline-none transition-colors hover:bg-[rgba(111,121,108,0.11)] focus-visible:ring-2 focus-visible:ring-brandGreen/40 ${
                      item.current ? "bg-[rgba(88,96,86,0.1)] font-semibold" : ""
                    }`
                  : `rounded-r-xl px-4 py-3 text-[0.98rem] leading-snug outline-none ring-offset-[#F4EFE8] transition-colors focus-visible:ring-2 focus-visible:ring-brandGreen/40 focus-visible:ring-offset-2 ${
                      item.current
                        ? "border-l-[3px] border-brandGreen bg-[rgba(88,96,86,0.1)] font-semibold text-charcoal"
                        : "border-l-[3px] border-transparent font-medium text-charcoal hover:bg-[rgba(111,121,108,0.11)]"
                    }`
              }
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              {...(item.current ? { "aria-current": "page" as const } : {})}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    ) : null;

  if (variant === "mobile") {
    return (
      <div ref={rootRef} className="flex flex-col" onKeyDown={onKeyDown}>
        <button
          ref={buttonRef}
          type="button"
          className={`flex items-center justify-between gap-3 rounded-r-xl px-4 py-4 text-left text-[1.05rem] leading-snug outline-none ring-offset-[#F4EFE8] transition-colors focus-visible:ring-2 focus-visible:ring-brandGreen/40 focus-visible:ring-offset-2 sm:py-3.5 ${
            sectionActive
              ? "border-l-[3px] border-brandGreen bg-[rgba(88,96,86,0.1)] font-semibold text-charcoal"
              : "border-l-[3px] border-transparent font-medium text-charcoal hover:bg-[rgba(111,121,108,0.11)]"
          }`}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-controls={menuId}
          onClick={toggle}
        >
          <span>{navigation.festivities}</span>
          <Chevron open={open} />
        </button>
        {panel}
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="relative shrink-0"
      onMouseEnter={openFromHover}
      onMouseLeave={closeFromHover}
      onKeyDown={onKeyDown}
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !rootRef.current?.contains(next)) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`${deskClassName} cursor-pointer items-center gap-1.5 border-0 bg-transparent font-[inherit] ${sectionActive ? activeClassName : ""}`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={toggle}
      >
        {navigation.festivities}
        <Chevron open={open} />
      </button>
      {panel}
    </div>
  );
}
