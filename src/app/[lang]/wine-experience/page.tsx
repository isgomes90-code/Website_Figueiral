import type { Metadata } from "next";
import { ImageFeature } from "@/components/sections/ImageFeature";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { wineExperienceImages } from "@/data/wine";
import { pageMetadata } from "@/lib/seo";
import { cardTitleClasses, displayFigureClasses } from "@/lib/sectionTitle";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  return pageMetadata({ ...dictionary.meta.pages.wine, path: "/wine-experience", lang: locale });
}

export default async function WineExperiencePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  const wine = dictionary.wine;
  const img = dictionary.seo.images;

  return (
    <>
      <section className="pt-36 pb-12 sm:pt-44 sm:pb-12">
        <div className="section-shell">
          <SectionIntro as="h1" eyebrow={wine.intro.eyebrow} title={wine.intro.title} body={wine.intro.body} />
        </div>
      </section>
      <ImageFeature
        eyebrow={wine.feature.eyebrow}
        title={wine.feature.title}
        body={wine.feature.body}
        image={wineExperienceImages.cellar}
        alt={img.wineCellar}
        supportingImage={wineExperienceImages.detail}
        supportingAlt={img.wineDetail}
      />
      <section className="pb-24">
        <div className="section-shell grid gap-5 md:grid-cols-3">
          {wine.moments.map((moment, index) => (
            <MotionReveal key={moment} delay={index * 0.08} className="luxury-card rounded-[1.5rem] p-7">
              <p className={`text-[2.75rem] text-gold sm:text-[3.25rem] ${displayFigureClasses}`}>0{index + 1}</p>
              <h3 className={`mt-8 text-charcoal ${cardTitleClasses}`}>{moment}</h3>
            </MotionReveal>
          ))}
        </div>
      </section>
    </>
  );
}
