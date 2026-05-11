import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { ImageFeature } from "@/components/sections/ImageFeature";
import { Reviews } from "@/components/sections/Reviews";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { images } from "@/lib/site";

const highlights = [
  { text: "Fire-led cooking with Mediterranean restraint", image: "/images/food/Picanha-grelha.jpg" },
  { text: "Portuguese wine chosen for long conversations", image: "/images/wine/Vinho-garrafeira.JPG" },
  { text: "An Almancil address trusted since 1986", image: "/images/terrace/Esplanada-1.JPG" },
  { text: "Family hospitality with international ease", image: "/images/people/Convicio-clientes-2.jpg" }
];

export default function Home() {
  return (
    <>
      <Hero />
      <section className="relative py-20 sm:py-32">
        <div className="section-shell">
          <SectionIntro
            eyebrow="Modern classic Algarve dining"
            title="A restaurant with the confidence to feel calm, generous and unmistakably local."
            body="Restaurante Figueiral brings together the warmth of a family dining room, the glow of the grill and the quiet refinement of a place that has welcomed locals and travellers for decades."
            align="center"
          />
          <div className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, index) => (
              <MotionReveal
                key={item.text}
                delay={index * 0.07}
                className={`luxury-card overflow-hidden rounded-[1.55rem] ${index % 2 === 1 ? "lg:mt-8" : ""}`}
              >
                <div className="relative h-40">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/72 to-transparent" />
                </div>
                <div className="p-6 sm:p-7">
                  <span className="font-display text-4xl text-gold/85">0{index + 1}</span>
                  <p className="mt-7 text-base leading-7 text-cream/75">{item.text}</p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>
      <section className="py-10 sm:py-16">
        <div className="section-shell">
          <MotionReveal className="mx-auto max-w-5xl text-center">
            <div className="hairline mb-12" />
            <p className="font-display text-4xl leading-tight text-cream/90 text-balance sm:text-6xl">
              The atmosphere is not staged. It is built slowly: one welcome, one bottle, one evening at a time.
            </p>
            <p className="mx-auto mt-7 max-w-2xl text-sm uppercase leading-7 tracking-[0.26em] text-gold/70">
              Almancil hospitality, carried with patience since 1986
            </p>
          </MotionReveal>
        </div>
      </section>
      <ImageFeature
        eyebrow="Signature picanha"
        title="Fire, rhythm and generosity, served without spectacle."
        body="The house signature remains Brazilian-style picanha: precise, abundant and deeply convivial. It is a premium meat experience, but the feeling is warmer than formal."
        image={images.picanha}
        alt="Premium grilled steak and picanha experience"
        note="The grill gives the evening its pulse; the room keeps it relaxed."
        supportingImage={images.fire}
        supportingAlt="Camarao ao alho preparado com fogo no Figueiral"
      />
      <ImageFeature
        eyebrow="Wine experience"
        title="Bottles chosen for conversation rather than display."
        body="From Portuguese icons to quiet discoveries, wine at Figueiral is there to lengthen the evening: pairing with fire, softening the pace and giving each table its own rhythm."
        image={images.wine}
        alt="Wine service and cellar atmosphere"
        note="A list for regulars, travellers, celebrations and those who prefer to be guided."
        supportingImage="/images/wine/Vinho-detalhe-2.jpg"
        supportingAlt="Detalhe de garrafa de vinho no Figueiral"
        reverse
      />
      <section className="py-14 sm:py-24">
        <div className="section-shell">
          <MotionReveal className="atmospheric-panel rounded-[2.2rem] px-6 py-14 shadow-[0_34px_100px_rgba(0,0,0,0.34)] sm:px-12 lg:px-16">
            <div className="grid gap-12 lg:grid-cols-[0.62fr_1fr] lg:items-end">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-gold/85">Legacy</p>
                <p className="mt-5 font-display text-7xl leading-none text-cream sm:text-8xl">1986</p>
              </div>
              <div>
                <h2 className="font-display text-4xl leading-tight text-cream text-balance sm:text-5xl">
                  Longevity, here, is not nostalgia. It is the luxury of being trusted.
                </h2>
                <p className="mt-7 max-w-2xl text-base leading-8 text-cream/70">
                  Figueiral has grown through consistency: familiar faces, returning families, attentive service and
                  the kind of welcome that feels polished without becoming distant.
                </p>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>
      <ImageFeature
        eyebrow="Terrace atmosphere"
        title="An Algarve evening with room to breathe."
        body="Warm light, attentive service and the ease of Almancil create a dining atmosphere close to Quinta do Lago and Vale do Lobo that feels international, but never anonymous."
        image={images.terrace}
        alt="Mediterranean restaurant terrace atmosphere"
        supportingImage={images.terraceAlt}
        supportingAlt="Outra perspetiva da esplanada do Figueiral"
        quiet
      />
      <Reviews />
      <section className="py-20 sm:py-32">
        <div className="section-shell">
          <MotionReveal className="atmospheric-panel rounded-[2.4rem] px-6 py-16 text-center shadow-[0_34px_100px_rgba(0,0,0,0.34)] sm:px-12 sm:py-20">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-gold/85">Reservations</p>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl leading-tight text-cream text-balance sm:text-6xl">
              Reserve a table for fire, wine and an unhurried Algarve evening.
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-cream/60">
              For romantic dinners, family celebrations and guests staying near Almancil, Quinta do Lago or Vale do
              Lobo.
            </p>
            <div className="mt-10">
              <LuxuryButton href="/reservations">Reserve Table</LuxuryButton>
            </div>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}
