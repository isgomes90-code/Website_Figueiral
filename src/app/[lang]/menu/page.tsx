import type { Metadata } from "next";
import Image from "next/image";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { sectionTitleClasses } from "@/lib/sectionTitle";

const categoryVisuals = [
  {
    image: "/images/hero/Preparacao-picanha.webp",
    mini: "/images/food/Camarao-alho-fogo.webp",
    overlay: "linear-gradient(180deg, rgba(52,42,35,0.08), rgba(52,42,35,0.44))"
  },
  {
    image: "/images/food/Robalo-mustarda.webp",
    mini: "/images/wine/Vinho-mesa.webp",
    overlay: "linear-gradient(180deg, rgba(96,96,72,0.04), rgba(96,78,57,0.3))"
  },
  {
    image: "/images/people/Empratamento-1.webp",
    mini: "/images/food/Cogumelos-alho.webp",
    overlay: "linear-gradient(180deg, rgba(92,68,48,0.04), rgba(92,68,48,0.32))"
  },
  {
    image: "/images/food/Tarte-maca.webp",
    mini: "/images/food/Profiteroles-chocolate.webp",
    overlay: "linear-gradient(180deg, rgba(156,121,87,0.04), rgba(92,68,48,0.28))"
  }
];

const interludeImages = [
  "/images/food/Camarao-alho-fogo.webp",
  "/images/wine/Vinho-garrafeira.webp",
  "/images/people/Empratamento-2.webp"
];

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
    <section className="pt-36 pb-28 sm:pt-44">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.05fr] lg:items-end">
          <MotionReveal className="max-w-[42rem]">
            <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-gold">
              {menu.intro.eyebrow}
            </p>
            <h1 className={`text-charcoal ${sectionTitleClasses}`}>
              {menu.intro.title}
            </h1>
            <p className="mt-7 max-w-[34rem] text-base leading-8 text-walnut sm:text-[1.05rem]">{menu.intro.body}</p>
          </MotionReveal>

          <MotionReveal delay={0.08} className="relative">
            <div className="relative min-h-[26rem] overflow-hidden rounded-[2.1rem] shadow-[0_30px_90px_rgba(82,58,39,0.16)] sm:min-h-[34rem]">
              <Image
                src="/images/hero/Preparacao-picanha.webp"
                alt="Preparacao de picanha no Figueiral"
                fill
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover brightness-[1.02] contrast-[0.92] saturate-[0.88]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,37,31,0.08),rgba(45,37,31,0.42))]" />
              <div className="absolute bottom-7 left-7 right-7 max-w-md sm:bottom-9 sm:left-9">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-cream/80">{menu.hero.eyebrow}</p>
                <p className="mt-3 font-display text-3xl leading-tight text-cream sm:text-[2.75rem]">{menu.hero.title}</p>
                <p className="mt-4 max-w-sm text-sm leading-7 text-cream/76">{menu.hero.body}</p>
              </div>
            </div>
            <div className="absolute -bottom-6 right-6 hidden max-w-[18rem] rounded-[1.25rem] border border-walnut/10 bg-cream/85 p-5 shadow-[0_24px_70px_rgba(82,58,39,0.15)] backdrop-blur-md sm:block">
              <p className="font-display text-2xl leading-tight text-charcoal">{menu.hero.note}</p>
            </div>
          </MotionReveal>
        </div>

        <div className="mt-24 grid gap-14 sm:mt-32">
          {menu.categories.map((category, index) => (
            <div key={category.title} className="grid gap-12">
              <MotionReveal
                delay={index * 0.06}
                className={`overflow-hidden rounded-[2.1rem] border border-walnut/10 bg-cream/70 shadow-[0_28px_80px_rgba(82,58,39,0.12)] backdrop-blur-md ${
                  index % 2 === 1 ? "lg:ml-10" : "lg:mr-10"
                }`}
              >
                <div className={`grid gap-0 lg:grid-cols-[0.78fr_1.22fr] ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <aside className="relative min-h-[22rem] overflow-hidden bg-sand/60 p-7 sm:p-9">
                    <Image
                      src={categoryVisuals[index].image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 34vw, 100vw"
                      className="object-cover brightness-[1.03] contrast-[0.9] saturate-[0.88] sepia-[0.06]"
                    />
                    <div className="absolute inset-0" style={{ background: categoryVisuals[index].overlay }} />
                    <div className="absolute inset-x-7 bottom-7 sm:inset-x-9 sm:bottom-9">
                      <div className="max-w-xs rounded-[1.2rem] border border-cream/45 bg-cream/80 p-5 shadow-[0_18px_55px_rgba(82,58,39,0.14)] backdrop-blur-md">
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-gold">{category.editorial.label}</p>
                        <p className="mt-3 font-display text-3xl leading-none text-charcoal">{category.editorial.value}</p>
                        <p className="mt-4 text-sm leading-7 text-walnut">{category.editorial.note}</p>
                      </div>
                    </div>
                    <div className="absolute right-6 top-6 hidden h-28 w-24 overflow-hidden rounded-[0.9rem] border border-cream/60 shadow-[0_18px_48px_rgba(82,58,39,0.22)] sm:block">
                      <Image src={categoryVisuals[index].mini} alt="" fill sizes="96px" className="object-cover" />
                    </div>
                  </aside>

                  <div className="p-7 sm:p-9 lg:p-11">
                    <div className="max-w-xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">0{index + 1}</p>
                      <h2 className={`mt-4 text-charcoal ${sectionTitleClasses}`}>{category.title}</h2>
                      <p className="mt-5 max-w-lg text-sm leading-7 text-walnut">{category.description}</p>
                    </div>

                    <div className="mt-10 divide-y divide-walnut/10">
                      {category.items.map((item) => (
                        <article key={item.name} className="group py-7 first:pt-0 last:pb-0">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h3 className="font-display text-[1.65rem] leading-tight text-charcoal transition group-hover:text-gold">
                                {item.name}
                              </h3>
                              <p className="mt-3 max-w-xl text-sm leading-7 text-walnut">{item.description}</p>
                            </div>
                            {item.tag ? (
                              <span className="w-fit shrink-0 rounded-full border border-gold/25 bg-gold/10 px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold">
                                {item.tag}
                              </span>
                            ) : item.highlight ? (
                              <span className="w-fit shrink-0 rounded-full border border-gold/25 bg-gold/10 px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold">
                                {menu.signature}
                              </span>
                            ) : null}
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </MotionReveal>

              {menu.interludes[index] ? (
                <MotionReveal delay={0.08} className="mx-auto max-w-5xl">
                  <div className="grid overflow-hidden rounded-[1.8rem] border border-walnut/10 bg-sand/55 shadow-[0_22px_70px_rgba(82,58,39,0.1)] md:grid-cols-[0.92fr_1.08fr]">
                    <div className="relative min-h-[15rem]">
                      <Image
                        src={interludeImages[index]}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 42vw, 100vw"
                        className="object-cover brightness-[1.04] contrast-[0.9] saturate-[0.86]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/24 to-transparent" />
                    </div>
                    <div className="p-7 sm:p-9">
                      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.32em] text-gold">{menu.interludes[index].eyebrow}</p>
                      <h3 className={`mt-4 text-charcoal ${sectionTitleClasses}`}>{menu.interludes[index].title}</h3>
                      <p className="mt-5 max-w-xl text-sm leading-7 text-walnut">{menu.interludes[index].body}</p>
                    </div>
                  </div>
                </MotionReveal>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
