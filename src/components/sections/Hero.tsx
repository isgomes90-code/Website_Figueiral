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

/** Narrativa: esplanada → fogo → mar → sala → assinatura */
const HERO_SLIDE_SRC = [
  "/images/hero/Esplanada-1.webp",
  "/images/hero/Preparacao-picanha.webp",
  "/images/hero/Camarao-grelha.webp",
  "/images/hero/Alinhamento-mesas.webp",
  "/images/hero/Chateaubriand-opt.webp"
] as const;

const SLIDE_COUNT = HERO_SLIDE_SRC.length;
const SLIDE_INTERVAL_MS = 6500;

/** Overlay estável entre slides — leitura consistente, menos dramático */
const readingOverlayStyle: CSSProperties = {
  background: `linear-gradient(
    92deg,
    rgba(20, 15, 12, 0.58) 0%,
    rgba(21, 17, 14, 0.42) 38%,
    rgba(20, 22, 19, 0.18) 66%,
    rgba(18, 16, 14, 0.04) 100%
  )`
};

/** Recorte por slide — esplanada ampla; mesas mais baixo no quadro; pratos com foco ao centro */
const SLIDE_OBJECT = [
  "object-cover object-[62%_42%]",
  "object-cover object-[center_48%]",
  "object-cover object-[center_45%]",
  "object-cover object-[center_74%]",
  "object-cover object-[center_52%]"
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

    let intervalId: number | undefined;

    const startSlideshow = () => {
      intervalId = window.setInterval(() => {
        setActiveSlide((i) => (i + 1) % SLIDE_COUNT);
      }, SLIDE_INTERVAL_MS);
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(startSlideshow, { timeout: 2500 });
    } else {
      timeoutId = setTimeout(startSlideshow, 1500);
    }

    return () => {
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <section className="grain hero-grain relative min-h-[88vh] max-h-[980px] overflow-hidden bg-[#453528] lg:min-h-[86vh]">
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

      <div className="section-shell relative z-10 flex min-h-[88vh] max-h-[980px] items-center pt-[8.25rem] pb-24 sm:pt-32 sm:pb-28 lg:min-h-[86vh] xl:pt-28 xl:pb-32">
        <div className="w-full max-w-[50rem]">
          <p
            className={`mb-5 text-gold sm:mb-6 ${editorialEyebrowClasses} tracking-[0.38em] sm:tracking-[0.4em]`}
            style={{ textShadow: "0 1px 8px rgba(10, 7, 5, 0.35)" }}
          >
            {hero.eyebrow}
          </p>
          <h1
            className={`${heroDisplayTitleClasses} text-cream`}
            style={{ textShadow: "0 1px 22px rgba(10, 7, 5, 0.42)" }}
          >
            {hero.title}
          </h1>
          <p
            className={`mt-8 max-w-[34rem] text-cream/[0.88] sm:mt-9 lg:mt-10 ${heroLeadClasses}`}
            style={{ textShadow: "0 1px 12px rgba(10, 7, 5, 0.38)" }}
          >
            {hero.subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:mt-10 sm:flex-row">
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
        <div className="section-shell pb-5 sm:pb-6">
          <div className="flex justify-center gap-2 sm:gap-2.5" role="group" aria-label={hero.slidesAria}>
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
        </div>
      </div>
    </section>
  );
}
