import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { getGoogleConsentBootstrapScript } from "@/lib/consent";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  verification: {
    google: "Ug3eawv8aucN7Q93Sd2_z1mr1PClII5Ed6tMQHeowus"
  }
};

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700"],
  display: "swap",
  preload: false,
  adjustFontFallback: true
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "600"],
  display: "swap",
  preload: true,
  adjustFontFallback: true
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT" className={`${display.variable} ${sans.variable}`}>
      <head>
        <script
          id="google-consent-defaults"
          dangerouslySetInnerHTML={{ __html: getGoogleConsentBootstrapScript() }}
        />
      </head>
      <body className={`${sans.className} antialiased`}>{children}</body>
    </html>
  );
}
