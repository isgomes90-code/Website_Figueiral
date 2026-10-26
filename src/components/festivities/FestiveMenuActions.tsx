"use client";

import Image from "next/image";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { festiveMenuImageSize } from "@/data/festivities";
import { trackAnalyticsEvent } from "@/lib/gtag";

export function FestiveMenuActions({
  menu,
  imageSrc,
  imageAlt,
  pdfHref,
  mailtoHref,
  viewPdf,
  requestInfo
}: {
  menu: "natal" | "reveillon";
  imageSrc: string;
  imageAlt: string;
  pdfHref: string;
  mailtoHref: string;
  viewPdf: string;
  requestInfo: string;
}) {
  function trackPdfOpen() {
    trackAnalyticsEvent("festive_pdf_open", { menu });
  }

  function trackInfoClick() {
    trackAnalyticsEvent("festive_info_click", { menu });
  }

  return (
    <div className="mx-auto flex max-w-[34rem] flex-col items-stretch">
      <a
        href={pdfHref}
        target="_blank"
        rel="noopener"
        onClick={trackPdfOpen}
        className="block overflow-hidden rounded-[1.75rem] shadow-[0_30px_90px_rgba(82,58,39,0.16)] ring-1 ring-walnut/10 transition duration-500 hover:-translate-y-0.5 hover:shadow-[0_36px_90px_rgba(82,58,39,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={festiveMenuImageSize.width}
          height={festiveMenuImageSize.height}
          sizes="(min-width: 768px) 544px, 100vw"
          quality={82}
          className="h-auto w-full"
        />
      </a>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <LuxuryButton href={mailtoHref} onClick={trackInfoClick} className="w-full sm:w-auto">
          {requestInfo}
        </LuxuryButton>
        <LuxuryButton
          href={pdfHref}
          variant="secondary"
          openInNewTab
          onClick={trackPdfOpen}
          className="w-full sm:w-auto"
        >
          {viewPdf}
        </LuxuryButton>
      </div>
    </div>
  );
}
