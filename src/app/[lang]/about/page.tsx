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
  return pageMetadata({ ...dictionary.meta.pages.about, path: "/about", lang: locale });
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const about = dictionary.about;

  return (
    <>
      <section className="pt-36 pb-16 sm:pt-44">
        <div className="section-shell">
          <SectionIntro eyebrow={about.intro.eyebrow} title={about.intro.title} body={about.intro.body} />
        </div>
      </section>
      <ImageFeature
        eyebrow={about.feature.eyebrow}
        title={about.feature.title}
        body={about.feature.body}
        image={images.family}
        alt="Family hospitality at Restaurante Figueiral"
        supportingImage="/images/people/Rececao-clientes.webp"
        supportingAlt="Rececao de clientes no Restaurante Figueiral"
      />
      <section className="pb-24">
        <div className="section-shell grid gap-6 lg:grid-cols-3">
          {about.cards.map((card, index) => (
            <MotionReveal key={card.title} delay={index * 0.08} className="luxury-card rounded-[1.5rem] p-8">
              <h2 className="font-display text-3xl text-charcoal">{card.title}</h2>
              <p className="mt-5 text-sm leading-7 text-walnut">{card.body}</p>
            </MotionReveal>
          ))}
        </div>
      </section>
    </>
  );
}
