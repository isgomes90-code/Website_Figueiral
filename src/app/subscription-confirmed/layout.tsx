import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NeutralBookingSuccessShell } from "@/components/booking/NeutralBookingSuccessShell";

export const metadata: Metadata = {
  title: "Subscription confirmed | Restaurante Figueiral",
  description: "Your subscription to Restaurante Figueiral is confirmed.",
  robots: { index: false, follow: false }
};

export default function SubscriptionConfirmedNeutralLayout({ children }: { children: ReactNode }) {
  return <NeutralBookingSuccessShell>{children}</NeutralBookingSuccessShell>;
}
