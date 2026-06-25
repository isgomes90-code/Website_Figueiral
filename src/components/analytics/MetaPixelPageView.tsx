"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useConsent } from "@/components/consent/ConsentProvider";
import { trackMetaPageView } from "@/lib/meta-pixel";

/**
 * PageView adicional em navegações client-side.
 * O primeiro PageView vem do init; evita duplicar no mount inicial.
 */
export function MetaPixelPageView() {
  const pathname = usePathname();
  const { consent } = useConsent();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (!consent?.marketing) {
      return;
    }

    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    trackMetaPageView();
  }, [pathname, consent?.marketing]);

  return null;
}
