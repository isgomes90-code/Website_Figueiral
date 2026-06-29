import type { Metadata } from "next";
import { SubscriptionPendingView } from "@/components/subscription/SubscriptionPendingView";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);

  return {
    ...pageMetadata({
      ...dictionary.meta.pages.subscriptionPending,
      path: "/subscription-pending",
      lang: locale
    }),
    robots: { index: false, follow: false }
  };
}

export default async function SubscriptionPendingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);

  return <SubscriptionPendingView content={dictionary.subscriptionPending} />;
}
