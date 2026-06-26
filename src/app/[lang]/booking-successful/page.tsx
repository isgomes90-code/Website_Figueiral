import type { Metadata } from "next";
import { BookingSuccessView } from "@/components/booking/BookingSuccessView";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);

  return {
    ...pageMetadata({
      ...dictionary.meta.pages.bookingSuccess,
      path: "/booking-successful",
      lang: locale
    }),
    robots: { index: false, follow: false }
  };
}

export default async function BookingSuccessfulPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);

  return <BookingSuccessView locale={locale} success={dictionary.bookingSuccess} />;
}
