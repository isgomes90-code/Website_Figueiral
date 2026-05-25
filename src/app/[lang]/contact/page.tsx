import type { Metadata } from "next";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, localizedPath, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { editorialEyebrowClasses } from "@/lib/sectionTitle";
import { siteConfig, siteEmailHref } from "@/lib/site";

const externalRel = "noopener noreferrer" as const;

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
        <SectionIntro as="h1" eyebrow={contact.intro.eyebrow} title={contact.intro.title} body={contact.intro.body} />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <MotionReveal className="overflow-hidden rounded-[2rem] luxury-card">
            <iframe
              title="Mapa — Restaurante Figueiral, Almancil"
              src={siteConfig.maps.embedUrl}
              className="min-h-[440px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <p className="border-t border-walnut/10 bg-cream/90 px-5 py-3 text-center text-[0.82rem]">
              <a
                href={siteConfig.maps.placeUrl}
                className="border-b border-transparent text-charcoal transition hover:border-brandGreen/48"
                target="_blank"
                rel={externalRel}
              >
                {contact.getDirections}
              </a>
            </p>
          </MotionReveal>
          <MotionReveal delay={0.1} className="luxury-card rounded-[2rem] p-8">
            <div className="space-y-8">
              <div>
                <p className={`text-gold ${editorialEyebrowClasses}`}>{contact.details}</p>
                <div className="mt-4 space-y-2 text-walnut">
                  <p>{siteConfig.address.street}</p>
                  <p>
                    {siteConfig.address.postalCode} {siteConfig.address.locality}, {siteConfig.address.region},
                    Portugal
                  </p>
                  <p>{siteConfig.phone}</p>
                  <p>{siteConfig.email}</p>
                </div>
              </div>
              <div>
                <p className={`text-gold ${editorialEyebrowClasses}`}>{contact.openingHours}</p>
                <div className="mt-4 space-y-2 text-walnut">
                  {contact.hours.map((hours) => (
                    <p key={hours}>{hours}</p>
                  ))}
                </div>
              </div>
              <div>
                <p className={`text-gold ${editorialEyebrowClasses}`}>{contact.parking}</p>
                <p className="mt-4 text-walnut">{contact.parkingText}</p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <LuxuryButton href={localizedPath(locale, "/reservations")}>{contact.reserve}</LuxuryButton>
                <LuxuryButton href={siteEmailHref()} variant="secondary">
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
