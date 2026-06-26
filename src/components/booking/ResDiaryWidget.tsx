"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";
import { getResDiaryWidgetEmbedUrl } from "@/lib/resdiary";
import { siteConfig } from "@/lib/site";

const LOADER_SCRIPT_ID = "resdiary-widget-v2-loader";

function triggerResDiaryLoader() {
  const handler = window.onload;
  if (typeof handler === "function") {
    handler.call(window, new Event("load"));
  }
}

function ensureResDiaryLoader(onReady: () => void) {
  const existing = document.getElementById(LOADER_SCRIPT_ID);

  if (existing) {
    onReady();
    return;
  }

  const script = document.createElement("script");
  script.id = LOADER_SCRIPT_ID;
  script.src = siteConfig.booking.widgetLoaderScript;
  script.async = true;
  script.onload = onReady;
  document.body.appendChild(script);
}

/**
 * ResDiary standard widget embed (WidgetV2Loader.js).
 * Substitui iframe — permite redirect interno para página de sucesso.
 */
export function ResDiaryWidget({ className = "", lang }: { className?: string; lang: Locale }) {
  const widgetUrl = getResDiaryWidgetEmbedUrl(lang);

  useEffect(() => {
    const frame = document.getElementById("rd-widget-frame");
    const urlInput = document.getElementById("rdwidgeturl") as HTMLInputElement | null;

    if (!frame || !urlInput) {
      return;
    }

    urlInput.value = widgetUrl;
    frame.innerHTML = "";

    ensureResDiaryLoader(triggerResDiaryLoader);
  }, [widgetUrl]);

  return (
    <>
      <div id="rd-widget-frame" className={className} />
      <input id="rdwidgeturl" name="rdwidgeturl" type="hidden" value={widgetUrl} readOnly />
    </>
  );
}
