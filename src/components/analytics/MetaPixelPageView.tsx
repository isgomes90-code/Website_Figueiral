"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackMetaPageView } from "@/lib/meta-pixel";

/**
 * PageView adicional em navegações client-side.
 * O primeiro PageView vem do script de init; evita duplicar no mount inicial.
 */
export function MetaPixelPageView() {
  const pathname = usePathname();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    trackMetaPageView();
  }, [pathname]);

  return null;
}
