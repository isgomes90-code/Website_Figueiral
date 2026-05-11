import type { Metadata } from "next";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact | Restaurante Figueiral Almancil Algarve",
  description:
    "Contact Restaurante Figueiral in Almancil, Algarve. Find opening hours, parking information, phone, email and location near Quinta do Lago and Vale do Lobo.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <section className="pt-36 pb-24 sm:pt-44">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Contact"
          title="Find us in Almancil, close to Quinta do Lago and Vale do Lobo."
          body="Plan your visit for premium picanha, wine and warm family hospitality in the heart of the Algarve."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <MotionReveal className="min-h-[440px] overflow-hidden rounded-[2rem] luxury-card">
            <iframe
              title="Map to Restaurante Figueiral in Almancil"
              src="https://www.google.com/maps?q=Almancil%20Algarve%20Portugal&output=embed"
              className="h-full min-h-[440px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </MotionReveal>
          <MotionReveal delay={0.1} className="luxury-card rounded-[2rem] p-8">
            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Details</p>
                <div className="mt-4 space-y-2 text-cream/72">
                  <p>{siteConfig.address.locality}, {siteConfig.address.region}, Portugal</p>
                  <p>{siteConfig.phone}</p>
                  <p>{siteConfig.email}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Opening hours</p>
                <div className="mt-4 space-y-2 text-cream/72">
                  {siteConfig.openingHours.map((hours) => (
                    <p key={hours}>{hours}</p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Parking</p>
                <p className="mt-4 text-cream/72">Convenient local parking available for lunch and dinner guests.</p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <LuxuryButton href="/reservations">Reserve</LuxuryButton>
                <LuxuryButton href="mailto:reservas@restaurantefigueiral.pt" variant="secondary">
                  Email Us
                </LuxuryButton>
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
