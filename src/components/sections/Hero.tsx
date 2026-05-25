"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { editorialEyebrowClasses, heroDisplayTitleClasses, heroLeadClasses } from "@/lib/sectionTitle";
import { imageToneHero } from "@/lib/imageTone";
import { heroSlideBlurs } from "@/lib/imagePlaceholders";

/** Narrativa: fogo → sala/mesas → vinho → hospitalidade */
const HERO_SLIDE_SRC = [
  "/images/hero/Preparacao-picanha.webp",
  "/images/hero/Alinhamento-mesas.webp",
  "/images/wine/Vinho-detalhe-2.webp",
  "/images/people/Convicio-clientes-1.webp"
] as const;

const SLIDE_COUNT = HERO_SLIDE_SRC.length;
const SLIDE_INTERVAL_MS = 6500;

/** Overlay estável entre slides — leitura consistente sem excesso de escuridão */
const readingOverlayStyle: CSSProperties = {
  background: `linear-gradient(
    92deg,
    rgba(20, 15, 12, 0.78) 0%,
    rgba(21, 17, 14, 0.58) 38%,
    rgba(20, 22, 19, 0.28) 66%,
    rgba(18, 16, 14, 0.06) 100%
  )`
};

/** Recorte por slide — mesas mais baixo no quadro; vinho com foco ao centro-baixo */
const SLIDE_OBJECT = [
  "object-cover object-[center_48%]",
  "object-cover object-[center_74%]",
  "object-cover object-[center_38%]",
  "object-cover object-[center_42%]"
] as const;

export function Hero({
  hero,
  lang,
  slideAlts
}: {
  hero: Dictionary["hero"];
  lang: Locale;
  slideAlts: string[];
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const nextSlide = (activeSlide + 1) % SLIDE_COUNT;
  const visibleSlides = activeSlide === nextSlide ? [activeSlide] : [activeSlide, nextSlide];

  useEffect(() => {
    if (SLIDE_COUNT <= 1) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const id = window.setInterval(() => {
      setActiveSlide((i) => (i + 1) % SLIDE_COUNT);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="grain hero-grain relative min-h-screen overflow-hidden bg-[#453528]">
      <div className="absolute inset-0 z-0" aria-hidden>
        {visibleSlides.map((i) => (
          <div
            key={HERO_SLIDE_SRC[i]}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
            style={{ opacity: activeSlide === i ? 1 : 0 }}
          >
            <Image
              src={HERO_SLIDE_SRC[i]}
              alt={slideAlts[i] ?? hero.slidesAlt[i] ?? ""}
              fill
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : "auto"}
              loading={i === 0 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL={heroSlideBlurs[i] ?? heroSlideBlurs[0]}
              sizes="100vw"
              quality={i === 0 ? 72 : 68}
              className={`${SLIDE_OBJECT[i]} ${imageToneHero}`}
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2]" style={readingOverlayStyle} aria-hidden />

      <div className="section-shell relative z-10 flex min-h-screen items-center pt-[8.75rem] pb-32 sm:pt-36 sm:pb-36 xl:pt-32 xl:pb-44">
        <div className="w-full max-w-[54rem]">
          <p
            className={`mb-6 text-gold sm:mb-7 ${editorialEyebrowClasses} tracking-[0.38em] sm:tracking-[0.4em]`}
            style={{ textShadow: "0 1px 12px rgba(10, 7, 5, 0.55)" }}
          >
            {hero.eyebrow}
          </p>
          <h1
            className={`${heroDisplayTitleClasses} text-cream`}
            style={{ textShadow: "0 2px 32px rgba(10, 7, 5, 0.58), 0 1px 3px rgba(10, 7, 5, 0.42)" }}
          >
            {hero.title}
          </h1>
          <p
            className={`mt-10 max-w-[38rem] text-cream/[0.9] sm:mt-12 lg:mt-14 ${heroLeadClasses}`}
            style={{
              textShadow: "0 1px 18px rgba(10, 7, 5, 0.62)"
            }}
          >
            {hero.subtitle}
          </p>
          <div className="mt-11 flex flex-col gap-4 sm:mt-12 sm:flex-row">
            <LuxuryButton
              href={localizedPath(lang, "/reservations")}
              className="border-[1.5px] border-cream/80 bg-[rgba(156,121,87,1)] shadow-[0_16px_38px_rgba(10,7,5,0.55)] hover:border-cream"
            >
              {hero.primaryCta}
            </LuxuryButton>
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

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="section-shell">
          <div className="flex justify-center gap-2 pb-4 sm:gap-2.5" role="group" aria-label={hero.slidesAria}>
            {HERO_SLIDE_SRC.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={hero.slidesAlt[i] ?? `${i + 1} / ${SLIDE_COUNT}`}
                aria-current={activeSlide === i}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-sage/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#35261d] ${
                  activeSlide === i ? "w-8 bg-cream/90 ring-1 ring-brandGreen/28" : "w-1.5 bg-cream/38 hover:bg-sage/48"
                }`}
                onClick={() => setActiveSlide(i)}
              />
            ))}
          </div>
          <div className="hairline" />
          <div className="flex flex-col gap-3 py-5 text-[0.62rem] uppercase tracking-[0.3em] text-cream/58 sm:flex-row sm:justify-between">
            {hero.keywords.map((keyword, i) => (
              <span key={keyword} className={i === 1 ? "sm:text-center text-sage/85" : undefined}>
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
