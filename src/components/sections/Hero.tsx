import Image from "next/image";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export function Hero({ dictionary, lang }: { dictionary: Dictionary; lang: Locale }) {
  const hero = dictionary.hero;

  return (
    <section className="grain hero-grain relative min-h-screen overflow-hidden bg-[#4a382c]">
      <div className="absolute -inset-[8%]">
        <Image
          src="/images/hero/Preparacao-picanha.webp"
          alt="Preparacao da picanha no Restaurante Figueiral"
          fill
          priority={true}
          sizes="100vw"
          className="scale-[0.9] object-cover object-center opacity-[0.92] saturate-[0.9]"
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(156,121,87,0.1),transparent_26rem),linear-gradient(to_bottom,rgba(54,39,30,0.34),rgba(54,39,30,0.44)),linear-gradient(90deg,rgba(54,39,30,0.58),rgba(54,39,30,0.22),rgba(54,39,30,0.42))]" />
      <div className="absolute bottom-16 right-[8vw] hidden h-[50vh] w-[24vw] rounded-t-full border border-cream/14 bg-cream/[0.045] shadow-[0_24px_54px_rgba(92,68,48,0.14)] backdrop-blur-[2px] lg:block" />
      <div className="section-shell relative z-10 flex min-h-screen items-center pt-40 sm:pt-36 xl:pt-32">
        <div className="grid w-full gap-14 xl:grid-cols-[minmax(0,0.88fr)_minmax(16rem,0.32fr)] xl:items-end">
          <div className="max-w-[56rem]">
            <p className="mb-8 text-[0.68rem] font-semibold uppercase tracking-[0.44em] text-gold">
              {hero.eyebrow}
            </p>
            <h1 className="font-display text-[2.95rem] leading-[1.04] text-cream text-balance sm:text-[4rem] lg:text-[5.05rem] xl:text-[5.55rem]">
              {hero.title}
            </h1>
            <p className="mt-9 max-w-[38rem] text-base leading-8 text-cream/74 sm:text-[1.05rem]">
              {hero.subtitle}
            </p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <LuxuryButton href={localizedPath(lang, "/reservations")}>{hero.primaryCta}</LuxuryButton>
              <LuxuryButton href={localizedPath(lang, "/menu")} variant="secondary" className="border-cream/45 bg-cream/10 text-cream hover:bg-cream hover:text-charcoal">
                {hero.secondaryCta}
              </LuxuryButton>
            </div>
          </div>
          <div className="hidden max-w-[18rem] rounded-[1.35rem] border border-cream/18 bg-cream/[0.105] px-6 py-7 shadow-[0_22px_60px_rgba(38,25,18,0.16)] backdrop-blur-[3px] xl:block">
            <p className="font-display text-[1.42rem] leading-[1.22] text-cream/92">
              {hero.sideTitle}
            </p>
            <p className="mt-5 text-[0.82rem] leading-[1.85] text-cream/68">
              {hero.sideText}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="section-shell">
          <div className="hairline" />
          <div className="flex flex-col gap-3 py-5 text-[0.62rem] uppercase tracking-[0.3em] text-cream/42 sm:flex-row sm:justify-between">
            {hero.keywords.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
