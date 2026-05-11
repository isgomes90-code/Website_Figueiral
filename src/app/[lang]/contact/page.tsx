import type { Metadata } from "next";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, localizedPath, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  return pageMetadata({ ...dictionary.meta.pages.contact, path: "/contact", lang: locale });
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  const contact = dictionary.contact;

  return (
    <section className="pt-36 pb-24 sm:pt-44">
      <div className="section-shell">
        <SectionIntro eyebrow={contact.intro.eyebrow} title={contact.intro.title} body={contact.intro.body} />
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
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{contact.details}</p>
                <div className="mt-4 space-y-2 text-walnut">
                  <p>{siteConfig.address.locality}, {siteConfig.address.region}, Portugal</p>
                  <p>{siteConfig.phone}</p>
                  <p>{siteConfig.email}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{contact.openingHours}</p>
                <div className="mt-4 space-y-2 text-walnut">
                  {contact.hours.map((hours) => (
                    <p key={hours}>{hours}</p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{contact.parking}</p>
                <p className="mt-4 text-walnut">{contact.parkingText}</p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <LuxuryButton href={localizedPath(locale, "/reservations")}>{contact.reserve}</LuxuryButton>
                <LuxuryButton href="mailto:reservas@restaurantefigueiral.pt" variant="secondary">
                  {contact.emailUs}
                </LuxuryButton>
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
