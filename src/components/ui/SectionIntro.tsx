import { MotionReveal } from "@/components/ui/MotionReveal";

export function SectionIntro({
  eyebrow,
  title,
  body,
  align = "left",
  theme = "light"
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  /** `dusk`: texto sobre fundos escuros/quentes na secção. */
  theme?: "light" | "dusk";
}) {
  const dark = theme === "dusk";
  return (
    <MotionReveal className={align === "center" ? "mx-auto max-w-[48rem] text-center" : "max-w-[44rem]"}>
      <p
        className={`mb-5 sm:mb-6 text-[0.64rem] font-semibold uppercase tracking-[0.36em] sm:text-[0.68rem] ${
          dark ? "text-gold/72" : "text-gold"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-display leading-[1.06] text-balance text-[2.15rem] sm:text-[2.85rem] sm:leading-[1.04] lg:text-[3.6rem] ${
          dark ? "text-cream" : "text-charcoal"
        }`}
      >
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
