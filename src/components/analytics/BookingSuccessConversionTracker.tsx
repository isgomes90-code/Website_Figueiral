"use client";

import { useEffect, useRef } from "react";
import { trackBookingCompletedConversion } from "@/lib/gtag";

/**
 * Conversão real Google Ads — reserva concluída (redirect ResDiary).
 * Só dispara com consentimento Marketing.
 */
export function BookingSuccessConversionTracker() {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackBookingCompletedConversion();
  }, []);

  return null;
}
