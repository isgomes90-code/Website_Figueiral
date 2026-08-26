import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialLandingPage } from "@/components/sections/EditorialLandingPage";
import { LocalLandingPage } from "@/components/sections/LocalLandingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getAllEditorialSlugs,
  getEditorialPage,
  isLocalLandingPage,
  isSeoLandingPage,
  t
} from "@/data/seo";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, locales, localizedPath, type Locale } from "@/i18n/config";
import { breadcrumbSchema, faqPageSchema, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((lang) => getAllEditorialSlugs().map((landing) => ({ lang, landing })));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; landing: string }>;
}): Promise<Metadata> {
  const { lang, landing } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const page = getEditorialPage(landing);
  if (!page) return {};

  const metadata = pageMetadata({
    title: t(page.meta.title, locale),
    description: t(page.meta.description, locale),
    keywords: t(page.meta.keywords, locale),
    path: `/${landing}`,
    lang: locale
  });

  if (!isSeoLandingPage(page)) {
    return {
      ...metadata,
      robots: { index: false, follow: false }
    };
  }

  return metadata;
}

export default async function EditorialRoutePage({
  params
}: {
  params: Promise<{ lang: string; landing: string }>;
}) {
  const { lang, landing } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  const page = getEditorialPage(landing);

  if (!page) {
    notFound();
  }

  const breadcrumbs = breadcrumbSchema([
    {
      name: locale === "pt" ? "Início" : "Home",
      path: localizedPath(locale)
    },
    {
      name: t(page.content.title, locale),
      path: localizedPath(locale, `/${landing}`)
    }
  ]);

  if (isLocalLandingPage(page)) {
    const faq = faqPageSchema(
      page.local.faq.map((item) => ({
        question: t(item.question, locale),
        answer: t(item.answer, locale)
      }))
    );

    return (
      <>
        <JsonLd data={breadcrumbs} />
        <JsonLd data={faq} inline />
        <LocalLandingPage page={page} lang={locale} dictionary={dictionary} />
      </>
    );
  }

  return (
    <>
      {isSeoLandingPage(page) ? <JsonLd data={breadcrumbs} /> : null}
      <EditorialLandingPage page={page} lang={locale} dictionary={dictionary} />
    </>
  );
}
