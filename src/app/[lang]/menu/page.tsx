import type { Metadata } from "next";
import Image from "next/image";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { categoryVisuals, interludeImages, menuHeroImage } from "@/data/menu";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, localizedPath, type Locale } from "@/i18n/config";
import { breadcrumbSchema, menuSchema, pageMetadata } from "@/lib/seo";
import {
  bodyLeadClasses,
  bodyNoteClasses,
  bodyTextClasses,
  cardTitleClasses,
  editorialEyebrowClasses,
  pageTitleClasses,
  sectionTitleClasses
} from "@/lib/sectionTitle";
import { imageToneMenu, imageToneMenuRich } from "@/lib/imageTone";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  return pageMetadata({ ...dictionary.meta.pages.menu, path: "/menu", lang: locale });
}

export default async function MenuPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  const menu = dictionary.menu;
  const img = dictionary.seo.images;

  const schema = menuSchema(
    menu.categories.map((category) => ({
      title: category.title,
      items: category.items.map((item) => ({ name: item.name, description: item.description }))
    })),
    locale
  );

  const breadcrumbs = breadcrumbSchema([
    { name: locale === "pt" ? "Início" : "Home", path: localizedPath(locale) },
    { name: menu.intro.eyebrow, path: localizedPath(locale, "/menu") }
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={breadcrumbs} />
      <section className="pt-36 pb-24 sm:pt-44">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.05fr] lg:items-end">
          <MotionReveal className="max-w-[42rem]">
            <p className={`mb-5 text-gold ${editorialEyebrowClasses}`}>
              {menu.intro.eyebrow}
            </p>
            <h1 className={`text-charcoal ${pageTitleClasses}`}>
              {menu.intro.title}
            </h1>
            <p className={`mt-8 max-w-[34rem] text-walnut sm:mt-9 ${bodyLeadClasses}`}>{menu.intro.body}</p>
          </MotionReveal>

          <MotionReveal delay={0.08} className="relative">
            <div className="relative min-h-[26rem] overflow-hidden rounded-[2.1rem] shadow-[0_30px_90px_rgba(82,58,39,0.16)] sm:min-h-[34rem]">
              <Image
                src={menuHeroImage}
                alt={img.menuHero}
                fill
                priority
                sizes="(min-width: 1024px) 54vw, 100vw"
                quality={75}
                className={`object-cover ${imageToneMenu}`}
              />
              <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(23,18,15,0.52)_0%,rgba(45,37,31,0.22)_45%,rgba(45,37,31,0.68)_100%)]" />
              <div className="menu-photo-copy absolute bottom-7 left-7 right-7 z-10 max-w-md sm:bottom-9 sm:left-9">
                <p className={`menu-photo-eyebrow ${editorialEyebrowClasses}`}>{menu.hero.eyebrow}</p>
                <p className={`menu-photo-title mt-3 ${cardTitleClasses}`}>{menu.hero.title}</p>
                <p className={`menu-photo-body mt-4 max-w-sm ${bodyNoteClasses}`}>{menu.hero.body}</p>
              </div>
            </div>
            <div className="absolute -bottom-6 right-6 hidden max-w-[18rem] rounded-[1.25rem] border border-walnut/10 bg-cream/90 p-5 shadow-[0_24px_70px_rgba(82,58,39,0.15)] sm:block">
              <p className={`text-charcoal ${cardTitleClasses}`}>{menu.hero.note}</p>
            </div>
          </MotionReveal>
        </div>

        <div className="mt-24 grid gap-14 sm:mt-32">
          {menu.categories.map((category, index) => (
            <div key={category.title} className="grid gap-12">
              <MotionReveal
                delay={index * 0.06}
                className={`overflow-hidden rounded-[2.1rem] border border-walnut/10 bg-cream/75 shadow-[0_28px_80px_rgba(82,58,39,0.12)] ${
                  index % 2 === 1 ? "lg:ml-10" : "lg:mr-10"
                }`}
              >
                <div className={`grid gap-0 lg:grid-cols-[0.78fr_1.22fr] ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <aside className="relative min-h-[22rem] overflow-hidden bg-sand/60 p-7 sm:p-9">
                    <Image
                      src={categoryVisuals[index].image}
                      alt={img.menuCategories[index] ?? ""}
                      fill
                      sizes="(min-width: 1024px) 34vw, 100vw"
                      className={`object-cover ${imageToneMenuRich}`}
                    />
                    <div className="absolute inset-0" style={{ background: categoryVisuals[index].overlay }} />
                    <div className="absolute inset-x-7 bottom-7 sm:inset-x-9 sm:bottom-9">
                      <div className="max-w-xs rounded-[1.2rem] border border-cream/45 bg-cream/85 p-5 shadow-[0_18px_55px_rgba(82,58,39,0.14)]">
                        <p className={`text-gold ${editorialEyebrowClasses}`}>{category.editorial.label}</p>
                        <p className={`mt-3 text-charcoal ${cardTitleClasses}`}>{category.editorial.value}</p>
                        <p className={`mt-4 text-walnut ${bodyNoteClasses}`}>{category.editorial.note}</p>
                      </div>
                    </div>
                    {categoryVisuals[index].mini ? (
                      <div className="absolute right-6 top-6 hidden h-28 w-24 overflow-hidden rounded-[0.9rem] border border-cream/60 shadow-[0_18px_48px_rgba(82,58,39,0.22)] sm:block">
                        <Image src={categoryVisuals[index].mini} alt="" fill sizes="96px" className="object-cover" aria-hidden />
                      </div>
                    ) : null}
                  </aside>

                  <div className="p-7 sm:p-9 lg:p-11">
                    <div className="max-w-xl">
                      <p className={`text-gold ${editorialEyebrowClasses}`}>0{index + 1}</p>
                      <h2 className={`mt-4 text-charcoal ${sectionTitleClasses}`}>{category.title}</h2>
                      <p className={`mt-5 max-w-lg text-walnut ${bodyTextClasses}`}>{category.description}</p>
                    </div>

                    <div className="mt-10 divide-y divide-walnut/10">
                      {category.items.map((item) => {
                        const priced = item as typeof item & {
                          prices?: { label: string; value: string }[];
                          priceNote?: string;
                        };
                        return (
                          <article key={item.name} className="group py-7 first:pt-0 last:pb-0">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                              <div className="min-w-0 flex-1">
                                <h3 className={`text-charcoal transition group-hover:text-gold ${cardTitleClasses}`}>
                                  {item.name}
                                </h3>
                                <p className={`mt-3 max-w-xl text-walnut ${bodyTextClasses}`}>{item.description}</p>
                                {priced.prices && priced.prices.length ? (
                                  <div className="mt-5 max-w-md space-y-2">
                                    {priced.prices.map((p) => (
                                      <div key={p.label} className="flex items-baseline gap-3">
                                        <span className={`shrink-0 text-walnut/85 ${bodyNoteClasses}`}>{p.label}</span>
                                        <span className="h-px flex-1 translate-y-[-3px] bg-walnut/18" aria-hidden />
                                        <span className="shrink-0 font-semibold tabular-nums text-charcoal">{p.value}</span>
                                      </div>
                                    ))}
                                    {priced.priceNote ? (
                                      <p className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-walnut/65">
                                        {priced.priceNote}
                                      </p>
                                    ) : null}
                                  </div>
                                ) : null}
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
                        );
                      })}
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
                        alt={img.menuInterludes[index] ?? ""}
                        fill
                        sizes="(min-width: 768px) 42vw, 100vw"
                        className={`object-cover ${imageToneMenu}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/24 to-transparent" />
                    </div>
                    <div className="p-7 sm:p-9">
                      <p className={`text-gold ${editorialEyebrowClasses}`}>{menu.interludes[index].eyebrow}</p>
                      <h3 className={`mt-4 text-charcoal ${cardTitleClasses}`}>{menu.interludes[index].title}</h3>
                      <p className={`mt-5 max-w-xl text-walnut ${bodyTextClasses}`}>{menu.interludes[index].body}</p>
                    </div>
                  </div>
                </MotionReveal>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
