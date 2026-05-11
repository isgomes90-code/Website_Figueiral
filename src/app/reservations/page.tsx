import type { Metadata } from "next";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Reservations | Restaurante Figueiral Almancil",
  description:
    "Reserve a table at Restaurante Figueiral in Almancil, a premium restaurant near Quinta do Lago and Vale do Lobo.",
  path: "/reservations"
});

export default function ReservationsPage() {
  return (
    <section className="pt-36 pb-24 sm:pt-44">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionIntro
          eyebrow="Reservations"
          title="Reserve a table for a refined Algarve dining experience."
          body="Use this page as the integration point for OpenTable, CoverManager or another reservation provider. The current placeholder preserves layout, conversion flow and SEO while the live widget is connected."
        />
        <MotionReveal className="luxury-card rounded-[2rem] p-6 sm:p-9">
          <div className="rounded-[1.4rem] border border-dashed border-gold/35 bg-charcoal/55 p-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Reservation widget</p>
            <h2 className="mt-5 font-display text-4xl text-cream">OpenTable / CoverManager</h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-cream/64">
              Embed the selected booking system here. Keep the mobile sticky CTA active so guests always have a clear
              reservation path.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <LuxuryButton href="tel:+351289399982">Call Now</LuxuryButton>
              <LuxuryButton href="/contact" variant="secondary">
                Contact
              </LuxuryButton>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
