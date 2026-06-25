"use client";

import { useEffect, useRef } from "react";
import { trackReservationPageConversion } from "@/lib/gtag";

/**
 * Dispara a conversão Google Ads uma vez por carregamento da página de reservas.
 * Proxy de conversão: chegada à página (widget ResDiary em domínio externo).
 */
export function ReservationsConversionTracker() {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackReservationPageConversion();
  }, []);

  return null;
}
