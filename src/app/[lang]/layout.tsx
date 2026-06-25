import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileReservationBar } from "@/components/layout/MobileReservationBar";
import { GoogleAdsTag } from "@/components/analytics/GoogleAdsTag";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { restaurantSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  verification: {
    google: "Ug3eawv8aucN7Q93Sd2_z1mr1PClII5Ed6tMQHeowus"
  }
};

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700"],
  display: "swap",
  preload: false,
  adjustFontFallback: true
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "600"],
  display: "swap",
  preload: true,
  adjustFontFallback: true
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dictionary = await getDictionary(locale);
  const htmlLang = locale === "pt" ? "pt-PT" : "en";

  return (
    <html lang={htmlLang} className={`${display.variable} ${sans.variable}`}>
      <body className={`${sans.className} antialiased`}>
        <GoogleAdsTag />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cream focus:px-5 focus:py-3 focus:text-[0.7rem] focus:font-semibold focus:uppercase focus:tracking-[0.2em] focus:text-charcoal focus:shadow-luxury focus:outline-none focus:ring-2 focus:ring-gold"
        >
          {locale === "pt" ? "Saltar para o conteúdo" : "Skip to content"}
        </a>
        <JsonLd data={restaurantSchema(locale)} />
        <Header navigation={dictionary.navigation} logoAlt={dictionary.seo.images.logoHeader} lang={locale} />
        <main id="main-content">{children}</main>
        <Footer dictionary={dictionary} lang={locale} />
        <MobileReservationBar dictionary={dictionary} lang={locale} />
      </body>
    </html>
  );
}
