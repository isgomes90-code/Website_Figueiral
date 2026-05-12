import type { Metadata } from "next";
import Image from "next/image";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  return pageMetadata({ ...dictionary.meta.pages.menu, path: "/menu", lang: locale });
}

export default async function MenuPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const menu = dictionary.menu;

  return (
    <section className="pt-36 pb-24 sm:pt-44">
      <div className="section-shell">
        <SectionIntro eyebrow={menu.intro.eyebrow} title={menu.intro.title} body={menu.intro.body} />
        <MotionReveal className="mt-12 overflow-hidden rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.32)]">
          <div className="relative min-h-[20rem] sm:min-h-[28rem]">
            <Image src="/images/hero/Preparacao-picanha.webp" alt="Preparacao de picanha no Figueiral" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-transparent" />
            <div className="absolute bottom-6 left-6 max-w-sm sm:bottom-9 sm:left-9">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold">{menu.hero.eyebrow}</p>
              <p className="mt-3 font-display text-3xl leading-tight text-cream sm:text-4xl">{menu.hero.title}</p>
            </div>
            <div className="absolute bottom-6 right-6 hidden h-36 w-32 overflow-hidden rounded-[1rem] border border-cream/55 shadow-[0_18px_44px_rgba(92,68,48,0.22)] sm:block">
              <Image src="/images/food/Cogumelos-alho.webp" alt="Cogumelos ao alho no Figueiral" fill sizes="128px" className="object-cover" />
            </div>
          </div>
        </MotionReveal>
        <div className="mt-14 grid gap-8">
          {menu.categories.map((category, index) => (
            <MotionReveal key={category.title} delay={index * 0.06} className="luxury-card rounded-[2rem] p-6 sm:p-9">
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">0{index + 1}</p>
                  <h2 className="mt-4 font-display text-4xl text-charcoal">{category.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-walnut">{category.description}</p>
                </div>
                <div className="divide-y divide-walnut/10">
                  {category.items.map((item) => (
                    <article key={item.name} className="py-6 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between gap-5">
                        <h3 className="font-display text-2xl text-charcoal">{item.name}</h3>
                        {item.highlight ? (
                          <span className="rounded-full bg-gold/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">
                            {menu.signature}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm leading-7 text-walnut">{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
