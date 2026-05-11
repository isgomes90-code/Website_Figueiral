import { reviews } from "@/lib/site";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function Reviews() {
  return (
    <section className="relative overflow-hidden bg-[#130f0c] py-20 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/15 to-transparent" />
      <div className="absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-walnut/20 blur-3xl" />
      <div className="section-shell relative">
        <SectionIntro
          eyebrow="Trusted by guests"
          title="Long-standing hospitality, remembered long after the evening ends."
          align="center"
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {reviews.map((review, index) => (
            <MotionReveal
              key={review.source}
              delay={index * 0.08}
              className={`luxury-card rounded-[1.7rem] p-7 sm:p-8 ${index === 1 ? "md:mt-10" : ""}`}
            >
              <div className="mb-7 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.28em] text-gold/85">
                <span>{review.source}</span>
                <span>{review.rating}</span>
              </div>
              <blockquote className="font-display text-2xl leading-9 text-cream/80">&ldquo;{review.quote}&rdquo;</blockquote>
              <p className="mt-7 text-sm text-cream/50">{review.author}</p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
