import type { Dictionary } from "@/i18n/getDictionary";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { bodyNoteClasses, editorialEyebrowClasses, reviewQuoteClasses } from "@/lib/sectionTitle";

export function Reviews({ dictionary }: { dictionary: Dictionary }) {
  const reviews = dictionary.reviews;

  return (
    <section className="editorial-paper relative border-t border-walnut/[0.07] py-20 sm:py-28">
      <div className="section-shell">
        <SectionIntro eyebrow={reviews.eyebrow} title={reviews.title} align="center" />
        <div className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-3 md:gap-6">
          {reviews.items.map((review, index) => (
            <MotionReveal
              key={review.source + index}
              delay={index * 0.06}
              className="flex h-full flex-col rounded-[1.35rem] border border-walnut/[0.1] bg-[linear-gradient(168deg,rgba(252,248,242,0.92),rgba(241,231,217,0.55))] px-6 py-7 shadow-[0_10px_32px_rgba(58,44,34,0.045)] sm:px-7 sm:py-8"
            >
              <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-walnut/[0.08] pb-4">
                <span className={`text-gold/[0.82] ${editorialEyebrowClasses}`}>{review.source}</span>
                <span className="font-display text-[1.35rem] tracking-[-0.02em] text-charcoal/90">{review.rating}</span>
              </div>
              <blockquote className={`flex-1 text-walnut ${reviewQuoteClasses}`}>&ldquo;{review.quote}&rdquo;</blockquote>
              <p className={`mt-6 text-walnut/70 ${bodyNoteClasses}`}>
                {"url" in review && review.url ? (
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-brandGreen/25 transition hover:border-brandGreen/50 hover:text-charcoal"
                  >
                    {review.author}
                  </a>
                ) : (
                  review.author
                )}
              </p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
