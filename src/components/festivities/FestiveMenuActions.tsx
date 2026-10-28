"use client";

import Image from "next/image";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { festiveMenuImageSize } from "@/data/festivities";
import { trackAnalyticsEvent } from "@/lib/gtag";

export function FestiveButtonRow({
  menu,
  mailtoHref,
  requestInfo,
  secondaryHref,
  secondaryLabel,
  secondaryTracksPdf = false,
  secondaryClassName = "",
  align = "start",
  wideUntil = "sm",
  className = ""
}: {
  menu: "natal" | "reveillon";
  mailtoHref: string;
  requestInfo: string;
  secondaryHref: string;
  secondaryLabel: string;
  secondaryTracksPdf?: boolean;
  secondaryClassName?: string;
  align?: "start" | "center";
  /** Até esta largura os botões ocupam a linha inteira. */
  wideUntil?: "sm" | "md";
  className?: string;
}) {
  function trackInfo() {
    trackAnalyticsEvent("festive_info_click", { menu });
  }

  function trackPdf() {
    trackAnalyticsEvent("festive_pdf_open", { menu });
  }

  const alignment = align === "center" ? (wideUntil === "md" ? "md:justify-center" : "sm:justify-center") : "";
  const direction =
    wideUntil === "md" ? "flex flex-col gap-3 md:flex-row md:flex-wrap" : "flex flex-col gap-3 sm:flex-row sm:flex-wrap";
  const width = wideUntil === "md" ? "w-full md:w-auto" : "w-full sm:w-auto";

  return (
    <div className={`${direction} ${alignment} ${className}`}>
      <LuxuryButton href={mailtoHref} onClick={trackInfo} className={width}>
        {requestInfo}
      </LuxuryButton>
      <LuxuryButton
        href={secondaryHref}
        variant="secondary"
        openInNewTab={secondaryTracksPdf}
        onClick={secondaryTracksPdf ? trackPdf : undefined}
        className={`${width} ${secondaryClassName}`}
      >
        {secondaryLabel}
      </LuxuryButton>
    </div>
  );
}

export function FestiveMenuFrame({
  menu,
  imageSrc,
  imageAlt,
  pdfHref,
  linkLabel
}: {
  menu: "natal" | "reveillon";
  imageSrc: string;
  imageAlt: string;
  pdfHref: string;
  linkLabel: string;
}) {
  return (
    <a
      href={pdfHref}
      target="_blank"
      rel="noopener"
      aria-label={linkLabel}
      onClick={() => trackAnalyticsEvent("festive_pdf_open", { menu })}
      className="mx-auto block max-w-[34rem] rounded-[2rem] border border-walnut/[0.09] bg-cream/60 p-3 shadow-[0_22px_56px_rgba(58,44,34,0.1)] transition duration-500 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      <span className="block overflow-hidden rounded-[1.5rem]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={festiveMenuImageSize.width}
          height={festiveMenuImageSize.height}
          sizes="(min-width: 768px) 544px, 100vw"
          quality={82}
          className="h-auto w-full"
        />
      </span>
    </a>
  );
}
