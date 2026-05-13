"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

/** Narrativa: fogo → sala/mesas → vinho → hospitalidade */
const HERO_SLIDE_SRC = [
  "/images/hero/Preparacao-picanha.webp",
  "/images/hero/Alinhamento-mesas.webp",
  "/images/wine/Vinho-detalhe-2.webp",
  "/images/people/Convicio-clientes-1.webp"
] as const;

const SLIDE_INTERVAL_MS = 6500;

/** Overlay estável entre slides — leitura consistente sem saltos bruscos de luminosidade */
const readingOverlayStyle: CSSProperties = {
  background: `linear-gradient(
    92deg,
    rgba(26, 17, 13, 0.76) 0%,
    rgba(26, 17, 13, 0.52) 40%,
    rgba(26, 17, 13, 0.22) 68%,
    rgba(26, 17, 13, 0.06) 100%
  )`
};

/** Recorte por slide — mesas mais baixo no quadro; vinho com foco ao centro-baixo */
const SLIDE_OBJECT = [
  "object-cover object-[center_48%]",
  "object-cover object-[center_74%]",
  "object-cover object-[center_38%]",
  "object-cover object-[center_42%]"
] as const;

const slideImageTreatment =
  "pointer-events-none brightness-[0.93] contrast-[0.96] saturate-[0.9]";

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
    <section className="grain hero-grain relative min-h-screen overflow-hidden bg-[#453528]">
      <div className="absolute inset-0 z-0" aria-hidden>
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
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
              className={`${SLIDE_OBJECT[i]} ${slideImageTreatment}`}
              aria-hidden={activeSlide !== i}
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2]" style={readingOverlayStyle} aria-hidden />

      <div className="section-shell relative z-10 flex min-h-screen items-center pt-36 pb-36 sm:pt-32 sm:pb-40 xl:pt-28 xl:pb-44">
        <div className="w-full max-w-[54rem]">
          <div
            className="box-border w-full rounded-[26px] border border-white/[0.14] p-8 shadow-[0_18px_44px_rgba(12,8,6,0.18)] sm:rounded-[28px] sm:p-9"
            style={{ backgroundColor: "rgba(22, 15, 11, 0.34)" }}
          >
            <p className="mb-7 text-[0.68rem] font-semibold uppercase tracking-[0.44em] text-gold sm:mb-8">{hero.eyebrow}</p>
            <h1 className="font-display text-[2.95rem] leading-[1.04] text-cream text-balance sm:text-[4rem] lg:text-[5.05rem] xl:text-[5.35rem]">
              {hero.title}
            </h1>
            <p
              className="mt-8 max-w-[40rem] text-base leading-8 sm:mt-9 sm:text-[1.05rem] sm:leading-[1.75rem]"
              style={{
                color: "rgba(246, 239, 230, 0.93)",
                textShadow: "0 1px 14px rgba(12, 8, 6, 0.42)"
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
                  activeSlide === i ? "w-8 bg-cream/90" : "w-1.5 bg-cream/38 hover:bg-cream/58"
                }`}
                onClick={() => setActiveSlide(i)}
              />
            ))}
          </div>
          <div className="hairline" />
          <div className="flex flex-col gap-3 py-5 text-[0.62rem] uppercase tracking-[0.3em] text-cream/58 sm:flex-row sm:justify-between">
            {hero.keywords.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
