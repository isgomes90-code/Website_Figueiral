"use client";

import Image from "next/image";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { festiveMenuImageSize } from "@/data/festivities";
import { trackAnalyticsEvent } from "@/lib/gtag";
import { bodyTextClasses } from "@/lib/sectionTitle";
import { siteConfig, siteEmailHref, sitePhoneHref } from "@/lib/site";

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
    <div className="contents">
      <a
        href={pdfHref}
        target="_blank"
        rel="noopener"
        onClick={trackPdfOpen}
        className="order-3 mx-auto block w-full max-w-[34rem] overflow-hidden rounded-[1.85rem] shadow-[0_30px_90px_rgba(82,58,39,0.18)] ring-1 ring-gold/25 transition duration-500 hover:-translate-y-0.5 hover:shadow-[0_36px_90px_rgba(82,58,39,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:rounded-[2.1rem] lg:order-none lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mx-0 lg:mt-14 lg:max-w-none"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={festiveMenuImageSize.width}
          height={festiveMenuImageSize.height}
          sizes="(min-width: 1024px) 42vw, (min-width: 768px) 544px, 100vw"
          quality={82}
          priority
          className="h-auto w-full"
        />
      </a>

      <div className="order-2 mx-auto mt-8 w-full max-w-[34rem] lg:order-none lg:col-start-1 lg:row-start-2 lg:mx-0 lg:mt-1 lg:max-w-none">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
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
        <p className={`mt-5 text-center text-walnut lg:text-left ${bodyTextClasses}`}>
          <a
            href={sitePhoneHref()}
            className="underline decoration-gold/50 underline-offset-4 transition hover:text-charcoal"
          >
            {siteConfig.phone}
          </a>
          <span aria-hidden="true"> · </span>
          <a
            href={siteEmailHref()}
            className="underline decoration-gold/50 underline-offset-4 transition hover:text-charcoal"
          >
            {siteConfig.email}
          </a>
        </p>
      </div>
    </div>
  );
}
