import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NeutralBookingSuccessShell } from "@/components/booking/NeutralBookingSuccessShell";

export const metadata: Metadata = {
  title: "Booking Confirmed | Restaurante Figueiral",
  description: "Your table at Restaurante Figueiral is booked.",
  robots: { index: false, follow: false }
};

export default function BookingSuccessfulNeutralLayout({ children }: { children: ReactNode }) {
  return <NeutralBookingSuccessShell>{children}</NeutralBookingSuccessShell>;
}
