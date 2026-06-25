import type { Metadata } from "next";
import { ManageCookiesLink } from "@/components/consent/ManageCookiesLink";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { cardTitleClasses, editorialEyebrowClasses } from "@/lib/sectionTitle";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  return pageMetadata({ ...dictionary.meta.pages.privacy, path: "/privacy", lang: locale });
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  const privacy = dictionary.privacy;
  const sections = [
    privacy.sections.necessary,
    privacy.sections.analytics,
    privacy.sections.marketing,
    privacy.sections.control,
    privacy.sections.contact
  ];

  return (
    <section className="pt-36 pb-24 sm:pt-44">
      <div className="section-shell max-w-3xl">
        <SectionIntro as="h1" eyebrow={privacy.eyebrow} title={privacy.title} body={privacy.intro} />

        <div className="mt-12 space-y-8">
          {sections.map((section) => (
            <MotionReveal key={section.title} className="rounded-[1.35rem] border border-walnut/10 bg-cream/75 p-6 sm:p-7">
              <p className={`text-gold ${editorialEyebrowClasses}`}>{section.title}</p>
              <p className={`mt-3 leading-relaxed text-walnut ${cardTitleClasses}`}>{section.body}</p>
            </MotionReveal>
          ))}
        </div>

        <div className="mt-10">
          <ManageCookiesLink
            label={dictionary.footer.manageCookies}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-brandGreen/35 bg-brandGreen px-6 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-cream transition hover:brightness-[1.03]"
          />
        </div>
      </div>
    </section>
  );
}
