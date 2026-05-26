import { MotionReveal } from "@/components/ui/MotionReveal";
import {
  bodyLeadClasses,
  editorialEyebrowClasses,
  titleClassesFor,
  type TitleScale
} from "@/lib/sectionTitle";

export function SectionIntro({
  eyebrow,
  title,
  body,
  align = "left",
  theme = "light",
  eyebrowTone = "gold",
  as = "h2",
  titleScale = "section"
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  /** `dusk`: texto sobre fundos escuros/quentes na secção. */
  theme?: "light" | "dusk";
  /** `institutional`: verde oliva/seco para harmonia com o logótipo (secções claras ou escuras). */
  eyebrowTone?: "gold" | "institutional";
  /** `h1` para título principal de página interior. */
  as?: "h1" | "h2";
  /** `feature` para blocos ImageFeature com título extra-generoso. */
  titleScale?: TitleScale;
}) {
  const dark = theme === "dusk";

  const eyebrowCls =
    eyebrowTone === "institutional"
      ? dark
        ? "text-sage/[0.82]"
        : "text-oliveMuted/[0.88]"
      : dark
        ? "text-gold"
        : "text-gold";

  const TitleTag = as;
  const titleClasses = titleClassesFor(titleScale, as);

  return (
    <MotionReveal className={align === "center" ? "mx-auto max-w-[48rem] text-center" : "max-w-[44rem]"}>
      <p className={`mb-3 sm:mb-4 ${editorialEyebrowClasses} ${eyebrowCls}`}>{eyebrow}</p>
      <TitleTag className={`${titleClasses} ${dark ? "text-cream" : "text-charcoal"}`}>
        {title}
      </TitleTag>
      {body ? (
        <p
          className={`mt-8 max-w-[36rem] sm:mt-9 lg:mt-10 ${bodyLeadClasses} ${dark ? "text-cream/88" : "text-walnut"} ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {body}
        </p>
      ) : null}
    </MotionReveal>
  );
}
