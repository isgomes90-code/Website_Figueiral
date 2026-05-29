import type { Metadata } from "next";
import { defaultLocale, locales, localizedPath, type Locale } from "@/i18n/config";
import { GOOGLE_REVIEW_DATA } from "@/data/restaurant";
import { isLocalTestSite, siteConfig } from "@/lib/site";

/** Canonical e hreflang sem barra final (ex.: /en, não /en/). */
function canonicalPath(lang: Locale, path = "") {
  const localized = localizedPath(lang, path);
  return localized.length > 1 && localized.endsWith("/") ? localized.slice(0, -1) : localized;
}

const defaultKeywordsByLocale: Record<Locale, string[]> = {
  pt: [
    "restaurante Almancil",
    "restaurante premium Algarve",
    "melhor picanha Algarve",
    "Restaurante Figueiral",
    "restaurante Quinta do Lago",
    "restaurante Vale do Lobo"
  ],
  en: [
    "best restaurant in Almancil",
    "premium restaurant Algarve",
    "steak restaurant Algarve",
    "Restaurante Figueiral",
    "restaurant near Quinta do Lago",
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
  const localized = canonicalPath(lang, path);
  const url = new URL(localized, siteConfig.url).toString();
  const resolvedKeywords = keywords ?? defaultKeywordsByLocale[lang];
  const languages = Object.fromEntries(
    locales.map((locale) => [locale === "pt" ? "pt-PT" : "en", canonicalPath(locale, path)])
  );
  const defaultOgImageAlt =
    lang === "pt"
      ? "Restaurante Figueiral em Almancil, Algarve"
      : "Restaurante Figueiral in Almancil, Algarve";
  const resolvedOgImage = ogImage ?? `${localizedPath(lang)}/opengraph-image`;
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
        "x-default": canonicalPath(defaultLocale, path)
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
        url: `${siteConfig.url}/${lang}/opengraph-image`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    }
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString()
    }))
  };
}

export function menuSchema(
  sections: { title: string; items: { name: string; description: string }[] }[],
  lang: Locale = defaultLocale
) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: lang === "pt" ? "Menu Restaurante Figueiral" : "Restaurante Figueiral Menu",
    url: new URL(localizedPath(lang, "/menu"), siteConfig.url).toString(),
    inLanguage: lang === "pt" ? "pt-PT" : "en",
    hasMenuSection: sections.map((section) => ({
      "@type": "MenuSection",
      name: section.title,
      hasMenuItem: section.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description
      }))
    }))
  };
}

export function restaurantSchema(lang: Locale = defaultLocale) {
  const descriptions: Record<Locale, string> = {
    pt: "Restaurante familiar em Almancil, Algarve, desde 1986. Picanha ao estilo brasileiro, carnes na grelha e vinhos portugueses.",
    en: "Family restaurant in Almancil, Algarve, since 1986. Brazilian-style picanha, fire-grilled meats and Portuguese wines."
  };

  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    "@id": `${siteConfig.url}/#restaurant`,
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    description: descriptions[lang],
    inLanguage: lang === "pt" ? "pt-PT" : "en",
    servesCuisine: ["Portuguese", "Mediterranean", "Steakhouse", "Brazilian Picanha", "International"],
    priceRange: "€€€",
    acceptsReservations: true,
    menu: `${siteConfig.url}/${lang}/menu`,
    foundingDate: siteConfig.founded,
    image: `${siteConfig.url}/${lang}/opengraph-image`,
    hasMap: siteConfig.maps.placeUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GOOGLE_REVIEW_DATA.ratingValue,
      reviewCount: GOOGLE_REVIEW_DATA.reviewCount,
      bestRating: GOOGLE_REVIEW_DATA.bestRating,
      worstRating: GOOGLE_REVIEW_DATA.worstRating
    },
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
    sameAs: [...Object.values(siteConfig.socials), siteConfig.maps.placeUrl]
  };
}
