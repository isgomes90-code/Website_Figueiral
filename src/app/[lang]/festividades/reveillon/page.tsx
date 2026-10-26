import type { Metadata } from "next";
import { FestiveEventPage } from "@/components/festivities/FestiveEventPage";
import { festiveMenuImageSize, festiveScenes, festivityAssets } from "@/data/festivities";
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
    ogImage: assets.image,
    ogImageAlt: dictionary.festivities.reveillon.imageAlt,
    ogImageWidth: festiveMenuImageSize.width,
    ogImageHeight: festiveMenuImageSize.height
  });
}

export default async function ReveillonFestivityPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  const assets = festivityAssets.reveillon[locale];

  const images = dictionary.seo.images;

  return (
    <FestiveEventPage
      menu="reveillon"
      copy={dictionary.festivities.reveillon}
      actions={dictionary.festivities.actions}
      scene={festiveScenes.reveillon}
      imageSrc={assets.image}
      pdfHref={assets.pdf}
      alts={{
        hero: images.festiveReveillonTable,
        heroSupporting: images.festiveReveillonWine,
        feature: images.festiveReveillonBar,
        featureSupporting: images.festiveWineDetail,
        moment: images.festiveReveillonFriends
      }}
    />
  );
}
