/**
 * Tokens tipográficos — classes CSS em globals.css (`.type-*`).
 * Não usar text-[…] solto: o preflight do Tailwind define h1–h6 com font-size:inherit.
 */

export const heroDisplayTitleClasses = "type-hero-title";
export const heroLeadClasses = "type-hero-lead";
export const pageTitleClasses = "type-page-title";
export const sectionTitleClasses = "type-section-title";
export const featureTitleClasses = "type-feature-title";
export const statementTitleClasses = "type-statement-title";
export const cardTitleClasses = "type-card-title";
export const editorialEyebrowClasses = "type-eyebrow";
export const bodyLeadClasses = "type-body-lead";
export const bodyTextClasses = "type-body";
export const bodyNoteClasses = "type-note";

export const displayFigureClasses =
  "font-display font-semibold leading-none tracking-[-0.03em] tabular-nums";

export const reviewQuoteClasses =
  "font-display text-[1.25rem] font-medium leading-[1.42] tracking-[-0.012em] sm:text-[1.38rem] sm:leading-[1.44]";

export const highlightCardTitleClasses =
  "font-sans text-[1rem] font-semibold leading-[1.68] tracking-[0.012em] sm:text-[1.04rem] sm:leading-[1.72]";

export const atmosphereEyebrowClasses =
  "text-[0.66rem] font-semibold uppercase tracking-[0.42em] sm:text-[0.7rem]";

export type TitleScale = "section" | "feature" | "page";

export function titleClassesFor(scale: TitleScale, as: "h1" | "h2"): string {
  if (as === "h1") return pageTitleClasses;
  if (scale === "feature") return featureTitleClasses;
  return sectionTitleClasses;
}
