import Link from "next/link";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import {
  getSeoLandingPage,
  isSeoLandingPage,
  t,
  type FutureEditorialPage,
  type SeoLandingPage
} from "@/data/seo";
import { bodyLeadClasses, bodyNoteClasses, editorialEyebrowClasses, pageTitleClasses } from "@/lib/sectionTitle";

type EditorialPageProps = {
  page: SeoLandingPage | FutureEditorialPage;
  lang: Locale;
  dictionary: Dictionary;
};

function ctaLabel(
  dictionary: Dictionary,
  key: SeoLandingPage["primaryCta"]["labelKey"] | NonNullable<SeoLandingPage["secondaryCta"]>["labelKey"]
) {
  const map = {
    reserve: dictionary.navigation.reserveTable,
    menu: dictionary.navigation.menu,
    wine: dictionary.navigation.wine,
    contact: dictionary.navigation.contact,
    about: dictionary.navigation.about
  } as const;
  return map[key];
}

export function EditorialLandingPage({ page, lang, dictionary }: EditorialPageProps) {
  const isLive = isSeoLandingPage(page);

  return (
    <section className="editorial-paper pt-36 pb-24 sm:pt-44 sm:pb-28">
      <div className="section-shell">
        <article className="mx-auto max-w-3xl text-center">
          <p className={`text-gold ${editorialEyebrowClasses}`}>{t(page.content.eyebrow, lang)}</p>
          <h1 className={`mt-5 text-charcoal ${pageTitleClasses}`}>{t(page.content.title, lang)}</h1>
          <p className={`mx-auto mt-8 max-w-2xl text-walnut ${bodyLeadClasses}`}>{t(page.content.body, lang)}</p>

          {"note" in page.content && page.content.note ? (
            <p className={`mx-auto mt-6 max-w-xl text-walnut/75 ${bodyNoteClasses}`}>
              {t(page.content.note as { pt: string; en: string }, lang)}
            </p>
          ) : null}

          {isLive ? (
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <LuxuryButton href={localizedPath(lang, page.primaryCta.href)}>
                {ctaLabel(dictionary, page.primaryCta.labelKey)}
              </LuxuryButton>
              {page.secondaryCta ? (
                <Link
                  href={localizedPath(lang, page.secondaryCta.href)}
                  className="text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-walnut/75 transition hover:text-brandGreen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandGreen/40 focus-visible:ring-offset-2"
                >
                  {ctaLabel(dictionary, page.secondaryCta.labelKey)} →
                </Link>
              ) : null}
            </div>
          ) : (
            <p className={`mx-auto mt-10 max-w-md text-walnut/70 ${bodyNoteClasses}`}>
              {lang === "pt"
                ? "Conteúdo editorial em preparação. Entretanto, reserve a sua mesa ou explore o menu."
                : "Editorial content in preparation. In the meantime, reserve your table or explore the menu."}
            </p>
          )}

          {!isLive ? (
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <LuxuryButton href={localizedPath(lang, "/reservations")}>{dictionary.navigation.reserveTable}</LuxuryButton>
              <Link
                href={localizedPath(lang, "/menu")}
                className="text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-walnut/75 transition hover:text-brandGreen"
              >
                {dictionary.navigation.menu} →
              </Link>
            </div>
          ) : null}
        </article>
      </div>
    </section>
  );
}

export function getEditorialCtaHref(slug: string, lang: Locale): string | undefined {
  const page = getSeoLandingPage(slug);
  return page ? localizedPath(lang, page.primaryCta.href) : undefined;
}
