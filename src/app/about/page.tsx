import type { Metadata } from "next";
import { ImageFeature } from "@/components/sections/ImageFeature";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { images } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About | Family Restaurant Since 1986 in Almancil",
  description:
    "Learn the story of Restaurante Figueiral, a family restaurant in Almancil serving premium hospitality in the Algarve since 1986.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <>
      <section className="pt-36 pb-16 sm:pt-44">
        <div className="section-shell">
          <SectionIntro
            eyebrow="Since 1986"
            title="A family restaurant shaped by loyalty, service and the Algarve way of hosting."
            body="Figueiral has grown through consistency: welcoming regular guests, international travellers and local families with the same care, warmth and attention to detail."
          />
        </div>
      </section>
      <ImageFeature
        eyebrow="Family hospitality"
        title="Premium does not need to feel distant. Here, elegance still has a human voice."
        body="The philosophy is simple: excellent products, attentive service, relaxed confidence and a dining room that makes guests want to return year after year."
        image={images.family}
        alt="Family hospitality at Restaurante Figueiral"
        supportingImage="/images/people/Rececao-clientes.jpg"
        supportingAlt="Rececao de clientes no Restaurante Figueiral"
      />
      <section className="pb-24">
        <div className="section-shell grid gap-6 lg:grid-cols-3">
          {["Service excellence", "Long-term loyalty", "Algarve atmosphere"].map((title, index) => (
            <MotionReveal key={title} delay={index * 0.08} className="luxury-card rounded-[1.5rem] p-8">
              <h2 className="font-display text-3xl text-cream">{title}</h2>
              <p className="mt-5 text-sm leading-7 text-cream/64">
                {index === 0
                  ? "Attentive without being formal, polished without losing warmth."
                  : index === 1
                    ? "A restaurant remembered by families, returning travellers and local guests."
                    : "Mediterranean ease, evening light and an elegant relaxed rhythm in Almancil."}
              </p>
            </MotionReveal>
          ))}
        </div>
      </section>
    </>
  );
}
