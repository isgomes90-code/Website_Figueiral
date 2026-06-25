"use client";

import { CONSENT_OPEN_EVENT } from "@/lib/consent";

export function ManageCookiesLink({
  label,
  className
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
      className={className}
    >
      {label}
    </button>
  );
}
