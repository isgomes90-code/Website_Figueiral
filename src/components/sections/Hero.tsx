import Image from "next/image";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export function Hero() {
  return (
    <section className="grain relative min-h-screen overflow-hidden bg-[#0f0d0b]">
      <Image
        src="/images/food/Picanha-grelha.jpg"
        alt="Picanha na grelha no Restaurante Figueiral"
        fill
        priority
        sizes="100vw"
        className="scale-105 object-cover object-center"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(182,144,84,0.14),transparent_24rem),linear-gradient(90deg,rgba(15,13,11,0.94),rgba(15,13,11,0.58),rgba(15,13,11,0.86))]" />
      <div className="absolute bottom-12 right-[7vw] hidden h-[58vh] w-[30vw] rounded-t-full border border-cream/10 bg-cream/[0.035] shadow-[0_34px_100px_rgba(0,0,0,0.34)] lg:block" />
      <div className="section-shell relative z-10 flex min-h-screen items-center pt-36 sm:pt-32">
        <div className="grid w-full gap-12 lg:grid-cols-[0.9fr_0.42fr] lg:items-end">
          <div className="max-w-4xl">
            <p className="mb-7 text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-gold">
              Almancil, Algarve - Since 1986
            </p>
            <h1 className="font-display text-[3.35rem] leading-[0.96] text-cream text-balance sm:text-7xl lg:text-[6.7rem]">
              Warm Algarve evenings, shaped by fire, wine and time.
            </h1>
            <p className="mt-8 max-w-[40rem] text-base leading-8 text-cream/70 sm:text-lg">
              A family table in Almancil where Mediterranean calm meets the generosity of picanha, Portuguese wine and
              long conversations that continue into the evening.
            </p>
            <div className="mt-11 flex flex-col gap-4 sm:flex-row">
              <LuxuryButton href="/reservations">Reserve Table</LuxuryButton>
              <LuxuryButton href="/menu" variant="secondary">
                View Menu
              </LuxuryButton>
            </div>
          </div>
          <div className="hidden border-l border-cream/15 pl-7 pb-6 lg:block">
            <p className="font-display text-3xl leading-tight text-cream/80">
              Hospitality carried quietly, consistently, since 1986.
            </p>
            <p className="mt-5 text-sm leading-7 text-cream/50">
              Close to Quinta do Lago and Vale do Lobo, rooted in the relaxed rhythm of the Algarve.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="section-shell">
          <div className="hairline" />
          <div className="flex flex-col gap-3 py-5 text-[0.65rem] uppercase tracking-[0.28em] text-cream/40 sm:flex-row sm:justify-between">
            <span>Fire</span>
            <span>Wine</span>
            <span>Algarve hospitality</span>
          </div>
        </div>
      </div>
    </section>
  );
}
