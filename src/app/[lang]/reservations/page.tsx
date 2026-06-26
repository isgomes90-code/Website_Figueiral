import type { Metadata } from "next";
import { ReservationsConversionTracker } from "@/components/analytics/ReservationsConversionTracker";
import { ResDiaryWidget } from "@/components/booking/ResDiaryWidget";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, localizedPath, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { bodyTextClasses, cardTitleClasses, editorialEyebrowClasses } from "@/lib/sectionTitle";
import { sitePhoneHref } from "@/lib/site";

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
    <>
      <ReservationsConversionTracker />
      <section className="pt-36 pb-24 sm:pt-44">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionIntro
          as="h1"
          eyebrow={reservations.intro.eyebrow}
          title={reservations.intro.title}
          body={reservations.intro.body}
        />
        <MotionReveal className="luxury-card rounded-[2rem] p-4 sm:p-6">
          <div className="overflow-hidden rounded-[1.4rem] border border-walnut/10 bg-cream/40">
            <ResDiaryWidget className="min-h-[560px] w-full" lang={locale} />
          </div>
          <div className="mt-6 rounded-[1.2rem] border border-dashed border-gold/30 bg-cream/55 p-6 text-center sm:p-8">
            <p className={`text-gold ${editorialEyebrowClasses}`}>{reservations.widget.eyebrow}</p>
            <h2 className={`mt-4 text-charcoal ${cardTitleClasses}`}>{reservations.widget.fallbackTitle}</h2>
            <p className={`mx-auto mt-4 max-w-md text-walnut ${bodyTextClasses}`}>
              {reservations.widget.fallbackBody}
            </p>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
              <LuxuryButton href={sitePhoneHref()}>{reservations.widget.call}</LuxuryButton>
              <LuxuryButton href={localizedPath(locale, "/contact")} variant="secondary">
                {reservations.widget.contact}
              </LuxuryButton>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
    </>
  );
}
