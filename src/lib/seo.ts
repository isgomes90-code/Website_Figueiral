import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

const keywords = [
  "best restaurant Almancil",
  "steak restaurant Algarve",
  "best picanha Algarve",
  "restaurant near Quinta do Lago",
  "restaurant Vale do Lobo",
  "romantic restaurant Algarve",
  "premium restaurant Algarve",
  "wine restaurant Algarve"
];

export function pageMetadata({
  title,
  description,
  path = "/"
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    keywords,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_PT",
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Restaurante Figueiral in Almancil, Algarve"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export function restaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    servesCuisine: ["Portuguese", "Mediterranean", "Steakhouse", "Brazilian Picanha"],
    priceRange: "EUR 30-50",
    foundingDate: siteConfig.founded,
    image: `${siteConfig.url}/opengraph-image`,
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
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "12:00",
        closes: "15:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "18:30",
        closes: "23:00"
      }
    ],
    sameAs: Object.values(siteConfig.socials)
  };
}
