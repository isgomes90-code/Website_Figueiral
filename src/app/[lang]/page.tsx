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
import { images, homeHighlightImages } from "@/lib/site";
import {
  bodyLeadClasses,
  displayFigureClasses,
  editorialEyebrowClasses,
  highlightCardTitleClasses,
  sectionTitleClasses,
  statementTitleClasses
} from "@/lib/sectionTitle";
import { imageToneEditorial } from "@/lib/imageTone";
import { pageMetadata } from "@/lib/seo";

/** Altura fixa da imagem em todos os cards — bases do bloco alinham na grelha. */
const HIGHLIGHT_IMAGE_BLOCK = "relative h-[11.5rem] shrink-0 overflow-hidden sm:h-[12rem] lg:h-[12rem]";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);

  return pageMetadata({
    title: dictionary.meta.homeTitle,
    description: dictionary.meta.homeDescription,
    keywords: dictionary.meta.homeKeywords,
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
      <Hero hero={dictionary.hero} lang={locale} slideAlts={dictionary.seo.images.heroSlides} />
      <section className="editorial-paper relative py-[3.25rem] sm:py-[4.5rem] lg:py-[5rem]">
        <div className="section-shell relative z-10">
          <SectionIntro
            eyebrow={home.intro.eyebrow}
            title={home.intro.title}
            body={home.intro.body}
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 sm:items-stretch sm:gap-7 lg:mt-20 lg:grid-cols-4 lg:gap-6">
            {home.highlights.map((item, index) => (
              <MotionReveal
                key={item}
                delay={index * 0.07}
                className="group flex h-full flex-col overflow-hidden rounded-[1.38rem] border border-brandGreen/[0.07] bg-[linear-gradient(168deg,rgba(252,248,242,0.82),rgba(241,231,217,0.45))] shadow-[0_14px_42px_rgba(58,44,34,0.055)] transition-[box-shadow,border-color] duration-700 ease-out hover:border-brandGreen/[0.16] hover:shadow-[0_20px_52px_rgba(58,44,34,0.078)]"
              >
                <div className={`${HIGHLIGHT_IMAGE_BLOCK}`}>
                  <Image
                    src={homeHighlightImages[index]}
                    alt={dictionary.seo.images.highlightCards[index] ?? ""}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className={`object-cover ${imageToneEditorial} transition duration-[1350ms] ease-out group-hover:scale-[1.018] ${index === 0 ? "object-[center_48%]" : index === 1 ? "object-[center_22%]" : index === 2 ? "object-[center_72%]" : "object-[center_46%]"}`}
                    loading="lazy"
                    quality={72}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(252,246,238,0.05),rgba(52,41,34,0.16))]" />
                </div>
                <div className="flex flex-1 flex-col px-7 pb-6 pt-6 sm:px-8 sm:pb-7 sm:pt-7">
                  <span
                    className={`text-[1.1rem] text-gold/[0.88] tracking-[0.2em] sm:text-[1.22rem] ${displayFigureClasses}`}
                  >
                    0{index + 1}
                  </span>
                  <p
                    className={`mt-4 flex-1 text-walnut sm:mt-5 max-sm:max-w-[22rem] max-sm:text-pretty lg:max-w-none text-balance ${highlightCardTitleClasses}`}
                  >
                    {item}
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dusk grain relative py-[3.5rem] sm:py-[5rem] lg:py-[5.5rem]" aria-labelledby="home-statement">
        <div className="section-shell">
          <MotionReveal className="mx-auto max-w-5xl text-center">
            <div className="hairline-dusk mb-8 sm:mb-10" />
            <h2 id="home-statement" className={`${statementTitleClasses} text-cream/[0.94]`}>
              {home.statement.text}
            </h2>
            <p className="mx-auto mt-[1.75rem] max-w-2xl text-[0.73rem] font-semibold uppercase leading-[1.92] tracking-[0.4em] text-gold/[0.76] sm:mt-[2.125rem] sm:text-[0.78rem] sm:tracking-[0.38em] lg:max-w-[46rem]">
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
        alt={dictionary.seo.images.picanhaFeature}
        note={home.meat.note}
        supportingImage="/images/food/Picanha-grelha-1.webp"
        supportingAlt={dictionary.seo.images.picanhaSupporting}
        contextLink={{
          ...home.meat.contextLink,
          href: localizedPath(locale, "/best-picanha-algarve")
        }}
        tone="warm"
        composition="panorama"
        density="compact"
      />

      <ImageFeature
        eyebrow={home.wine.eyebrow}
        title={home.wine.title}
        body={home.wine.body}
        image={images.wine}
        alt={dictionary.seo.images.wineFeature}
        note={home.wine.note}
        contextLink={{
          ...home.wine.contextLink,
          href: localizedPath(locale, "/wine-experience-algarve")
        }}
        tone="linen"
        composition="standard"
        layout="stacked"
        density="compact"
        imageClassName="object-[center_20%] sm:object-[center_16%]"
      />

      <section className="section-linen-breath relative py-[3rem] sm:py-[4.5rem] lg:py-[5rem]">
        <div className="section-shell">
          <MotionReveal className="atmospheric-panel rounded-[2.05rem] px-8 py-11 sm:rounded-[2.2rem] sm:px-12 sm:py-14 lg:px-[3.35rem] lg:py-[3.75rem]">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-start lg:gap-[2.75rem] xl:gap-[3.25rem]">
              <div className="order-1 max-w-xl border-l-[3px] border-brandGreen/[0.22] pl-5 sm:pl-6 lg:max-w-none lg:border-l-0 lg:pl-0">
                <p className={`text-gold/80 ${editorialEyebrowClasses}`}>{home.legacy.eyebrow}</p>
                <p className={`mt-[1.375rem] text-[4.5rem] text-charcoal/[0.95] sm:text-[6.25rem] ${displayFigureClasses}`}>1986</p>
                <h2 className={`mt-9 max-w-[46rem] text-charcoal ${sectionTitleClasses}`}>
                  {home.legacy.title}
                </h2>
                <p className={`mt-7 max-w-2xl tracking-[0.008em] text-walnut/[0.94] sm:mt-[1.875rem] ${bodyLeadClasses}`}>
                  {home.legacy.body}
                </p>
              </div>
              <div className="order-2 lg:pl-0 xl:pl-2">
                <figure className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
                  <div className="relative aspect-[5/6] overflow-hidden rounded-[2rem] border border-walnut/[0.09] shadow-[0_22px_56px_rgba(58,44,34,0.1)] ring-1 ring-inset ring-brandGreen/[0.07] sm:aspect-[6/7] sm:rounded-[2.05rem] lg:aspect-[7/9] lg:rounded-[38px]">
                    <Image
                      src={images.legacyOwners}
                      alt={dictionary.seo.images.legacyOwners}
                      fill
                      sizes="(min-width: 1024px) 38vw, 90vw"
                      className="object-cover object-[52%_50%] sm:object-[54%_50%] lg:object-[57%_48%]"
                      loading="lazy"
                    />
                  </div>
                </figure>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <Reviews dictionary={dictionary} />

      <section className="section-linen-breath py-[3.5rem] sm:py-[5rem] lg:py-[5.5rem]">
        <div className="section-shell">
          <MotionReveal className="section-finale-panel rounded-[2rem] px-8 py-14 text-center sm:rounded-[2.35rem] sm:px-14 sm:py-[4.25rem] lg:px-20 lg:py-[4.75rem]">
            <p className={`text-gold/[0.78] ${editorialEyebrowClasses}`}>{home.cta.eyebrow}</p>
            <h2 className={`mx-auto mt-7 max-w-[34rem] text-cream/[0.94] sm:mt-[2rem] sm:max-w-[40rem] ${sectionTitleClasses}`}>
              {home.cta.title}
            </h2>
            <p className={`mx-auto mt-8 max-w-2xl tracking-[0.011em] text-cream/[0.62] sm:mt-[2.125rem] lg:max-w-[38rem] ${bodyLeadClasses}`}>
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
