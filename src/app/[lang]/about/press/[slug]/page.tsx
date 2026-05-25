import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, locales, localizedPath, type Locale } from "@/i18n/config";
import { formatPressDate, getAllPressSlugs, getPressArticle, t } from "@/data/press";
import { pageMetadata, pressArticleSchema, breadcrumbSchema } from "@/lib/seo";
import {
  bodyLeadClasses,
  bodyTextClasses,
  editorialEyebrowClasses,
  pageTitleClasses
} from "@/lib/sectionTitle";
import { imageToneEditorial } from "@/lib/imageTone";

const externalRel = "noopener noreferrer" as const;

export function generateStaticParams() {
  return locales.flatMap((lang) => getAllPressSlugs().map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const article = getPressArticle(slug);
  if (!article) return {};

  return pageMetadata({
    title: t(article.meta.title, locale),
    description: t(article.meta.description, locale),
    keywords: article.meta.keywords[locale],
    path: `/about/press/${slug}`,
    lang: locale,
    ogImage: article.image,
    ogImageAlt: t(article.imageAlt, locale),
    ogType: "article"
  });
}

export default async function PressArticlePage({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  const press = dictionary.about.press;
  const article = getPressArticle(slug);

  if (!article) {
    notFound();
  }

  const quotes = article.pullQuotes[locale];
  const backHref = `${localizedPath(locale, "/about")}#press`;
  const articlePath = `/about/press/${slug}`;

  const schema = pressArticleSchema({
    title: t(article.title, locale),
    description: t(article.meta.description, locale),
    path: articlePath,
    image: article.image,
    datePublished: article.date,
    publisher: t(article.publication, locale),
    lang: locale
  });

  const breadcrumbs = breadcrumbSchema([
    { name: locale === "pt" ? "Início" : "Home", path: localizedPath(locale) },
    { name: press.intro.title, path: `${localizedPath(locale, "/about")}#press` },
    { name: t(article.title, locale), path: localizedPath(locale, articlePath) }
  ]);

  return (
    <article className="bg-[linear-gradient(180deg,#faf7f2_0%,#f5efe6_100%)] pb-20 pt-36 sm:pb-24 sm:pt-44">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <div className="section-shell">
        <nav className="mb-8" aria-label="Breadcrumb">
          <Link
            href={backHref}
            className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-walnut/75 transition hover:text-brandGreen"
          >
            ← {press.backToArchive}
          </Link>
        </nav>

        <header className="mx-auto max-w-3xl text-center">
          <p className={`text-gold/90 ${editorialEyebrowClasses}`}>{t(article.publication, locale)}</p>
          <time
            dateTime={article.date}
            className="mt-3 block text-[0.64rem] font-medium uppercase tracking-[0.2em] text-walnut/60"
          >
            {formatPressDate(article.date, locale)}
          </time>
          <h1 className={`mt-6 text-charcoal ${pageTitleClasses}`}>{t(article.title, locale)}</h1>
        </header>

        <MotionReveal className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-walnut/10 bg-cream/60 shadow-[0_18px_50px_rgba(58,44,34,0.07)] sm:mt-12">
          <div className="relative aspect-[16/10] min-h-[12rem] sm:min-h-[16rem]">
            <Image
              src={article.image}
              alt={t(article.imageAlt, locale)}
              fill
              priority
              sizes="(min-width: 1024px) 70vw, 100vw"
              className={`object-cover ${imageToneEditorial}`}
            />
          </div>
        </MotionReveal>

        <div className="mx-auto mt-10 max-w-2xl space-y-7 sm:mt-12">
          <p className={`text-walnut ${bodyLeadClasses}`}>{t(article.summary, locale)}</p>
          <p className={`text-walnut/90 ${bodyTextClasses}`}>{t(article.context, locale)}</p>

          {quotes.length > 0 ? (
            <div className="space-y-5 border-y border-walnut/10 py-7">
              {quotes.map((quote) => (
                <blockquote
                  key={quote}
                  className="border-l border-gold/40 pl-4 font-display text-[1.05rem] leading-snug tracking-[-0.01em] text-charcoal sm:text-[1.15rem]"
                >
                  &ldquo;{quote}&rdquo;
                </blockquote>
              ))}
            </div>
          ) : null}

          <p className={`text-[0.8rem] leading-relaxed text-walnut/75 ${bodyTextClasses}`}>{press.editorialNote}</p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <LuxuryButton href={article.originalUrl} className="text-center">
              {press.viewOriginal}
            </LuxuryButton>
            <a
              href={article.originalUrl}
              target="_blank"
              rel={externalRel}
              className="text-center text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-walnut/70 transition hover:text-brandGreen"
            >
              {t(article.publication, locale)} ↗
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
