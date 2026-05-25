import type { Metadata } from "next";
import { PressEditorial } from "@/components/sections/PressEditorial";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  return pageMetadata({ ...dictionary.meta.pages.press, path: "/press", lang: locale });
}

export default async function PressPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);

  return (
    <div className="pt-36 sm:pt-44">
      <PressEditorial dictionary={dictionary} lang={locale} />
    </div>
  );
}
