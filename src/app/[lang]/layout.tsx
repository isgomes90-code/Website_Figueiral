import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileReservationBar } from "@/components/layout/MobileReservationBar";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, locales, type Locale } from "@/i18n/config";

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

  const dictionary = await getDictionary(lang);
  const locale = lang as Locale;

  return (
    <>
      <Header dictionary={dictionary} lang={locale} />
      <main>{children}</main>
      <Footer dictionary={dictionary} lang={locale} />
      <MobileReservationBar dictionary={dictionary} lang={locale} />
    </>
  );
}
