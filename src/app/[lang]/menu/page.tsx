import type { Metadata } from "next";
import Image from "next/image";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { categoryVisuals, menuAtTableImage, menuHeroImage } from "@/data/menu";
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

/** Miniaturas sobre a foto — tamanho uniforme; ocultas abaixo de `sm` para não comprimir mobile */
const menuCategoryMiniShell =
  "absolute right-4 top-4 z-[2] hidden h-[8.25rem] w-[7.25rem] overflow-hidden rounded-[1.05rem] border-2 border-cream/80 shadow-[0_22px_56px_rgba(82,58,39,0.32)] sm:right-5 sm:top-5 sm:block sm:h-[9.5rem] sm:w-[8.25rem] lg:right-6 lg:top-6 lg:h-[10.5rem] lg:w-[9.25rem]";

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
          </MotionReveal>
        </div>

        {menu.interludes[0] ? (
          <MotionReveal delay={0.06} className="mx-auto mt-24 max-w-5xl sm:mt-32">
            <div className="grid overflow-hidden rounded-[1.8rem] border border-walnut/10 bg-sand/55 shadow-[0_22px_70px_rgba(82,58,39,0.1)] md:grid-cols-[0.92fr_1.08fr]">
              <div className="relative min-h-[15rem]">
                <Image
                  src={menuAtTableImage}
                  alt={img.menuInterludes[0] ?? ""}
                  fill
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className={`object-cover ${imageToneMenu}`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/24 to-transparent" />
              </div>
              <div className="p-7 sm:p-9">
                <p className={`text-gold ${editorialEyebrowClasses}`}>02 · {menu.interludes[0].eyebrow}</p>
                <h2 className={`mt-4 text-charcoal ${cardTitleClasses}`}>{menu.interludes[0].title}</h2>
                <p className={`mt-5 text-walnut ${bodyTextClasses}`}>{menu.interludes[0].body}</p>
              </div>
            </div>
          </MotionReveal>
        ) : null}

        <div className="mt-24 grid gap-14 sm:mt-32">
          {menu.categories.map((category, index) => {
            const sectionNumber = index + 3;
            const visual = categoryVisuals[index];
            const isCompact = "compact" in visual && visual.compact;
            const hasMini = Boolean(visual.mini);
            const showEditorial = !("hideEditorial" in visual && visual.hideEditorial);
            const asideMinHeight =
              hasMini && showEditorial
                ? "min-h-[16.5rem] sm:min-h-[20rem] lg:min-h-[22rem]"
                : isCompact
                  ? "min-h-[14rem] sm:min-h-[15rem] lg:min-h-[18rem]"
                  : "min-h-[14rem] sm:min-h-[15rem] lg:min-h-[22rem]";
            return (
            <div key={category.title} className="grid gap-12">
              <MotionReveal
                delay={index * 0.06}
                className={`overflow-hidden rounded-[2.1rem] border border-walnut/10 bg-cream/75 shadow-[0_28px_80px_rgba(82,58,39,0.12)] ${
                  index % 2 === 1 ? "lg:ml-10" : "lg:mr-10"
                }`}
              >
                <div
                  className={`grid gap-0 lg:grid-cols-[0.78fr_1.22fr] ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
                >
                  <aside
                    className={`relative overflow-hidden bg-sand/60 ${asideMinHeight} ${isCompact ? "p-5 sm:p-6" : "p-7 sm:p-9"}`}
                  >
                    <Image
                      src={visual.image}
                      alt={img.menuCategories[index] ?? ""}
                      fill
                      sizes="(min-width: 1024px) 34vw, 100vw"
                      className={`object-cover ${
                        "imageTone" in visual && visual.imageTone
                          ? visual.imageTone
                          : imageToneMenuRich
                      } ${
                        "imagePosition" in visual && visual.imagePosition ? visual.imagePosition : "object-center"
                      }`}
                      quality={72}
                    />
                    <div className="absolute inset-0" style={{ background: visual.overlay }} />
                    {"hideEditorial" in visual && visual.hideEditorial ? null : (
                    <div className={`absolute inset-x-7 bottom-7 sm:inset-x-9 sm:bottom-9 ${isCompact ? "!inset-x-5 !bottom-5 sm:!inset-x-6 sm:!bottom-6" : ""}`}>
                      <div className={`max-w-xs rounded-[1.2rem] border border-cream/45 bg-cream/85 shadow-[0_18px_55px_rgba(82,58,39,0.14)] ${isCompact ? "p-4" : "p-5"}`}>
                        <p className={`text-gold ${editorialEyebrowClasses}`}>{category.editorial.label}</p>
                        <p className={`mt-2 text-charcoal ${isCompact ? "text-[1.35rem] leading-snug" : cardTitleClasses}`}>{category.editorial.value}</p>
                        <p className={`mt-3 text-walnut ${isCompact ? "text-[0.88rem] leading-relaxed" : bodyNoteClasses}`}>{category.editorial.note}</p>
                      </div>
                    </div>
                    )}
                    {visual.mini ? (
                      <div className={menuCategoryMiniShell}>
                        <Image
                          src={visual.mini}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 148px, 132px"
                          className="object-cover"
                          aria-hidden
                        />
                      </div>
                    ) : null}
                  </aside>

                  <div className={isCompact ? "p-6 sm:p-7 lg:p-8" : "p-7 sm:p-9 lg:p-11"}>
                    <div className="w-full">
                      <p className={`text-gold ${editorialEyebrowClasses}`}>0{sectionNumber}</p>
                      <h2 className={`mt-3 text-charcoal ${isCompact ? "text-[clamp(1.85rem,1.2rem+1.6vw,2.65rem)] font-display font-semibold leading-[1.08] tracking-[-0.02em]" : sectionTitleClasses}`}>
                        {category.title}
                      </h2>
                      <p className={`mt-3 text-walnut ${isCompact ? "text-[0.96rem] leading-[1.68]" : bodyTextClasses}`}>{category.description}</p>
                    </div>

                    <div className={`w-full divide-y divide-walnut/10 ${isCompact ? "mt-6" : "mt-10"}`}>
                      {category.items.map((item) => (
                          <article key={item.name} className={`group ${isCompact ? "py-4 first:pt-0 last:pb-0 sm:py-[1.125rem]" : "py-7 first:pt-0 last:pb-0"}`}>
                            <div className={`flex items-start justify-between ${isCompact ? "gap-3" : "gap-4"}`}>
                              <h3 className={`min-w-0 flex-1 text-charcoal transition group-hover:text-gold ${isCompact ? "text-[1.28rem] font-display font-semibold leading-snug tracking-[-0.01em]" : cardTitleClasses}`}>
                                {item.name}
                              </h3>
                              {item.tag ? (
                                <span className={`w-fit shrink-0 rounded-full border border-gold/25 bg-gold/10 font-semibold uppercase tracking-[0.22em] text-gold ${isCompact ? "px-3 py-1 text-[0.58rem]" : "px-3.5 py-1.5 text-[0.62rem]"}`}>
                                  {item.tag}
                                </span>
                              ) : item.highlight ? (
                                <span className={`w-fit shrink-0 rounded-full border border-gold/25 bg-gold/10 font-semibold uppercase tracking-[0.22em] text-gold ${isCompact ? "px-3 py-1 text-[0.58rem]" : "px-3.5 py-1.5 text-[0.62rem]"}`}>
                                  {menu.signature}
                                </span>
                              ) : null}
                            </div>
                            <p className={`w-full text-walnut ${isCompact ? "mt-2 text-[0.94rem] leading-[1.62]" : `mt-3 ${bodyTextClasses}`}`}>{item.description}</p>
                          </article>
                      ))}
                    </div>
                  </div>
                </div>
              </MotionReveal>
            </div>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}
