import Image from "next/image";
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
  supportingImage?: string;
  supportingAlt?: string;
};

export function ImageFeature(props: ImageFeatureProps) {
  const { eyebrow, title, body, image, alt, reverse = false, note, quiet = false, supportingImage, supportingAlt } = props;

  return (
    <section className={quiet ? "py-14 sm:py-20" : "py-20 sm:py-32"}>
      <div className="section-shell grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
        <div className={`${reverse ? "lg:order-2 lg:pl-8" : "lg:pr-8"} ${quiet ? "lg:self-start" : ""}`}>
          <SectionIntro eyebrow={eyebrow} title={title} body={body} />
          {note ? (
            <div className="mt-8 max-w-sm border-l border-gold/35 pl-5 text-sm leading-7 text-walnut">
              {note}
            </div>
          ) : null}
        </div>
        <MotionReveal
          delay={0.15}
          className={`grain relative min-h-[22rem] overflow-hidden rounded-[2rem] shadow-[0_28px_70px_rgba(92,68,48,0.16)] sm:min-h-[30rem] ${
            reverse ? "lg:order-1 lg:-ml-8" : "lg:-mr-8"
          } ${quiet ? "lg:min-h-[24rem]" : "lg:min-h-[34rem]"}`}
        >
          <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/28 via-transparent to-transparent" />
          {supportingImage ? (
            <div className="absolute bottom-6 right-6 hidden h-44 w-36 overflow-hidden rounded-[1.1rem] border border-cream/50 shadow-[0_20px_50px_rgba(92,68,48,0.22)] sm:block lg:h-56 lg:w-44">
              <Image
                src={supportingImage}
                alt={supportingAlt ?? ""}
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
          ) : null}
        </MotionReveal>
      </div>
    </section>
  );
}
