import type { MetadataRoute } from "next";
import { locales, localizedPath, type Locale } from "@/i18n/config";
import { getAllPressSlugs } from "@/data/press";
import { getAllSeoLandingSlugs } from "@/data/seo";
import { siteConfig } from "@/lib/site";

const CORE_ROUTES = ["/menu", "/gallery", "/contact", "/reservations"] as const;
const SECONDARY_ROUTES = ["/wine-experience", "/about", "/press"] as const;

function sitemapPath(locale: Locale, route: string) {
  const path = localizedPath(locale, route);
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

function sitemapUrl(locale: Locale, route: string) {
  return `${siteConfig.url}${sitemapPath(locale, route)}`;
}

function getPriority(route: string, seoSlugs: ReadonlySet<string>): number {
  if (route === "") return 1;
  const slug = route.replace(/^\//, "");
  if (seoSlugs.has(slug)) return 0.9;
  if (route.includes("/about/press/")) return 0.6;
  if (CORE_ROUTES.includes(route as (typeof CORE_ROUTES)[number])) return 0.8;
  if (SECONDARY_ROUTES.includes(route as (typeof SECONDARY_ROUTES)[number])) return 0.7;
  return 0.7;
}

function getChangeFrequency(route: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (route === "") return "weekly";
  if (route.includes("/about/press/")) return "yearly";
  return "monthly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const seoSlugs = new Set(getAllSeoLandingSlugs());
  const seoRoutes = getAllSeoLandingSlugs().map((slug) => `/${slug}`);
  const pressRoutes = getAllPressSlugs().map((slug) => `/about/press/${slug}`);

  const allRoutes = [...new Set(["", ...CORE_ROUTES, ...SECONDARY_ROUTES, ...pressRoutes, ...seoRoutes])];
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    allRoutes.map((route) => ({
      url: sitemapUrl(locale, route),
      lastModified,
      changeFrequency: getChangeFrequency(route),
      priority: getPriority(route, seoSlugs),
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((alternateLocale) => [
              alternateLocale === "pt" ? "pt-PT" : "en",
              sitemapUrl(alternateLocale, route)
            ])
          ),
          "x-default": sitemapUrl("pt", route)
        }
      }
    }))
  );
}
