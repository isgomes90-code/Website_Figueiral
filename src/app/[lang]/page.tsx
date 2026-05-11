import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
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
  "/images/food/Picanha-grelha.jpg",
  "/images/wine/Vinho-garrafeira.JPG",
  "/images/terrace/Esplanada-1.JPG",
  "/images/people/Convicio-clientes-2.jpg"
];

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
      <section className="relative py-20 sm:py-32">
        <div className="section-shell">
          <SectionIntro
            eyebrow={home.intro.eyebrow}
            title={home.intro.title}
            body={home.intro.body}
            align="center"
          />
          <div className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {home.highlights.map((item, index) => (
              <MotionReveal
                key={item}
                delay={index * 0.07}
                className={`luxury-card overflow-hidden rounded-[1.55rem] ${index % 2 === 1 ? "lg:mt-8" : ""}`}
              >
                <div className="relative h-40">
                  <Image
                    src={highlightImages[index]}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/72 to-transparent" />
                </div>
                <div className="p-6 sm:p-7">
                  <span className="font-display text-4xl text-gold/85">0{index + 1}</span>
                  <p className="mt-7 text-base leading-7 text-cream/75">{item}</p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>
      <section className="py-10 sm:py-16">
        <div className="section-shell">
          <MotionReveal className="mx-auto max-w-5xl text-center">
            <div className="hairline mb-12" />
            <p className="font-display text-4xl leading-tight text-cream/90 text-balance sm:text-6xl">
              {home.statement.text}
            </p>
            <p className="mx-auto mt-7 max-w-2xl text-sm uppercase leading-7 tracking-[0.26em] text-gold/70">
              {home.statement.caption}
            </p>
          </MotionReveal>
        </div>
      </section>
      <ImageFeature
        eyebrow={home.meat.eyebrow}
        title={home.meat.title}
        body={home.meat.body}
        image={images.picanha}
        alt="Premium grilled steak and picanha experience"
        note={home.meat.note}
        supportingImage={images.fire}
        supportingAlt="Camarao ao alho preparado com fogo no Figueiral"
      />
      <ImageFeature
        eyebrow={home.wine.eyebrow}
        title={home.wine.title}
        body={home.wine.body}
        image={images.wine}
        alt="Wine service and cellar atmosphere"
        note={home.wine.note}
        supportingImage="/images/wine/Vinho-detalhe-2.jpg"
        supportingAlt="Detalhe de garrafa de vinho no Figueiral"
        reverse
      />
      <section className="py-14 sm:py-24">
        <div className="section-shell">
          <MotionReveal className="atmospheric-panel rounded-[2.2rem] px-6 py-14 shadow-[0_34px_100px_rgba(0,0,0,0.34)] sm:px-12 lg:px-16">
            <div className="grid gap-12 lg:grid-cols-[0.62fr_1fr] lg:items-end">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-gold/85">{home.legacy.eyebrow}</p>
                <p className="mt-5 font-display text-7xl leading-none text-cream sm:text-8xl">1986</p>
              </div>
              <div>
                <h2 className="font-display text-4xl leading-tight text-cream text-balance sm:text-5xl">
                  {home.legacy.title}
                </h2>
                <p className="mt-7 max-w-2xl text-base leading-8 text-cream/70">{home.legacy.body}</p>
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
      />
      <Reviews dictionary={dictionary} />
      <section className="py-20 sm:py-32">
        <div className="section-shell">
          <MotionReveal className="atmospheric-panel rounded-[2.4rem] px-6 py-16 text-center shadow-[0_34px_100px_rgba(0,0,0,0.34)] sm:px-12 sm:py-20">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-gold/85">{home.cta.eyebrow}</p>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl leading-tight text-cream text-balance sm:text-6xl">
              {home.cta.title}
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-cream/60">{home.cta.body}</p>
            <div className="mt-10">
              <LuxuryButton href={localizedPath(locale, "/reservations")}>{dictionary.navigation.reserveTable}</LuxuryButton>
            </div>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}
