import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NeutralBookingSuccessShell } from "@/components/booking/NeutralBookingSuccessShell";

export const metadata: Metadata = {
  title: "Confirm your subscription | Restaurante Figueiral",
  description: "Please confirm your email to complete your subscription to Restaurante Figueiral.",
  robots: { index: false, follow: false }
};

export default function SubscriptionPendingNeutralLayout({ children }: { children: ReactNode }) {
  return <NeutralBookingSuccessShell>{children}</NeutralBookingSuccessShell>;
}
