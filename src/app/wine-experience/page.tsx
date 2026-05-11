import type { Metadata } from "next";
import { ImageFeature } from "@/components/sections/ImageFeature";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { images } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Wine Experience | Restaurante Figueiral Algarve",
  description:
    "Discover the wine experience at Restaurante Figueiral, a premium wine restaurant in Almancil, Algarve with pairing-led hospitality.",
  path: "/wine-experience"
});

const moments = [
  "Portuguese reds for premium picanha and steak",
  "Elegant whites for Algarve fish and terrace lunches",
  "Celebration bottles for romantic dinners and private occasions"
];

export default function WineExperiencePage() {
  return (
    <>
      <section className="pt-36 pb-16 sm:pt-44">
        <div className="section-shell">
          <SectionIntro
            eyebrow="Wine experience"
            title="A wine restaurant in the Algarve where pairing feels personal, not performative."
            body="The wine service at Figueiral is built around the table: what guests are celebrating, what they are eating and how the evening should unfold."
          />
        </div>
      </section>
      <ImageFeature
        eyebrow="Cellar atmosphere"
        title="Portuguese depth, Mediterranean brightness and bottles for memorable evenings."
        body="The list is imagined for expressive pairings with fire-grilled meat, Brazilian-style picanha, Algarve seafood and relaxed hospitality."
        image={images.wine}
        alt="Sommelier wine service at a premium Algarve restaurant"
      />
      <section className="pb-24">
        <div className="section-shell grid gap-5 md:grid-cols-3">
          {moments.map((moment, index) => (
            <MotionReveal key={moment} delay={index * 0.08} className="luxury-card rounded-[1.5rem] p-7">
              <p className="font-display text-5xl text-gold">0{index + 1}</p>
              <h2 className="mt-8 text-xl leading-8 text-cream">{moment}</h2>
            </MotionReveal>
          ))}
        </div>
      </section>
    </>
  );
}
