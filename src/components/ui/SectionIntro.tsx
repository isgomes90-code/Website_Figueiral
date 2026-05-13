import { MotionReveal } from "@/components/ui/MotionReveal";
import { sectionTitleClasses } from "@/lib/sectionTitle";

export function SectionIntro({
  eyebrow,
  title,
  body,
  align = "left",
  theme = "light",
  eyebrowTone = "gold"
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  /** `dusk`: texto sobre fundos escuros/quentes na secção. */
  theme?: "light" | "dusk";
  /** `institutional`: verde oliva/seco para harmonia com o logótipo (secções claras ou escuras). */
  eyebrowTone?: "gold" | "institutional";
}) {
  const dark = theme === "dusk";

  const eyebrowCls =
    eyebrowTone === "institutional"
      ? dark
        ? "text-sage/[0.82]"
        : "text-oliveMuted/[0.88]"
      : dark
        ? "text-gold/72"
        : "text-gold";

  return (
    <MotionReveal className={align === "center" ? "mx-auto max-w-[48rem] text-center" : "max-w-[44rem]"}>
      <p className={`mb-5 sm:mb-6 text-[0.65rem] font-semibold uppercase tracking-[0.36em] sm:text-[0.7rem] ${eyebrowCls}`}>{eyebrow}</p>
      <h2 className={`${sectionTitleClasses} ${dark ? "text-cream" : "text-charcoal"}`}>
        {title}
      </h2>
      {body ? (
        <p
          className={`mt-6 max-w-[38rem] text-[0.95rem] leading-[1.72] text-pretty sm:mt-7 sm:text-[1.05rem] sm:leading-[1.78] ${dark ? "text-cream/86" : "text-walnut"} ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {body}
        </p>
      ) : null}
    </MotionReveal>
  );
}
