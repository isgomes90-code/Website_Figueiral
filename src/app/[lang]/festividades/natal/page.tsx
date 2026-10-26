import type { Metadata } from "next";
import { FestiveEventPage } from "@/components/festivities/FestiveEventPage";
import { festiveMenuImageSize, festivityAssets } from "@/data/festivities";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

const PATH = "/festividades/natal";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  const assets = festivityAssets.natal[locale];

  return pageMetadata({
    ...dictionary.meta.pages.festiveNatal,
    path: PATH,
    lang: locale,
    ogImage: assets.image,
    ogImageAlt: dictionary.festivities.natal.imageAlt,
    ogImageWidth: festiveMenuImageSize.width,
    ogImageHeight: festiveMenuImageSize.height
  });
}

export default async function NatalFestivityPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  const assets = festivityAssets.natal[locale];

  return (
    <FestiveEventPage
      menu="natal"
      copy={dictionary.festivities.natal}
      actions={dictionary.festivities.actions}
      imageSrc={assets.image}
      pdfHref={assets.pdf}
    />
  );
}
