import Image from "next/image";
import { ImageFeature } from "@/components/sections/ImageFeature";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { t, type SeoLandingPage } from "@/data/seo";
import type { LocalLandingContent } from "@/data/localLandings";
import { imageToneHero } from "@/lib/imageTone";
import { blurWarmWalnut } from "@/lib/imagePlaceholders";
import {
  bodyLeadClasses,
  bodyNoteClasses,
  bodyTextClasses,
  cardTitleClasses,
  displayFigureClasses,
  editorialEyebrowClasses,
  heroDisplayTitleClasses,
  heroLeadClasses,
  sectionTitleClasses
} from "@/lib/sectionTitle";
import { mapsEmbedUrl, siteConfig } from "@/lib/site";

type LocalLandingPageProps = {
  page: SeoLandingPage & { local: LocalLandingContent };
  lang: Locale;
  dictionary: Dictionary;
};

function ctaLabel(
  dictionary: Dictionary,
  key: NonNullable<SeoLandingPage["primaryCta"]["labelKey"]>
) {
  if (key === "reserve") return dictionary.navigation.reserveTable;
  if (key === "menu") return dictionary.hero.secondaryCta;
  const map = {
    wine: dictionary.navigation.wine,
    contact: dictionary.navigation.contact,
    about: dictionary.navigation.about
  } as const;
  return map[key];
}

const readingOverlayStyle = {
  background: `linear-gradient(
    92deg,
    rgba(20, 15, 12, 0.62) 0%,
    rgba(21, 17, 14, 0.46) 38%,
    rgba(20, 22, 19, 0.2) 66%,
    rgba(18, 16, 14, 0.06) 100%
  )`
} as const;

const daylightOverlayStyle = {
  background: `linear-gradient(
    92deg,
    rgba(20, 15, 12, 0.7) 0%,
    rgba(21, 17, 14, 0.54) 36%,
    rgba(20, 22, 19, 0.28) 64%,
    rgba(18, 16, 14, 0.08) 100%
  )`
} as const;

const externalRel = "noopener noreferrer" as const;

export function LocalLandingPage({ page, lang, dictionary }: LocalLandingPageProps) {
  const { local } = page;
  const reserveHref = localizedPath(lang, page.primaryCta.href);
  const menuHref = localizedPath(lang, page.secondaryCta?.href ?? "/menu");

  return (
    <div className="overflow-x-clip">
      <section className="grain hero-grain relative min-h-[82vh] max-h-[920px] overflow-hidden bg-[#453528] lg:min-h-[80vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src={local.hero.image}
            alt={t(local.hero.imageAlt, lang)}
            fill
            priority
            fetchPriority="high"
            placeholder="blur"
            blurDataURL={blurWarmWalnut}
            sizes="100vw"
            quality={72}
            className={`${local.hero.imageClassName} ${imageToneHero}`}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={local.hero.overlay === "daylight" ? daylightOverlayStyle : readingOverlayStyle}
          aria-hidden
        />

        <div className="section-shell relative z-10 flex min-h-[82vh] max-h-[920px] items-center pt-[8.25rem] pb-20 sm:pt-32 sm:pb-24 lg:min-h-[80vh]">
          <div className="w-full min-w-0 max-w-[46rem]">
            <p
              className={`mb-5 text-gold sm:mb-6 ${editorialEyebrowClasses} tracking-[0.38em]`}
              style={{ textShadow: "0 1px 8px rgba(10, 7, 5, 0.35)" }}
            >
              {t(page.content.eyebrow, lang)}
            </p>
            <h1
              className={`${heroDisplayTitleClasses} text-cream`}
              style={{ textShadow: "0 1px 22px rgba(10, 7, 5, 0.42)" }}
            >
              {t(page.content.title, lang)}
            </h1>
            <p
              className={`mt-7 max-w-[34rem] text-cream/[0.88] sm:mt-8 ${heroLeadClasses}`}
              style={{ textShadow: "0 1px 12px rgba(10, 7, 5, 0.38)" }}
            >
              {t(local.hero.subtitle, lang)}
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:mt-10 sm:flex-row">
              <LuxuryButton
                href={reserveHref}
                className="border-[1.5px] border-cream/80 bg-[rgba(156,121,87,1)] shadow-[0_16px_38px_rgba(10,7,5,0.55)] hover:border-cream"
              >
                {ctaLabel(dictionary, page.primaryCta.labelKey)}
              </LuxuryButton>
              <LuxuryButton
                href={menuHref}
                variant="secondary"
                className="border-cream/50 bg-cream/15 text-cream hover:bg-cream hover:text-charcoal"
              >
                {ctaLabel(dictionary, page.secondaryCta?.labelKey ?? "menu")}
              </LuxuryButton>
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-paper editorial-paper--plain py-[3.25rem] sm:py-[4.5rem] lg:py-[5rem]">
        <div className="section-shell">
          <SectionIntro
            eyebrow={t(local.intro.eyebrow, lang)}
            title={t(local.intro.title, lang)}
            body={t(local.intro.body, lang)}
          />
        </div>
      </section>

      <section className="section-linen-breath pb-[3.25rem] sm:pb-[4.5rem] lg:pb-[5rem]">
        <div className="section-shell">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-5">
            {local.contexts.map((card, index) => (
              <MotionReveal
                key={t(card.label, lang)}
                delay={index * 0.06}
                className="flex h-full min-w-0 flex-col rounded-[1.38rem] border border-brandGreen/[0.08] bg-[linear-gradient(168deg,rgba(252,248,242,0.9),rgba(241,231,217,0.5))] px-6 py-7 shadow-[0_14px_42px_rgba(58,44,34,0.05)] sm:px-7 sm:py-8"
              >
                <span className={`text-[1.05rem] text-gold/[0.88] tracking-[0.2em] ${displayFigureClasses}`}>
                  0{index + 1}
                </span>
                <p className={`mt-5 text-gold ${editorialEyebrowClasses}`}>{t(card.label, lang)}</p>
                <h2 className={`mt-3 text-charcoal ${cardTitleClasses}`}>{t(card.title, lang)}</h2>
                <p className={`mt-4 flex-1 text-walnut ${bodyTextClasses}`}>{t(card.body, lang)}</p>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <ImageFeature
        eyebrow={t(local.house.eyebrow, lang)}
        title={t(local.house.title, lang)}
        body={t(local.house.body, lang)}
        note={t(local.house.note, lang)}
        image={local.house.image}
        alt={t(local.house.imageAlt, lang)}
        supportingImage={local.house.supportingImage}
        supportingAlt={t(local.house.supportingImageAlt, lang)}
        supportingPosition={local.house.supportingPosition}
        tone="warm"
        composition={local.house.composition}
        density="compact"
        imageClassName={local.house.imageClassName}
      />

      <section className="section-linen-breath py-[3rem] sm:py-[4.25rem] lg:py-[5rem]">
        <div className="section-shell">
          <SectionIntro
            eyebrow={lang === "pt" ? "Por dentro" : "Inside"}
            title={
              lang === "pt"
                ? "Onde o fogo se faz prato — e a receção trata de quem entra."
                : "Where fire becomes the plate — and the welcome looks after those who enter."
            }
          />
          <div className="mt-10 grid min-w-0 grid-cols-1 gap-4 sm:mt-12 lg:grid-cols-2 lg:items-stretch lg:gap-5">
            <div className="grid min-w-0 grid-cols-1 gap-4 lg:gap-5">
              {local.gallery.slice(0, 3).map((image) => (
                <figure
                  key={image.src}
                  className="relative aspect-[3/2] overflow-hidden rounded-[1.45rem] border border-walnut/10 bg-sand/40 shadow-[0_14px_40px_rgba(58,44,34,0.08)]"
                >
                  <Image
                    src={image.src}
                    alt={t(image.alt, lang)}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className={`object-cover ${image.imageClassName ?? "object-center"}`}
                    loading="lazy"
                    quality={68}
                  />
                </figure>
              ))}
            </div>
            {local.gallery[3] ? (
              <figure className="relative aspect-[2/3] overflow-hidden rounded-[1.45rem] border border-walnut/10 bg-sand/40 shadow-[0_14px_40px_rgba(58,44,34,0.08)] lg:aspect-auto lg:min-h-full">
                <Image
                  src={local.gallery[3].src}
                  alt={t(local.gallery[3].alt, lang)}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className={`object-cover ${local.gallery[3].imageClassName ?? "object-center"}`}
                  loading="lazy"
                  quality={68}
                />
              </figure>
            ) : null}
          </div>
        </div>
      </section>

      <section className="editorial-paper editorial-paper--plain py-[3.25rem] sm:py-[4.5rem] lg:py-[5rem]">
        <div className="section-shell">
          <SectionIntro
            eyebrow={t(local.location.eyebrow, lang)}
            title={t(local.location.title, lang)}
            body={t(local.location.body, lang)}
          />
          <p className={`mt-6 max-w-xl text-walnut/80 ${bodyNoteClasses}`}>{t(local.location.proximity, lang)}</p>

          <div className="mt-12 grid min-w-0 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <MotionReveal className="overflow-hidden rounded-[2rem] luxury-card">
              <iframe
                title={lang === "pt" ? "Mapa — Restaurante Figueiral, Almancil" : "Map — Restaurante Figueiral, Almancil"}
                src={mapsEmbedUrl(lang)}
                className="min-h-[360px] w-full border-0 sm:min-h-[440px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <p className="border-t border-walnut/10 bg-cream/90 px-5 py-3 text-center text-[0.82rem]">
                <a
                  href={siteConfig.maps.placeUrl}
                  className="border-b border-transparent text-charcoal transition hover:border-brandGreen/48"
                  target="_blank"
                  rel={externalRel}
                >
                  {dictionary.contact.getDirections}
                </a>
              </p>
            </MotionReveal>

            <MotionReveal delay={0.08} className="luxury-card rounded-[2rem] p-7 sm:p-8">
              <div className="space-y-7">
                <div>
                  <p className={`text-gold ${editorialEyebrowClasses}`}>{dictionary.contact.details}</p>
                  <div className={`mt-4 space-y-2 text-walnut ${bodyTextClasses}`}>
                    <p>{siteConfig.address.street}</p>
                    <p>
                      {siteConfig.address.postalCode} {siteConfig.address.locality}, {siteConfig.address.region}
                    </p>
                    <p>{siteConfig.phone}</p>
                  </div>
                </div>
                <div>
                  <p className={`text-gold ${editorialEyebrowClasses}`}>{dictionary.contact.openingHours}</p>
                  <div className={`mt-4 space-y-2 text-walnut ${bodyTextClasses}`}>
                    {dictionary.contact.hours.map((hours) => (
                      <p key={hours}>{hours}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className={`text-gold ${editorialEyebrowClasses}`}>{dictionary.contact.parking}</p>
                  <p className={`mt-4 text-walnut ${bodyTextClasses}`}>{dictionary.contact.parkingText}</p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <LuxuryButton href={reserveHref}>{ctaLabel(dictionary, "reserve")}</LuxuryButton>
                  <LuxuryButton href={siteConfig.maps.placeUrl} variant="secondary">
                    {dictionary.contact.getDirections}
                  </LuxuryButton>
                </div>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      <section className="section-linen-breath py-[3.25rem] sm:py-[4.5rem] lg:py-[5rem]">
        <div className="section-shell">
          <SectionIntro
            eyebrow={lang === "pt" ? "Perguntas" : "Questions"}
            title={lang === "pt" ? "Antes de reservar." : "Before you book."}
            align="center"
          />
          <div className="mt-12 grid min-w-0 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5">
            {local.faq.map((item, index) => (
              <MotionReveal
                key={t(item.question, lang)}
                delay={index * 0.04}
                className="luxury-card rounded-[1.35rem] p-6 sm:p-7"
              >
                <h3 className={`text-charcoal ${cardTitleClasses}`}>{t(item.question, lang)}</h3>
                <p className={`mt-4 text-walnut ${bodyTextClasses}`}>{t(item.answer, lang)}</p>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-linen-breath pb-[3.5rem] sm:pb-[5rem] lg:pb-[5.5rem]">
        <div className="section-shell">
          <MotionReveal className="section-finale-panel rounded-[2rem] px-8 py-14 text-center sm:rounded-[2.35rem] sm:px-14 sm:py-[4.25rem] lg:px-20 lg:py-[4.75rem]">
            <p className={`text-gold/[0.78] ${editorialEyebrowClasses}`}>{t(local.finale.eyebrow, lang)}</p>
            <h2 className={`mx-auto mt-7 max-w-[34rem] text-cream/[0.94] sm:mt-[2rem] sm:max-w-[40rem] ${sectionTitleClasses}`}>
              {t(local.finale.title, lang)}
            </h2>
            <p className={`mx-auto mt-8 max-w-2xl text-cream/[0.62] sm:mt-[2.125rem] lg:max-w-[38rem] ${bodyLeadClasses}`}>
              {t(local.finale.body, lang)}
            </p>
            <div className="mt-[2.625rem] flex flex-col items-center justify-center gap-4 sm:mt-[2.85rem] sm:flex-row">
              <LuxuryButton
                href={reserveHref}
                variant="secondary"
                className="border-cream/45 bg-cream/92 text-charcoal hover:-translate-y-0.5 hover:border-gold/[0.75] hover:bg-cream hover:text-charcoal focus:ring-offset-charcoal sm:tracking-[0.28em]"
              >
                {ctaLabel(dictionary, "reserve")}
              </LuxuryButton>
              <LuxuryButton
                href={menuHref}
                variant="secondary"
                className="border-cream/35 bg-transparent text-cream hover:border-cream/70 hover:bg-cream/10"
              >
                {ctaLabel(dictionary, "menu")}
              </LuxuryButton>
            </div>
          </MotionReveal>
        </div>
      </section>
    </div>
  );
}
