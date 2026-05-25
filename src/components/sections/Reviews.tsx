import Image from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { bodyNoteClasses, displayFigureClasses, editorialEyebrowClasses, reviewQuoteClasses } from "@/lib/sectionTitle";

const experienceImages = [
  "/images/people/Convicio-clientes-1.webp",
  "/images/people/Convicio-clientes-3-opt.webp",
  "/images/people/Rececao-clientes-opt.webp",
  "/images/people/Empratamento-2-opt.webp"
];

export function Reviews({ dictionary }: { dictionary: Dictionary }) {
  const reviews = dictionary.reviews;

  return (
    <section className="section-hospitality grain relative py-28 sm:py-40 lg:py-44">
      <div className="absolute inset-x-0 top-0 hairline-dusk opacity-90" />

      <div className="section-shell relative">
        <SectionIntro
          eyebrow={reviews.eyebrow}
          title={reviews.title}
          align="center"
          theme="dusk"
          eyebrowTone="institutional"
        />
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-20 lg:grid-cols-4 lg:gap-7">
          {experienceImages.map((image, index) => (
            <MotionReveal
              key={image}
              delay={index * 0.05}
              className="relative aspect-[4/5] min-h-[15.5rem] overflow-hidden rounded-[1.35rem] border border-white/[0.11] shadow-[0_20px_56px_rgba(8,6,6,0.45)] sm:min-h-[17rem]"
            >
              <Image
                src={image}
                alt={dictionary.seo.images.reviewMosaic[index] ?? dictionary.seo.images.reviews}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dusk/50 via-transparent to-transparent" />
            </MotionReveal>
          ))}
        </div>
        <div className="mt-16 grid gap-6 sm:mt-20 md:grid-cols-3 md:items-stretch md:gap-7">
          {reviews.items.map((review, index) => (
            <MotionReveal
              key={review.source}
              delay={index * 0.08}
              className="relative flex h-full flex-col rounded-[1.6rem] border border-white/[0.16] bg-[rgba(252,247,239,0.11)] px-7 py-8 shadow-[inset_0_3px_0_0_rgba(88,96,86,0.32),inset_0_1px_0_rgba(255,249,238,0.08)] backdrop-blur-[0.5px] sm:px-8 sm:py-9"
            >
              <div className="mb-7 flex shrink-0 flex-col gap-5 border-b border-white/[0.12] pb-6 sm:mb-8">
                <span className={`max-w-[14rem] leading-relaxed text-gold/[0.78] ${editorialEyebrowClasses}`}>
                  {review.source}
                </span>
                <span
                  className={`relative inline-flex items-center gap-3 pl-4 text-[2.2rem] text-cream before:absolute before:left-0 before:top-1 before:h-[2.65rem] before:w-[3px] before:rounded-full before:bg-brandGreen/55 before:content-[''] sm:text-[2.5rem] ${displayFigureClasses}`}
                >
                  {review.rating}
                </span>
              </div>
              <blockquote className={`flex-1 text-cream/[0.96] ${reviewQuoteClasses}`}>
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <p className={`mt-8 text-cream/[0.72] ${bodyNoteClasses}`}>
                {"url" in review && review.url ? (
                  <a href={review.url} target="_blank" rel="noopener noreferrer" className="transition hover:text-cream">
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
