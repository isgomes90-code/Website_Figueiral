import type { Metadata } from "next";
import Image from "next/image";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Press | Restaurante Figueiral Algarve",
  description:
    "Press and editorial archive for Restaurante Figueiral, a long-standing premium restaurant in Almancil, Algarve.",
  path: "/press"
});

const pressCards = [
  "Future magazine features",
  "Restaurant guides and awards",
  "Scanned articles and archive pieces"
];

export default function PressPage() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44">
      <Image
        src="/images/wine/Vinho-detalhe-2.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-charcoal/88" />
      <div className="section-shell relative">
        <SectionIntro
          eyebrow="Press"
          title="An editorial archive for a restaurant with a long Algarve story."
          body="A curated space for future press mentions, scanned magazine articles, restaurant guides and archive pieces connected to Figueiral's reputation since 1986."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pressCards.map((title, index) => (
            <MotionReveal key={title} delay={index * 0.07} className="luxury-card rounded-[1.7rem] p-8">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold">Archive 0{index + 1}</p>
              <h2 className="mt-8 font-display text-3xl leading-tight text-cream">{title}</h2>
              <p className="mt-5 text-sm leading-7 text-cream/60">
                Reserved for carefully selected press material, presented with restraint and editorial clarity.
              </p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
