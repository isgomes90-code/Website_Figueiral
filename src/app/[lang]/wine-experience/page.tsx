import type { Metadata } from "next";
import { ImageFeature } from "@/components/sections/ImageFeature";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { images } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  return pageMetadata({ ...dictionary.meta.pages.wine, path: "/wine-experience", lang: locale });
}

export default async function WineExperiencePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const wine = dictionary.wine;

  return (
    <>
      <section className="pt-36 pb-16 sm:pt-44">
        <div className="section-shell">
          <SectionIntro eyebrow={wine.intro.eyebrow} title={wine.intro.title} body={wine.intro.body} />
        </div>
      </section>
      <ImageFeature
        eyebrow={wine.feature.eyebrow}
        title={wine.feature.title}
        body={wine.feature.body}
        image={images.wineCellar}
        alt="Sommelier wine service at a premium Algarve restaurant"
        supportingImage="/images/wine/Vinho-detalhe-2.webp"
        supportingAlt="Detalhe de vinho no Restaurante Figueiral"
      />
      <section className="pb-24">
        <div className="section-shell grid gap-5 md:grid-cols-3">
          {wine.moments.map((moment, index) => (
            <MotionReveal key={moment} delay={index * 0.08} className="luxury-card rounded-[1.5rem] p-7">
              <p className="font-display text-5xl text-gold">0{index + 1}</p>
              <h2 className="mt-8 text-xl leading-8 text-charcoal">{moment}</h2>
            </MotionReveal>
          ))}
        </div>
      </section>
    </>
  );
}
