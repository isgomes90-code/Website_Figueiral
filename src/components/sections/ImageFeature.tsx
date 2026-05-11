import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

type ImageFeatureProps = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  reverse?: boolean;
  note?: string;
  quiet?: boolean;
};

export function ImageFeature(props: ImageFeatureProps) {
  const { eyebrow, title, body, alt, reverse = false, note, quiet = false } = props;

  return (
    <section className={quiet ? "py-14 sm:py-20" : "py-20 sm:py-32"}>
      <div className="section-shell grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
        <div className={`${reverse ? "lg:order-2 lg:pl-8" : "lg:pr-8"} ${quiet ? "lg:self-start" : ""}`}>
          <SectionIntro eyebrow={eyebrow} title={title} body={body} />
          {note ? (
            <div className="mt-8 max-w-sm border-l border-gold/30 pl-5 text-sm leading-7 text-cream/50">
              {note}
            </div>
          ) : null}
        </div>
        <MotionReveal
          delay={0.15}
          className={`neutral-placeholder grain relative min-h-[22rem] overflow-hidden rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.32)] sm:min-h-[30rem] ${
            reverse ? "lg:order-1 lg:-ml-8" : "lg:-mr-8"
          } ${quiet ? "lg:min-h-[24rem]" : "lg:min-h-[34rem]"}`}
          aria-label={alt}
          role="img"
        >
          <div className="absolute inset-5 rounded-[1.5rem] border border-cream/10" />
          <div className="absolute -bottom-20 -right-12 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute left-7 top-7 text-[0.62rem] uppercase tracking-[0.32em] text-cream/40">
            Temporary visual study
          </div>
          <div className="absolute bottom-8 left-7 right-7 flex items-end justify-between gap-6">
            <span className="font-display text-4xl text-cream/70">Figueiral</span>
            <span className="hidden max-w-[12rem] text-right text-xs uppercase leading-5 tracking-[0.24em] text-gold/70 sm:block">
              Atmosphere placeholder
            </span>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
