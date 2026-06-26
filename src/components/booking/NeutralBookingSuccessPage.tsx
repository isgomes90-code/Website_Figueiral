"use client";

import { useEffect, useState } from "react";
import { BookingSuccessView } from "@/components/booking/BookingSuccessView";
import type { Locale } from "@/i18n/config";
import pt from "@/i18n/dictionaries/pt.json";
import en from "@/i18n/dictionaries/en.json";
import { detectBrowserLocale } from "@/lib/booking-success";

export function NeutralBookingSuccessPage() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    setLocale(detectBrowserLocale());
  }, []);

  const success = locale === "pt" ? pt.bookingSuccess : en.bookingSuccess;

  return <BookingSuccessView locale={locale} success={success} />;
}
