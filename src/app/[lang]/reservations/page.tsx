import type { Metadata } from "next";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, localizedPath, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  return pageMetadata({ ...dictionary.meta.pages.reservations, path: "/reservations", lang: locale });
}

export default async function ReservationsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  const reservations = dictionary.reservations;

  return (
    <section className="pt-36 pb-24 sm:pt-44">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionIntro
          eyebrow={reservations.intro.eyebrow}
          title={reservations.intro.title}
          body={reservations.intro.body}
        />
        <MotionReveal className="luxury-card rounded-[2rem] p-6 sm:p-9">
          <div className="rounded-[1.4rem] border border-dashed border-gold/35 bg-cream/55 p-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{reservations.widget.eyebrow}</p>
            <h2 className="mt-5 font-display text-4xl text-charcoal">{reservations.widget.title}</h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-walnut">{reservations.widget.body}</p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <LuxuryButton href="tel:+351289399982">{reservations.widget.call}</LuxuryButton>
              <LuxuryButton href={localizedPath(locale, "/contact")} variant="secondary">
                {reservations.widget.contact}
              </LuxuryButton>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
