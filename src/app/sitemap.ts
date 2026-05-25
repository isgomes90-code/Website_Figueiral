import type { MetadataRoute } from "next";
import { locales, localizedPath } from "@/i18n/config";
import { getAllPressSlugs } from "@/data/press";
import { getAllEditorialSlugs } from "@/data/seo";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/menu",
    "/wine-experience",
    "/about",
    "/gallery",
    "/reservations",
    "/contact"
  ];

  const pressRoutes = getAllPressSlugs().map((slug) => `/about/press/${slug}`);
  const editorialRoutes = getAllEditorialSlugs().map((slug) => `/${slug}`);

  const allRoutes = [...routes, ...pressRoutes, ...editorialRoutes];

  return locales.flatMap((locale) =>
    allRoutes.map((route) => ({
      url: `${siteConfig.url}${localizedPath(locale, route)}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : route.includes("/about/press/") ? "monthly" : "monthly",
      priority: route === "" ? 1 : route.includes("/about/press/") ? 0.7 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alternateLocale) => [
            alternateLocale === "pt" ? "pt-PT" : "en",
            `${siteConfig.url}${localizedPath(alternateLocale, route)}`
          ])
        )
      }
    }))
  );
}
