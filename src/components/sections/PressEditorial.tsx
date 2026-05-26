import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import {
  formatPressDate,
  getFeaturedPressArticle,
  getPressArticlesExceptFeatured,
  pressArticlePath,
  t,
  type PressArticle
} from "@/data/press";
import { bodyNoteClasses, bodyTextClasses, editorialEyebrowClasses, sectionTitleClasses } from "@/lib/sectionTitle";
import { imageToneEditorial } from "@/lib/imageTone";

function PublicationMark({ article, lang }: { article: PressArticle; lang: Locale }) {
  if (article.logo) {
    return (
      <Image
        src={article.logo}
        alt={t(article.publication, lang)}
        width={96}
        height={24}
        className="h-5 w-auto object-contain opacity-80"
      />
    );
  }

  return (
    <p className={`text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-walnut/75 ${editorialEyebrowClasses}`}>
      {t(article.publication, lang)}
    </p>
  );
}

function PressArchiveCard({
  article,
  lang,
  readLabel,
  featured = false
}: {
  article: PressArticle;
  lang: Locale;
  readLabel: string;
  featured?: boolean;
}) {
  const href = pressArticlePath(lang, article.slug);

  return (
    <article
      className={`press-archive-card group flex h-full flex-col overflow-hidden rounded-xl border border-walnut/[0.08] bg-cream/90 shadow-[0_8px_28px_rgba(58,44,34,0.04)] transition duration-500 hover:-translate-y-0.5 hover:border-walnut/15 hover:shadow-[0_16px_40px_rgba(58,44,34,0.08)] ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-linen/40">
        <Image
          src={article.image}
          alt={t(article.imageAlt, lang)}
          fill
          sizes={
            featured
              ? "(min-width: 1024px) 40vw, (min-width: 768px) 33vw, 100vw"
              : "(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 100vw"
          }
          className={`object-cover transition duration-700 ease-out group-hover:scale-[1.02] ${imageToneEditorial}`}
          loading={featured ? "eager" : "lazy"}
        />
      </Link>

      <div className={`flex flex-1 flex-col ${featured ? "p-5 sm:p-6" : "p-4 sm:p-5"}`}>
        <PublicationMark article={article} lang={lang} />
        <time
          dateTime={article.date}
          className="mt-3 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-walnut/55"
        >
          {formatPressDate(article.date, lang)}
        </time>
        <h3
          className={`mt-3 font-display leading-snug tracking-[-0.01em] text-charcoal ${
            featured ? "text-[1.15rem] sm:text-[1.22rem]" : "text-[0.98rem] sm:text-[1.02rem]"
          }`}
        >
          <Link href={href} className="transition hover:text-brandGreen">
            {t(article.title, lang)}
          </Link>
        </h3>
        <p className={`mt-3 line-clamp-3 flex-1 text-walnut/85 ${bodyNoteClasses}`}>{t(article.excerpt, lang)}</p>
        <Link
          href={href}
          className="press-read-link mt-4 inline-flex w-fit items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-charcoal/90 transition hover:text-brandGreen"
        >
          {readLabel}
        </Link>
      </div>
    </article>
  );
}

type PressEditorialProps = {
  dictionary: Dictionary;
  lang: Locale;
};

export function PressEditorial({ dictionary, lang }: PressEditorialProps) {
  const press = dictionary.about.press;
  const featured = getFeaturedPressArticle();
  const rest = getPressArticlesExceptFeatured();

  return (
    <section
      id="press"
      className="scroll-mt-32 border-t border-walnut/10 bg-[linear-gradient(180deg,#faf7f2_0%,#f5efe6_100%)] py-16 sm:py-20 lg:py-24"
      aria-labelledby="about-press-heading"
    >
      <div className="section-shell">
        <header className="mx-auto max-w-2xl text-center">
          <p className={`text-oliveMuted/85 ${editorialEyebrowClasses}`}>{press.intro.eyebrow}</p>
          <h2 id="about-press-heading" className={`mt-4 text-charcoal ${sectionTitleClasses}`}>
            {press.intro.title}
          </h2>
          <p className={`mx-auto mt-5 max-w-xl text-walnut/90 ${bodyTextClasses}`}>{press.intro.lead}</p>
        </header>

        <div className="hairline-dusk mx-auto mt-10 max-w-[7rem] opacity-60" />

        <div className="mt-12 lg:mt-14">
          <p className={`mb-5 text-center text-gold/90 ${editorialEyebrowClasses}`}>{press.featuredLabel}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-5">
            <PressArchiveCard article={featured} lang={lang} readLabel={press.readArticle} featured />
            {rest.map((article) => (
              <PressArchiveCard key={article.slug} article={article} lang={lang} readLabel={press.readArticle} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
