import type { Metadata } from "next";
import { defaultLocale, locales, localizedPath, type Locale } from "@/i18n/config";
import { isLocalTestSite, siteConfig } from "@/lib/site";

const defaultKeywordsByLocale: Record<Locale, string[]> = {
  pt: [
    "restaurante Almancil",
    "Restaurante Figueiral",
    "picanha Algarve",
    "restaurante Quinta do Lago",
    "restaurante Vale do Lobo"
  ],
  en: [
    "restaurant Almancil",
    "Restaurante Figueiral",
    "picanha Algarve",
    "restaurant Quinta do Lago",
    "restaurant Vale do Lobo"
  ]
};

export function pageMetadata({
  title,
  description,
  path = "/",
  lang = defaultLocale,
  keywords,
  ogImage,
  ogImageAlt,
  ogType = "website"
}: {
  title: string;
  description: string;
  path?: string;
  lang?: Locale;
  keywords?: string[];
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: "website" | "article";
}): Metadata {
  const localized = localizedPath(lang, path);
  const url = new URL(localized, siteConfig.url).toString();
  const resolvedKeywords = keywords ?? defaultKeywordsByLocale[lang];
  const languages = Object.fromEntries(
    locales.map((locale) => [locale === "pt" ? "pt-PT" : "en", localizedPath(locale, path)])
  );
  const defaultOgImageAlt =
    lang === "pt"
      ? "Restaurante Figueiral em Almancil, Algarve"
      : "Restaurante Figueiral in Almancil, Algarve";
  const resolvedOgImage = ogImage ?? "/opengraph-image";
  const resolvedOgImageAlt = ogImageAlt ?? defaultOgImageAlt;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    keywords: resolvedKeywords,
    ...(isLocalTestSite ? { robots: { index: false, follow: false } } : {}),
    alternates: {
      canonical: localized,
      languages: {
        ...languages,
        "x-default": localizedPath(defaultLocale, path)
      }
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: lang === "pt" ? "pt_PT" : "en",
      alternateLocale: lang === "pt" ? ["en"] : ["pt_PT"],
      type: ogType,
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: resolvedOgImageAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [resolvedOgImage]
    }
  };
}

export function pressArticleSchema({
  title,
  description,
  path,
  image,
  datePublished,
  publisher,
  lang = defaultLocale
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  publisher: string;
  lang?: Locale;
}) {
  const url = new URL(localizedPath(lang, path), siteConfig.url).toString();
  const imageUrl = image.startsWith("http") ? image : `${siteConfig.url}${image}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    image: [imageUrl],
    author: {
      "@type": "Organization",
      name: publisher
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/opengraph-image`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    }
  };
}

export function restaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    "@id": `${siteConfig.url}/#restaurant`,
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    description:
      "Restaurante familiar em Almancil, Algarve, desde 1986. Picanha ao estilo brasileiro, carnes na grelha e vinhos portugueses.",
    servesCuisine: ["Portuguese", "Mediterranean", "Steakhouse", "Brazilian Picanha", "International"],
    priceRange: "€€€",
    acceptsReservations: true,
    menu: `${siteConfig.url}/${defaultLocale}/menu`,
    foundingDate: siteConfig.founded,
    image: `${siteConfig.url}/opengraph-image`,
    hasMap: siteConfig.maps.placeUrl,
    areaServed: [
      {
        "@type": "City",
        name: "Almancil"
      },
      {
        "@type": "AdministrativeArea",
        name: "Algarve"
      }
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.latitude,
      longitude: siteConfig.coordinates.longitude
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "19:00",
        closes: "22:00"
      }
    ],
    sameAs: Object.values(siteConfig.socials)
  };
}
