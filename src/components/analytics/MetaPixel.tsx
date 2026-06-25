"use client";

import { useEffect } from "react";
import { useConsent } from "@/components/consent/ConsentProvider";
import { initMetaPixel, revokeMetaPixel } from "@/lib/meta-pixel";

/**
 * Meta Pixel — carrega apenas com consentimento Marketing.
 * Sem noscript img (evita bypass de consentimento).
 */
export function MetaPixel() {
  const { consent } = useConsent();

  useEffect(() => {
    if (!consent) {
      return;
    }

    if (consent.marketing) {
      initMetaPixel();
      return;
    }

    revokeMetaPixel();
  }, [consent]);

  return null;
}
