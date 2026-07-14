"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { trackBookingCompletedConversion } from "@/lib/gtag";

/**
 * Conversão real Google Ads — reserva concluída (redirect ResDiary).
 * Só dispara com consentimento Marketing e bookingReference válido na URL.
 */
export function BookingSuccessConversionTracker() {
  const searchParams = useSearchParams();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;

    const bookingReference = searchParams.get("bookingReference")?.trim() ?? "";
    if (!bookingReference) return;

    firedRef.current = true;
    trackBookingCompletedConversion(bookingReference);
  }, [searchParams]);

  return null;
}
