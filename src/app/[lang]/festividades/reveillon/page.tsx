import type { Metadata } from "next";
import { FestiveEventPage } from "@/components/festivities/FestiveEventPage";
import { festiveHero, festivityAssets } from "@/data/festivities";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

const PATH = "/festividades/reveillon";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  const assets = festivityAssets.reveillon[locale];

  return pageMetadata({
    ...dictionary.meta.pages.festiveReveillon,
    path: PATH,
    lang: locale,
    ogImage: festiveHero.reveillon.desktop,
    ogImageAlt: dictionary.festivities.reveillon.hero.imageAlt,
    ogImageWidth: festiveHero.reveillon.width,
    ogImageHeight: festiveHero.reveillon.height
  });
}

export default async function ReveillonFestivityPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  const assets = festivityAssets.reveillon[locale];

  return (
    <FestiveEventPage
      menu="reveillon"
      copy={dictionary.festivities.reveillon}
      actions={dictionary.festivities.actions}
      imageSrc={assets.image}
      pdfHref={assets.pdf}
    />
  );
}
