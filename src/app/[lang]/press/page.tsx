import type { Metadata } from "next";
import Image from "next/image";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { sectionTitleClasses } from "@/lib/sectionTitle";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  return pageMetadata({ ...dictionary.meta.pages.press, path: "/press", lang: locale });
}

export default async function PressPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const press = dictionary.press;

  return (
    <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44">
      <Image src="/images/wine/Vinho-detalhe-2.webp" alt="" fill sizes="100vw" className="object-cover opacity-15" />
      <div className="absolute inset-0 bg-paper/88" />
      <div className="section-shell relative">
        <SectionIntro eyebrow={press.intro.eyebrow} title={press.intro.title} body={press.intro.body} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {press.cards.map((title, index) => (
            <MotionReveal key={title} delay={index * 0.07} className="luxury-card rounded-[1.7rem] p-8">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold">{press.archive} 0{index + 1}</p>
              <h2 className={`mt-8 text-charcoal ${sectionTitleClasses}`}>{title}</h2>
              <p className="mt-5 text-sm leading-7 text-walnut">{press.cardBody}</p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
