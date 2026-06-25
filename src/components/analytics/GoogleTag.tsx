import Script from "next/script";
import {
  getGoogleTagLoaderId,
  GOOGLE_ADS_ID,
  GOOGLE_ANALYTICS_ID
} from "@/lib/gtag";

/**
 * Google Tag (gtag.js) — GA4 + Google Ads numa única inicialização.
 * Consent Mode defaults aplicados em GoogleConsentDefaults (beforeInteractive).
 */
export function GoogleTag() {
  const loaderId = getGoogleTagLoaderId();

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-config" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          ${GOOGLE_ANALYTICS_ID ? `gtag('config', '${GOOGLE_ANALYTICS_ID}');` : ""}
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  );
}
