import { FestiveMenuActions } from "@/components/festivities/FestiveMenuActions";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { buildMailtoHref } from "@/lib/mailto";
import {
  bodyLeadClasses,
  bodyNoteClasses,
  bodyTextClasses,
  displayFigureClasses,
  editorialEyebrowClasses,
  pageTitleClasses
} from "@/lib/sectionTitle";
import { siteConfig } from "@/lib/site";

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
    <section className="section-warm-field pb-36 pt-32 sm:pb-32 sm:pt-40 lg:pb-28">
      <div className="section-shell relative z-[1]">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.88fr)] lg:gap-x-14 lg:gap-y-8 xl:gap-x-20">
          <MotionReveal className="order-1 max-w-[40rem] lg:order-none lg:col-start-1 lg:row-start-1">
            <p className={`text-gold ${editorialEyebrowClasses}`}>{copy.eyebrow}</p>
            <h1 className={`mt-5 text-charcoal ${pageTitleClasses}`}>{copy.title}</h1>
            <p className={`mt-7 max-w-[34rem] text-walnut sm:mt-8 ${bodyLeadClasses}`}>{copy.subtitle}</p>
            <p className={`mt-7 text-gold ${editorialEyebrowClasses}`}>{copy.dates}</p>
            <div className="hairline mt-6 max-w-[9.5rem]" />
          </MotionReveal>

          <FestiveMenuActions
            menu={menu}
            imageSrc={imageSrc}
            imageAlt={copy.imageAlt}
            pdfHref={pdfHref}
            mailtoHref={mailtoHref}
            viewPdf={actions.viewPdf}
            requestInfo={actions.requestInfo}
          />

          <MotionReveal delay={0.06} className="order-4 max-w-[40rem] lg:order-none lg:col-start-1 lg:row-start-3">
            <div className="atmospheric-panel rounded-[1.7rem] px-6 py-2 sm:rounded-[1.85rem] sm:px-8">
              <ul>
                {copy.highlights.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 border-b border-walnut/10 py-4 last:border-b-0 sm:gap-5 sm:py-[1.15rem]"
                  >
                    <span className={`pt-0.5 text-[1.05rem] text-gold/85 sm:text-[1.15rem] ${displayFigureClasses}`}>
                      0{index + 1}
                    </span>
                    <p className={`text-charcoal ${bodyTextClasses}`}>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
            {copy.note ? (
              <p className={`mt-6 max-w-[36rem] border-l-[3px] border-gold/55 pl-4 text-walnut ${bodyNoteClasses}`}>
                {copy.note}
              </p>
            ) : null}
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
