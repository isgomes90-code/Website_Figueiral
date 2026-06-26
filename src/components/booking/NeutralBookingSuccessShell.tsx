"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileReservationBar } from "@/components/layout/MobileReservationBar";
import { GoogleTag } from "@/components/analytics/GoogleTag";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { MetaPixelPageView } from "@/components/analytics/MetaPixelPageView";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { detectBrowserLocale } from "@/lib/booking-success";
import { restaurantSchema } from "@/lib/seo";
import pt from "@/i18n/dictionaries/pt.json";
import en from "@/i18n/dictionaries/en.json";

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function NeutralBookingSuccessShell({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const detected = detectBrowserLocale();
    setLocale(detected);
    document.documentElement.lang = detected === "pt" ? "pt-PT" : "en";
  }, []);

  const dictionary = dictionaries[locale];

  return (
    <ConsentProvider labels={dictionary.consent} locale={locale}>
      <GoogleTag />
      <MetaPixel />
      <MetaPixelPageView />
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
    </ConsentProvider>
  );
}
