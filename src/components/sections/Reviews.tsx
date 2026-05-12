import Image from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

const experienceImages = [
  "/images/people/Convicio-clientes-1.webp",
  "/images/people/Convicio-clientes-3.webp",
  "/images/people/Rececao-clientes.webp",
  "/images/people/Empratamento-2.webp"
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
        />
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-20 lg:grid-cols-4 lg:gap-7">
          {experienceImages.map((image, index) => (
            <MotionReveal
              key={image}
              delay={index * 0.05}
              className="relative aspect-[4/5] min-h-[15.5rem] overflow-hidden rounded-[1.35rem] border border-white/10 shadow-[0_20px_56px_rgba(8,6,6,0.45)] sm:min-h-[17rem]"
            >
              <Image
                src={image}
                alt="Clientes e hospitalidade no Restaurante Figueiral"
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
              className="flex h-full flex-col rounded-[1.6rem] border border-white/16 bg-cream/[0.1] px-7 py-8 shadow-[inset_0_1px_0_rgba(255,249,238,0.06)] backdrop-blur-[0.5px] sm:px-8 sm:py-9"
            >
              <div className="mb-7 flex shrink-0 flex-wrap items-start justify-between gap-x-5 gap-y-4 sm:mb-8">
                <span className="max-w-[12rem] text-[0.64rem] font-semibold uppercase leading-relaxed tracking-[0.3em] text-gold/[0.78]">
                  {review.source}
                </span>
                <span className="font-display text-[1.72rem] font-medium leading-none tracking-[-0.02em] text-cream/[0.95] sm:text-[2rem]">
                  {review.rating}
                </span>
              </div>
              <blockquote className="flex-1 font-display text-xl leading-snug tracking-[-0.01em] text-cream/[0.94] sm:text-2xl sm:leading-9">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <p className="mt-8 text-sm leading-relaxed text-cream/62">{review.author}</p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
