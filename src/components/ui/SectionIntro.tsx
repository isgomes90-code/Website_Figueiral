import { MotionReveal } from "@/components/ui/MotionReveal";

export function SectionIntro({
  eyebrow,
  title,
  body,
  align = "left"
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <MotionReveal className={align === "center" ? "mx-auto max-w-[48rem] text-center" : "max-w-[44rem]"}>
      <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-gold/90">{eyebrow}</p>
      <h2 className="font-display text-[2.55rem] leading-[1.03] text-cream text-balance sm:text-5xl lg:text-[3.75rem]">
        {title}
      </h2>
      {body ? (
        <p className={`mt-7 max-w-[38rem] text-base leading-8 text-cream/70 sm:text-[1.05rem] ${align === "center" ? "mx-auto" : ""}`}>
          {body}
        </p>
      ) : null}
    </MotionReveal>
  );
}
