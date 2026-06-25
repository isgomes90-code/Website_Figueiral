"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { CookieBanner } from "@/components/consent/CookieBanner";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import {
  applyGoogleConsentUpdate,
  CONSENT_OPEN_EVENT,
  getDefaultConsentPreferences,
  readStoredConsent,
  writeStoredConsent,
  type ConsentPreferences,
  type StoredConsent
} from "@/lib/consent";
import { initMetaPixel, revokeMetaPixel } from "@/lib/meta-pixel";

type ConsentContextValue = {
  consent: StoredConsent | null;
  showBanner: boolean;
  preferencesOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (preferences: ConsentPreferences) => void;
  openPreferences: () => void;
  closePreferences: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return context;
}

function applyConsent(preferences: ConsentPreferences): StoredConsent {
  const stored = writeStoredConsent(preferences);
  applyGoogleConsentUpdate(preferences);

  if (preferences.marketing) {
    initMetaPixel();
  } else {
    revokeMetaPixel();
  }

  return stored;
}

export function ConsentProvider({
  children,
  labels,
  locale
}: {
  children: ReactNode;
  labels: Dictionary["consent"];
  locale: Locale;
}) {
  const [consent, setConsent] = useState<StoredConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    setConsent(stored);
    setShowBanner(!stored);
    setHydrated(true);
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setPreferencesOpen(true);
      setShowBanner(false);
    };

    window.addEventListener(CONSENT_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, handleOpen);
  }, []);

  const finalize = useCallback((preferences: ConsentPreferences) => {
    const stored = applyConsent(preferences);
    setConsent(stored);
    setShowBanner(false);
    setPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    finalize({ analytics: true, marketing: true });
  }, [finalize]);

  const rejectNonEssential = useCallback(() => {
    finalize(getDefaultConsentPreferences());
  }, [finalize]);

  const savePreferences = useCallback(
    (preferences: ConsentPreferences) => {
      finalize(preferences);
    },
    [finalize]
  );

  const openPreferences = useCallback(() => {
    setPreferencesOpen(true);
    setShowBanner(false);
  }, []);

  const closePreferences = useCallback(() => {
    setPreferencesOpen(false);
    if (!consent) {
      setShowBanner(true);
    }
  }, [consent]);

  const value = useMemo(
    () => ({
      consent: hydrated ? consent : null,
      showBanner: hydrated && showBanner,
      preferencesOpen,
      acceptAll,
      rejectNonEssential,
      savePreferences,
      openPreferences,
      closePreferences
    }),
    [
      hydrated,
      consent,
      showBanner,
      preferencesOpen,
      acceptAll,
      rejectNonEssential,
      savePreferences,
      openPreferences,
      closePreferences
    ]
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {(showBanner || preferencesOpen) && (
        <CookieBanner labels={labels} locale={locale} />
      )}
    </ConsentContext.Provider>
  );
}
