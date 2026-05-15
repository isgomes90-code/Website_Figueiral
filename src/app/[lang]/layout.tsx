import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileReservationBar } from "@/components/layout/MobileReservationBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { pageMetadata, restaurantSchema } from "@/lib/seo";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap"
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);

  return pageMetadata({
    title: dictionary.meta.homeTitle,
    description: dictionary.meta.homeDescription,
    lang: locale
  });
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
      <body className="font-sans antialiased">
        <JsonLd data={restaurantSchema()} />
        <Header dictionary={dictionary} lang={locale} />
        <main>{children}</main>
        <Footer dictionary={dictionary} lang={locale} />
        <MobileReservationBar dictionary={dictionary} lang={locale} />
      </body>
    </html>
  );
}
