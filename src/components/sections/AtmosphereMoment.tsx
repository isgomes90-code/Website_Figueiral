"use client";

import Image from "next/image";
import { MotionReveal } from "@/components/ui/MotionReveal";

type AtmosphereMomentProps = {
  eyebrow: string;
  line: string;
  imageAlt: string;
  imageSrc?: string;
};

export function AtmosphereMoment({ eyebrow, line, imageAlt, imageSrc = "/images/hero/Alinhamento-mesas.webp" }: AtmosphereMomentProps) {
  return (
    <section className="relative min-h-[58vh] w-full overflow-hidden sm:min-h-[62vh] lg:min-h-[72vh]" aria-labelledby="atmosphere-moment-heading">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="100vw"
        loading="lazy"
        className="object-cover object-[center_72%] brightness-[0.92] contrast-[0.96] saturate-[0.88]"
        quality={82}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(18,12,9,0.66)_0%,rgba(22,16,12,0.34)_46%,rgba(28,22,18,0.2)_100%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_120%_at_20%_50%,transparent_0%,rgba(12,9,8,0.35)_100%)]" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-[82rem] items-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12 lg:pb-28 lg:pt-44">
        <MotionReveal className="max-w-xl" delay={0.08}>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-gold/70 sm:text-[0.68rem]">{eyebrow}</p>
          <h2
            id="atmosphere-moment-heading"
            className="mt-6 font-display text-[2rem] leading-[1.22] tracking-[-0.01em] text-cream text-balance sm:mt-8 sm:text-[2.85rem] sm:leading-[1.18] lg:text-[3.35rem]"
          >
            {line}
          </h2>
        </MotionReveal>
      </div>
    </section>
  );
}
