import type { Metadata } from "next";
import Image from "next/image";
import { ImageFeature } from "@/components/sections/ImageFeature";
import { PressEditorial } from "@/components/sections/PressEditorial";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { images } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { bodyTextClasses, cardTitleClasses } from "@/lib/sectionTitle";
import { imageToneEditorial } from "@/lib/imageTone";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  return pageMetadata({ ...dictionary.meta.pages.about, path: "/about", lang: locale });
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  const about = dictionary.about;
  const img = dictionary.seo.images;

  return (
    <>
      <section className="pt-36 pb-24 sm:pt-44">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.78fr_1.05fr] lg:items-end">
          <SectionIntro as="h1" eyebrow={about.intro.eyebrow} title={about.intro.title} body={about.intro.body} />
          <MotionReveal delay={0.08} className="relative">
            <figure className="relative min-h-[26rem] overflow-hidden rounded-[2rem] border border-walnut/[0.09] shadow-[0_22px_56px_rgba(58,44,34,0.1)] sm:min-h-[32rem] lg:min-h-[34rem]">
              <Image
                src={images.legacyOwners}
                alt={img.legacyOwners}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className={`object-cover object-[52%_50%] sm:object-[54%_50%] ${imageToneEditorial}`}
                priority
              />
            </figure>
          </MotionReveal>
        </div>
      </section>
      <ImageFeature
        eyebrow={about.feature.eyebrow}
        title={about.feature.title}
        body={about.feature.body}
        image={images.family}
        alt={img.aboutFamily}
        supportingImage="/images/people/Rececao-clientes-opt.webp"
        supportingAlt={img.aboutReception}
        faces={about.feature.faces}
        facesImageAltSuffix={about.feature.facesAltSuffix}
      />
      <section className="pb-20 sm:pb-24">
        <div className="section-shell grid gap-6 lg:grid-cols-3">
          {about.cards.map((card, index) => (
            <MotionReveal key={card.title} delay={index * 0.08} className="luxury-card rounded-[1.5rem] p-8">
              <h2 className={`text-charcoal ${cardTitleClasses}`}>{card.title}</h2>
              <p className={`mt-5 text-walnut ${bodyTextClasses}`}>{card.body}</p>
            </MotionReveal>
          ))}
        </div>
      </section>
      <PressEditorial dictionary={dictionary} lang={locale} />
    </>
  );
}
