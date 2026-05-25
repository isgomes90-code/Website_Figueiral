import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialLandingPage } from "@/components/sections/EditorialLandingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllEditorialSlugs, getEditorialPage, isSeoLandingPage, t } from "@/data/seo";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, locales, localizedPath, type Locale } from "@/i18n/config";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

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

  return pageMetadata({
    title: t(page.meta.title, locale),
    description: t(page.meta.description, locale),
    keywords: t(page.meta.keywords, locale),
    path: `/${landing}`,
    lang: locale
  });
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

  return (
    <>
      {isSeoLandingPage(page) ? <JsonLd data={breadcrumbs} /> : null}
      <EditorialLandingPage page={page} lang={locale} dictionary={dictionary} />
    </>
  );
}
