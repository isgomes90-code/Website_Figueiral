import type { MetadataRoute } from "next";
import { locales, localizedPath } from "@/i18n/config";
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

  return locales.flatMap((locale) => routes.map((route) => ({
    url: `${siteConfig.url}${localizedPath(locale, route)}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((alternateLocale) => [alternateLocale === "pt" ? "pt-PT" : "en", `${siteConfig.url}${localizedPath(alternateLocale, route)}`])
      )
    }
  })));
}
