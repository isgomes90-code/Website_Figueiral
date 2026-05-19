import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { bodyTextClasses, cardTitleClasses, editorialEyebrowClasses } from "@/lib/sectionTitle";

type PressArchiveContent = {
  intro: {
    eyebrow: string;
    title: string;
    body: string;
  };
  cards: string[];
  archive: string;
  cardBody: string;
};

export function PressArchive({ press }: { press: PressArchiveContent }) {
  return (
    <section
      id="press"
      className="scroll-mt-32 border-t border-walnut/10 section-linen-breath py-20 sm:py-28 lg:py-32"
      aria-labelledby="about-press-heading"
    >
      <div className="section-shell">
        <SectionIntro
          eyebrow={press.intro.eyebrow}
          title={press.intro.title}
          body={press.intro.body}
          eyebrowTone="institutional"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {press.cards.map((title, index) => (
            <MotionReveal key={title} delay={index * 0.07} className="luxury-card rounded-[1.7rem] p-8">
              <p className={`text-gold ${editorialEyebrowClasses}`}>
                {press.archive} 0{index + 1}
              </p>
              <h2
                id={index === 0 ? "about-press-heading" : undefined}
                className={`mt-8 text-charcoal ${cardTitleClasses}`}
              >
                {title}
              </h2>
              <p className={`mt-5 text-walnut ${bodyTextClasses}`}>{press.cardBody}</p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
