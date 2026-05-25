"use client";

import Image from "next/image";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { atmosphereEyebrowClasses, statementTitleClasses } from "@/lib/sectionTitle";
import { imageToneAtmosphere } from "@/lib/imageTone";

type AtmosphereMomentProps = {
  eyebrow: string;
  line: string;
  imageAlt: string;
  imageSrc?: string;
};

export function AtmosphereMoment({ eyebrow, line, imageAlt, imageSrc = "/images/hero/Alinhamento-mesas.webp" }: AtmosphereMomentProps) {
  return (
    <section className="relative min-h-[58vh] w-full overflow-hidden sm:min-h-[62vh] lg:min-h-[72vh]" aria-labelledby="atmosphere-moment-heading">
      {/* TODO: SUBSTITUIR — fotografia diurna da sala, toalhas verdes. Substituir por fotografia nocturna do serviço com iluminação ambiente. */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="100vw"
        loading="lazy"
        className={`object-cover object-[center_56%] sm:object-[center_60%] lg:object-[center_63%] xl:object-[center_64%] ${imageToneAtmosphere} scale-[1.05] translate-y-[2.5%]`}
        quality={82}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(22,19,16,0.5)_0%,rgba(26,23,18,0.27)_48%,rgba(28,26,22,0.13)_100%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_120%_at_22%_55%,transparent_0%,rgba(24,26,22,0.2)_100%)]" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-[82rem] items-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12 lg:pb-28 lg:pt-44">
        <MotionReveal className="max-w-xl" delay={0.08}>
          <p className={`text-sage/[0.86] ${atmosphereEyebrowClasses}`}>{eyebrow}</p>
          <h2
            id="atmosphere-moment-heading"
            className={`mt-6 text-cream sm:mt-8 ${statementTitleClasses}`}
            style={{ textShadow: "0 2px 28px rgba(12, 9, 7, 0.35)" }}
          >
            {line}
          </h2>
        </MotionReveal>
      </div>
    </section>
  );
}
