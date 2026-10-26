import { FestiveMenuActions } from "@/components/festivities/FestiveMenuActions";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { buildMailtoHref } from "@/lib/mailto";
import {
  bodyLeadClasses,
  bodyNoteClasses,
  bodyTextClasses,
  displayFigureClasses,
  editorialEyebrowClasses,
  highlightCardTitleClasses,
  pageTitleClasses
} from "@/lib/sectionTitle";
import { siteConfig, siteEmailHref, sitePhoneHref } from "@/lib/site";

type FestiveCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  dates: string;
  highlights: readonly string[];
  imageAlt: string;
  mailtoSubject: string;
  mailtoBody: string;
  note?: string;
};

export function FestiveEventPage({
  menu,
  copy,
  actions,
  imageSrc,
  pdfHref
}: {
  menu: "natal" | "reveillon";
  copy: FestiveCopy;
  actions: { requestInfo: string; viewPdf: string };
  imageSrc: string;
  pdfHref: string;
}) {
  const mailtoHref = buildMailtoHref(siteConfig.email, copy.mailtoSubject, copy.mailtoBody);

  return (
    <>
      <section className="pb-14 pt-32 sm:pb-16 sm:pt-40">
        <div className="section-shell">
          <MotionReveal className="max-w-[46rem]">
            <p className={`mb-5 text-gold ${editorialEyebrowClasses}`}>{copy.eyebrow}</p>
            <h1 className={`text-charcoal ${pageTitleClasses}`}>{copy.title}</h1>
            <p className={`mt-8 max-w-[36rem] text-walnut sm:mt-9 ${bodyLeadClasses}`}>{copy.subtitle}</p>
            <p className={`mt-6 text-charcoal ${bodyTextClasses}`}>{copy.dates}</p>
          </MotionReveal>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="section-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {copy.highlights.map((item, index) => (
            <MotionReveal key={item} delay={index * 0.05} className="luxury-card rounded-[1.5rem] p-7">
              <p className={`text-[2rem] text-gold sm:text-[2.25rem] ${displayFigureClasses}`}>0{index + 1}</p>
              <p className={`mt-6 text-charcoal ${highlightCardTitleClasses}`}>{item}</p>
            </MotionReveal>
          ))}
        </div>
        {copy.note ? (
          <div className="section-shell mt-8">
            <p className={`max-w-[42rem] text-walnut ${bodyNoteClasses}`}>{copy.note}</p>
          </div>
        ) : null}
      </section>

      <section className="pb-36 sm:pb-32 lg:pb-28">
        <div className="section-shell">
          <FestiveMenuActions
            menu={menu}
            imageSrc={imageSrc}
            imageAlt={copy.imageAlt}
            pdfHref={pdfHref}
            mailtoHref={mailtoHref}
            viewPdf={actions.viewPdf}
            requestInfo={actions.requestInfo}
          />
          <p className={`mt-8 text-center text-walnut ${bodyTextClasses}`}>
            <a
              href={sitePhoneHref()}
              className="underline decoration-gold/50 underline-offset-4 transition hover:text-charcoal"
            >
              {siteConfig.phone}
            </a>
            <span aria-hidden="true"> · </span>
            <a
              href={siteEmailHref()}
              className="underline decoration-gold/50 underline-offset-4 transition hover:text-charcoal"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
