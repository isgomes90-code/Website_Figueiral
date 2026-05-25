import type { MetadataRoute } from "next";
import { isLocalTestSite, siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (isLocalTestSite) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/"
      }
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteConfig.url}/sitemap.xml`
  };
}
