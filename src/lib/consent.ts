/** Versão da política — incrementar para pedir novo consentimento. */
export const CONSENT_VERSION = "1";

export const CONSENT_STORAGE_KEY = "figueiral_cookie_consent";

export const CONSENT_OPEN_EVENT = "figueiral:open-cookie-preferences";

export type ConsentPreferences = {
  analytics: boolean;
  marketing: boolean;
};

export type StoredConsent = ConsentPreferences & {
  version: string;
  updatedAt: number;
};

export function getDefaultConsentPreferences(): ConsentPreferences {
  return { analytics: false, marketing: false };
}

export function readStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function writeStoredConsent(preferences: ConsentPreferences): StoredConsent {
  const stored: StoredConsent = {
    version: CONSENT_VERSION,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    updatedAt: Date.now()
  };

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
  return stored;
}

export function hasStoredConsentDecision(): boolean {
  return readStoredConsent() !== null;
}

export function applyGoogleConsentUpdate(preferences: ConsentPreferences) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("consent", "update", {
    analytics_storage: preferences.analytics ? "granted" : "denied",
    ad_storage: preferences.marketing ? "granted" : "denied",
    ad_user_data: preferences.marketing ? "granted" : "denied",
    ad_personalization: preferences.marketing ? "granted" : "denied"
  });
}

/** Script inline — consent default denied + re-aplicar preferências guardadas antes do gtag.js. */
export function getGoogleConsentBootstrapScript(): string {
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500
    });
    try {
      var raw = localStorage.getItem('${CONSENT_STORAGE_KEY}');
      if (raw) {
        var stored = JSON.parse(raw);
        if (stored && stored.version === '${CONSENT_VERSION}') {
          gtag('consent', 'update', {
            analytics_storage: stored.analytics ? 'granted' : 'denied',
            ad_storage: stored.marketing ? 'granted' : 'denied',
            ad_user_data: stored.marketing ? 'granted' : 'denied',
            ad_personalization: stored.marketing ? 'granted' : 'denied'
          });
        }
      }
    } catch (e) {}
  `;
}

export function clearMetaCookies() {
  if (typeof document === "undefined") {
    return;
  }

  const hostname = window.location.hostname;
  const domains = [hostname, `.${hostname}`];

  for (const name of ["_fbp", "_fbc"]) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    }
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}

export function hasAnalyticsConsent(): boolean {
  return readStoredConsent()?.analytics === true;
}

export function hasMarketingConsent(): boolean {
  return readStoredConsent()?.marketing === true;
}
