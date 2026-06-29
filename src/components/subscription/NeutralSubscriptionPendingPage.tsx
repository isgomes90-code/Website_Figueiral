"use client";

import { useEffect, useState } from "react";
import { SubscriptionPendingView } from "@/components/subscription/SubscriptionPendingView";
import type { Locale } from "@/i18n/config";
import pt from "@/i18n/dictionaries/pt.json";
import en from "@/i18n/dictionaries/en.json";
import { detectBrowserLocale } from "@/lib/booking-success";

export function NeutralSubscriptionPendingPage() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    setLocale(detectBrowserLocale());
  }, []);

  const content = locale === "pt" ? pt.subscriptionPending : en.subscriptionPending;

  return <SubscriptionPendingView content={content} />;
}
