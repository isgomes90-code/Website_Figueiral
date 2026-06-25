"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useConsent } from "@/components/consent/ConsentProvider";
import type { Dictionary } from "@/i18n/getDictionary";
import type { ConsentPreferences } from "@/lib/consent";
import { localizedPath, type Locale } from "@/i18n/config";

type ConsentLabels = Dictionary["consent"];

function ToggleRow({
  id,
  title,
  description,
  checked,
  disabled,
  onChange
}: {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <div className="rounded-[1rem] border border-walnut/10 bg-cream/70 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <label htmlFor={id} className="text-[0.92rem] font-semibold text-charcoal">
            {title}
          </label>
          <p className="mt-1.5 text-[0.84rem] leading-relaxed text-walnut">{description}</p>
        </div>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-brandGreen disabled:opacity-70"
        />
      </div>
    </div>
  );
}

export function CookieBanner({
  labels,
  locale
}: {
  labels: ConsentLabels;
  locale: Locale;
}) {
  const {
    consent,
    showBanner,
    preferencesOpen,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    closePreferences,
    openPreferences
  } = useConsent();

  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (preferencesOpen) {
      setAnalytics(consent?.analytics ?? false);
      setMarketing(consent?.marketing ?? false);
    }
  }, [preferencesOpen, consent]);

  const saveCurrentPreferences = () => {
    const preferences: ConsentPreferences = { analytics, marketing };
    savePreferences(preferences);
  };

  if (preferencesOpen) {
    return (
      <div
        className="fixed inset-0 z-[120] flex items-end justify-center bg-charcoal/45 p-4 sm:items-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-preferences-title"
      >
        <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[1.35rem] border border-walnut/10 bg-paper p-6 shadow-luxury sm:p-8">
          <h2 id="cookie-preferences-title" className="font-display text-[1.65rem] text-charcoal">
            {labels.preferencesTitle}
          </h2>
          <p className="mt-3 text-[0.92rem] leading-relaxed text-walnut">{labels.preferencesIntro}</p>

          <div className="mt-6 space-y-3">
            <ToggleRow
              id="consent-necessary"
              title={labels.categories.necessary.title}
              description={labels.categories.necessary.description}
              checked
              disabled
            />
            <ToggleRow
              id="consent-analytics"
              title={labels.categories.analytics.title}
              description={labels.categories.analytics.description}
              checked={analytics}
              onChange={setAnalytics}
            />
            <ToggleRow
              id="consent-marketing"
              title={labels.categories.marketing.title}
              description={labels.categories.marketing.description}
              checked={marketing}
              onChange={setMarketing}
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={saveCurrentPreferences}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-brandGreen/35 bg-brandGreen px-6 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-cream transition hover:brightness-[1.03]"
            >
              {labels.savePreferences}
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-gold/35 bg-gold px-6 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-charcoal transition hover:brightness-[1.03]"
            >
              {labels.acceptAll}
            </button>
            <button
              type="button"
              onClick={closePreferences}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-walnut/15 px-6 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-charcoal transition hover:border-walnut/30"
            >
              {labels.close}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!showBanner) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[110] border-t border-walnut/10 bg-[rgba(248,243,236,0.97)] shadow-[0_-12px_40px_rgba(45,37,31,0.12)] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
    >
      <div className="section-shell py-5 sm:py-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-gold">
              {labels.eyebrow}
            </p>
            <h2 id="cookie-banner-title" className="mt-2 font-display text-[1.35rem] text-charcoal sm:text-[1.5rem]">
              {labels.bannerTitle}
            </h2>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-walnut">{labels.bannerBody}</p>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-walnut/85">
              {labels.bannerNote}{" "}
              <Link
                href={localizedPath(locale, "/privacy")}
                className="border-b border-brandGreen/35 text-charcoal transition hover:border-brandGreen/55"
              >
                {labels.privacyLink}
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
            <button
              type="button"
              onClick={acceptAll}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-brandGreen/35 bg-brandGreen px-6 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-cream transition hover:brightness-[1.03]"
            >
              {labels.acceptAll}
            </button>
            <button
              type="button"
              onClick={rejectNonEssential}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-walnut/15 px-6 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-charcoal transition hover:border-walnut/30"
            >
              {labels.rejectNonEssential}
            </button>
            <button
              type="button"
              onClick={openPreferences}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-walnut/15 px-6 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-charcoal transition hover:border-walnut/30"
            >
              {labels.managePreferences}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
