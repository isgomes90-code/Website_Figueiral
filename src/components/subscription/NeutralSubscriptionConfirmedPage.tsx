"use client";

import { useEffect, useState } from "react";
import { SubscriptionConfirmedView } from "@/components/subscription/SubscriptionConfirmedView";
import type { Locale } from "@/i18n/config";
import pt from "@/i18n/dictionaries/pt.json";
import en from "@/i18n/dictionaries/en.json";
import { detectBrowserLocale } from "@/lib/booking-success";

export function NeutralSubscriptionConfirmedPage() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    setLocale(detectBrowserLocale());
  }, []);

  const content = locale === "pt" ? pt.subscriptionConfirmed : en.subscriptionConfirmed;

  return <SubscriptionConfirmedView locale={locale} content={content} />;
}
