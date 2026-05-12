import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { AtmosphereMoment } from "@/components/sections/AtmosphereMoment";
import { ImageFeature } from "@/components/sections/ImageFeature";
import { Reviews } from "@/components/sections/Reviews";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, localizedPath, type Locale } from "@/i18n/config";
import { images } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const highlightImages = [
  "/images/hero/Preparacao-picanha.webp",
  "/images/wine/Vinho-garrafeira.webp",
  "/images/terrace/Esplanada-1.webp",
  "/images/people/Convicio-clientes-1.webp"
];

/** Altura fixa da imagem em todos os cards — bases do bloco alinham na grelha. */
const HIGHLIGHT_IMAGE_BLOCK = "relative h-[12rem] shrink-0 overflow-hidden sm:h-[12.75rem] lg:h-[12.75rem]";

/** Desnível apenas no topo, em caixas à mesma altura (bases alinhadas). */
const pillarTopBreath = ["lg:pt-0", "lg:pt-[0.4rem]", "lg:pt-2", "lg:pt-1"] as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);

  return pageMetadata({
    title: dictionary.meta.homeTitle,
    description: dictionary.meta.homeDescription,
    lang: locale
  });
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  const home = dictionary.home;

  return (
    <>
      <Hero dictionary={dictionary} lang={locale} />
      <section className="editorial-paper relative py-[4.75rem] sm:py-[6.25rem] lg:py-[6.75rem]">
        <div className="section-shell relative z-10">
          <SectionIntro
            eyebrow={home.intro.eyebrow}
            title={home.intro.title}
            body={home.intro.body}
            align="center"
          />
          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-7 sm:mt-24 sm:grid-cols-2 sm:items-stretch sm:gap-8 lg:mt-28 lg:grid-cols-4 lg:gap-7">
            {home.highlights.map((item, index) => (
              <MotionReveal
                key={item}
                delay={index * 0.07}
                className={`group flex h-full flex-col overflow-hidden rounded-[1.38rem] border border-walnut/[0.08] bg-[linear-gradient(168deg,rgba(252,248,242,0.78),rgba(241,231,217,0.42))] shadow-[0_16px_48px_rgba(58,44,34,0.06)] backdrop-blur-[1px] transition-[box-shadow,border-color] duration-700 ease-out hover:border-walnut/[0.13] hover:shadow-[0_22px_58px_rgba(58,44,34,0.089)] ${pillarTopBreath[index]}`}
              >
                <div className={`${HIGHLIGHT_IMAGE_BLOCK}`}>
                  <Image
                    src={highlightImages[index]}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className={`object-cover brightness-[1.03] contrast-[0.94] saturate-[0.88] sepia-[0.06] transition duration-[1350ms] ease-out group-hover:scale-[1.018] ${index === 1 ? "object-[center_18%]" : index === 2 ? "object-[center_52%]" : "object-center"}`}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(252,246,238,0.05),rgba(52,41,34,0.16))]" />
                </div>
                <div className="flex flex-1 flex-col px-8 pb-[1.85rem] pt-7 sm:px-9 sm:pb-[2.1rem] sm:pt-8">
                  <span className="font-display text-[1.05rem] font-medium tabular-nums tracking-[0.26em] text-gold/[0.82] sm:text-[1.2rem] sm:tracking-[0.23em]">
                    0{index + 1}
                  </span>
                  <p className="mt-4 grow text-[1.02rem] font-semibold leading-[1.71] tracking-[0.015em] text-walnut sm:mt-5 sm:text-[1.06rem] sm:leading-[1.76] max-sm:max-w-[22rem] max-sm:text-pretty lg:max-w-none text-balance">
                    {item}
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dusk grain relative py-[5rem] sm:py-[7rem] lg:py-[7.5rem]" aria-labelledby="home-statement">
        <div className="section-shell">
          <MotionReveal className="mx-auto max-w-5xl text-center">
            <div className="hairline-dusk mb-[2.85rem]" />
            <p id="home-statement" className="font-display text-[1.9rem] leading-[1.18] tracking-[-0.015em] text-cream/[0.94] text-balance sm:text-[3.05rem] sm:leading-[1.07] lg:text-[3.55rem]">
              {home.statement.text}
            </p>
            <p className="mx-auto mt-[1.75rem] max-w-2xl text-[0.68rem] uppercase leading-[1.85] tracking-[0.38em] text-gold/[0.58] sm:mt-[2.125rem] sm:text-[0.7rem]">
              {home.statement.caption}
            </p>
          </MotionReveal>
        </div>
      </section>

      <AtmosphereMoment
        eyebrow={home.atmosphere.eyebrow}
        line={home.atmosphere.line}
        imageAlt={home.atmosphere.imageAlt}
        imageSrc="/images/hero/Alinhamento-mesas.webp"
      />

      <ImageFeature
        eyebrow={home.meat.eyebrow}
        title={home.meat.title}
        body={home.meat.body}
        image={images.picanha}
        alt="Premium grilled steak and picanha experience"
        note={home.meat.note}
        supportingImage={images.fire}
        supportingAlt="Camarao ao alho preparado com fogo no Figueiral"
        tone="warm"
        composition="panorama"
      />

      <ImageFeature
        eyebrow={home.wine.eyebrow}
        title={home.wine.title}
        body={home.wine.body}
        image={images.wine}
        alt="Wine service and cellar atmosphere"
        note={home.wine.note}
        supportingImage="/images/wine/Vinho-detalhe-2.webp"
        supportingAlt="Detalhe de garrafa de vinho no Figueiral"
        reverse
        tone="linen"
        composition="standard"
        imageClassName="object-[center_20%] sm:object-[center_16%]"
      />

      <section className="section-linen-breath relative py-[4.5rem] sm:py-[7rem] lg:py-[7.25rem]">
        <div className="section-shell">
          <MotionReveal className="atmospheric-panel rounded-[2.05rem] px-8 py-14 sm:rounded-[2.2rem] sm:px-12 sm:py-18 lg:px-[3.65rem] lg:py-[4.85rem]">
            <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-[4.25rem]">
              <div className="order-1 max-w-xl lg:max-w-none">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.36em] text-gold/80">{home.legacy.eyebrow}</p>
                <p className="mt-[1.375rem] font-display text-[4.95rem] leading-none tracking-[-0.03em] text-charcoal/[0.95] sm:text-[6.85rem] sm:tracking-tight">1986</p>
                <h2 className="mt-9 max-w-[46rem] font-display text-[2.15rem] leading-[1.1] tracking-[-0.015em] text-charcoal text-balance sm:text-[2.95rem] sm:leading-[1.05] lg:text-[3.2rem]">
                  {home.legacy.title}
                </h2>
                <p className="mt-7 max-w-2xl text-[0.95rem] leading-[1.82] tracking-[0.01em] text-walnut/[0.95] sm:text-[1.02rem] sm:leading-[1.85]">
                  {home.legacy.body}
                </p>
              </div>
              <div className="order-2 lg:pl-2">
                <figure className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-walnut/[0.09] shadow-[0_26px_64px_rgba(58,44,34,0.11)] sm:aspect-[5/6] sm:rounded-[2.05rem] lg:aspect-[11/13] lg:rounded-[38px]">
                    <Image
                      src={images.legacyOwners}
                      alt={home.legacy.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 42vw, 90vw"
                      className="object-cover object-[50%_32%]"
                      loading="lazy"
                    />
                  </div>
                </figure>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <ImageFeature
        eyebrow={home.terrace.eyebrow}
        title={home.terrace.title}
        body={home.terrace.body}
        image={images.terrace}
        alt="Mediterranean restaurant terrace atmosphere"
        supportingImage={images.terraceAlt}
        supportingAlt="Outra perspetiva da esplanada do Figueiral"
        quiet
        tone="linen"
        composition="intimate"
      />

      <Reviews dictionary={dictionary} />

      <section className="section-linen-breath py-[5rem] sm:py-[8rem] lg:py-[9rem]">
        <div className="section-shell">
          <MotionReveal className="section-finale-panel rounded-[2rem] px-8 py-16 text-center sm:rounded-[2.35rem] sm:px-14 sm:py-[5.25rem] lg:px-20 lg:py-[6rem]">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-gold/[0.78]">{home.cta.eyebrow}</p>
            <h2 className="mx-auto mt-7 max-w-[34rem] font-display text-[2.15rem] leading-[1.12] tracking-[-0.015em] text-cream/[0.94] text-balance sm:mt-[2rem] sm:max-w-[40rem] sm:text-[2.95rem] sm:leading-[1.07] lg:text-[3.35rem]">
              {home.cta.title}
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-[0.95rem] leading-[1.82] tracking-[0.012em] text-cream/[0.58] sm:mt-[2.125rem] sm:text-[1.02rem] sm:leading-[1.87] lg:max-w-[38rem]">
              {home.cta.body}
            </p>
            <div className="mt-[2.625rem] sm:mt-[2.85rem]">
              <LuxuryButton
                href={localizedPath(locale, "/reservations")}
                variant="secondary"
                className="border-cream/45 bg-cream/92 text-charcoal hover:-translate-y-0.5 hover:border-gold/[0.75] hover:bg-cream hover:text-charcoal focus:ring-offset-charcoal sm:tracking-[0.28em]"
              >
                {dictionary.navigation.reserveTable}
              </LuxuryButton>
            </div>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}
