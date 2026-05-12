"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

const HERO_SLIDE_SRC = [
  "/images/hero/Preparacao-picanha.webp",
  "/images/hero/Lounge-bar.webp",
  "/images/wine/Vinho-detalhe-2.webp",
  "/images/people/Convicio-clientes-1.webp"
] as const;

const SLIDE_INTERVAL_MS = 6500;

const readingOverlayStyle: CSSProperties = {
  background: `linear-gradient(
    90deg,
    rgba(28, 18, 13, 0.78) 0%,
    rgba(28, 18, 13, 0.55) 38%,
    rgba(28, 18, 13, 0.2) 72%,
    rgba(28, 18, 13, 0.05) 100%
  )`
};

export function Hero({ dictionary, lang }: { dictionary: Dictionary; lang: Locale }) {
  const hero = dictionary.hero;
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = useMemo(() => {
    const alts = hero.slidesAlt;
    return HERO_SLIDE_SRC.map((src, i) => ({
      src,
      alt: alts[i] ?? hero.title
    }));
  }, [hero.slidesAlt, hero.title]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const id = window.setInterval(() => {
      setActiveSlide((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section className="grain hero-grain relative min-h-screen overflow-hidden bg-[#4a382c]">
      <div className="absolute inset-0 z-0" aria-hidden>
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-[1320ms] ease-in-out"
            style={{ opacity: activeSlide === i ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : "low"}
              loading={i === 0 ? "eager" : "lazy"}
              sizes="100vw"
              quality={i === 0 ? 82 : 68}
              className="pointer-events-none object-cover object-center saturate-[0.9]"
              aria-hidden={activeSlide !== i}
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2]" style={readingOverlayStyle} aria-hidden />

      <div
        className="absolute bottom-16 right-[8vw] z-[3] hidden h-[50vh] w-[24vw] rounded-t-full border border-cream/14 bg-cream/[0.056] shadow-[0_24px_54px_rgba(92,68,48,0.14)] lg:block"
        aria-hidden
      />

      <div className="section-shell relative z-10 flex min-h-screen items-center pt-40 pb-40 sm:pt-36 sm:pb-44 xl:pt-32 xl:pb-48">
        <div className="grid w-full gap-14 xl:grid-cols-[minmax(0,0.88fr)_minmax(16rem,0.32fr)] xl:items-end">
          <div className="max-w-[56rem]">
            <div
              className="box-border w-full rounded-[28px] border border-white/[0.16] p-8 shadow-[0_20px_50px_rgba(12,8,6,0.22)] sm:p-9"
              style={{ backgroundColor: "rgba(24, 16, 12, 0.28)" }}
            >
              <p className="mb-7 text-[0.68rem] font-semibold uppercase tracking-[0.44em] text-gold sm:mb-8">{hero.eyebrow}</p>
              <h1 className="font-display text-[2.95rem] leading-[1.04] text-cream text-balance sm:text-[4rem] lg:text-[5.05rem] xl:text-[5.55rem]">
                {hero.title}
              </h1>
              <p
                className="mt-8 max-w-[38rem] text-base leading-8 sm:mt-9 sm:text-[1.05rem] sm:leading-[1.75rem]"
                style={{
                  color: "rgba(246, 239, 230, 0.92)",
                  textShadow: "0 1px 18px rgba(12, 8, 6, 0.45)"
                }}
              >
                {hero.subtitle}
              </p>
              <div className="mt-11 flex flex-col gap-4 sm:mt-12 sm:flex-row">
                <LuxuryButton href={localizedPath(lang, "/reservations")}>{hero.primaryCta}</LuxuryButton>
                <LuxuryButton
                  href={localizedPath(lang, "/menu")}
                  variant="secondary"
                  className="border-cream/50 bg-cream/15 text-cream hover:bg-cream hover:text-charcoal"
                >
                  {hero.secondaryCta}
                </LuxuryButton>
              </div>
            </div>
          </div>
          <div className="hidden max-w-[18rem] rounded-[1.35rem] border border-cream/22 bg-cream/[0.14] px-6 py-7 shadow-[0_22px_60px_rgba(38,25,18,0.2)] xl:block">
            <p className="font-display text-[1.42rem] leading-[1.22] text-[rgba(246,239,230,0.94)]">{hero.sideTitle}</p>
            <p className="mt-5 text-[0.82rem] leading-[1.85] text-[rgba(246,239,230,0.82)]">{hero.sideText}</p>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="section-shell">
          <div className="flex justify-center gap-2 pb-4 sm:gap-2.5" role="tablist" aria-label={hero.slidesAria}>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={activeSlide === i}
                aria-label={`${i + 1} / ${slides.length}`}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#35261d] ${
                  activeSlide === i ? "w-8 bg-cream/90" : "w-1.5 bg-cream/35 hover:bg-cream/55"
                }`}
                onClick={() => setActiveSlide(i)}
              />
            ))}
          </div>
          <div className="hairline" />
          <div className="flex flex-col gap-3 py-5 text-[0.62rem] uppercase tracking-[0.3em] text-cream/55 sm:flex-row sm:justify-between">
            {hero.keywords.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
