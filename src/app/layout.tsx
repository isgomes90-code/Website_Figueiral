import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileReservationBar } from "@/components/layout/MobileReservationBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, restaurantSchema } from "@/lib/seo";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap"
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = pageMetadata({
  title: "Restaurante Figueiral | Premium Restaurant in Almancil, Algarve",
  description:
    "Restaurante Figueiral is a premium family restaurant in Almancil, Algarve, known since 1986 for picanha, steak, wine and elegant hospitality."
});

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd data={restaurantSchema()} />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileReservationBar />
      </body>
    </html>
  );
}
