import Image from "next/image";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TeamEditorialGrid, type TeamFace } from "@/components/sections/TeamEditorialGrid";
import { bodyNoteClasses } from "@/lib/sectionTitle";

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
  faces?: TeamFace[];
  facesImageAltSuffix?: string;
  /** Fundo envolvente da faixa onde o bloco vive — alterna ritmo vertical da página. */
  tone?: "none" | "warm" | "linen";
  /** Varia proporção/recorte editorial da fotografia dominante. */
  composition?: "standard" | "panorama" | "intimate";
  /** Classes Tailwind extras no `<Image>` principal (ex.: `object-[center_30%]`). */
  imageClassName?: string;
  eyebrowTone?: "gold" | "institutional";
};

const toneWrap: Record<NonNullable<ImageFeatureProps["tone"]>, string> = {
  none: "",
  warm: "section-warm-field",
  linen: "section-linen-breath"
};

const compositionMap: Record<NonNullable<ImageFeatureProps["composition"]>, string> = {
  standard: "relative min-h-[24rem] overflow-hidden rounded-[1.65rem] sm:min-h-[30rem] lg:rounded-[2rem]",
  panorama:
    "relative min-h-[27rem] overflow-hidden rounded-[1.35rem] sm:min-h-[34rem] lg:min-h-[min(40rem,58vh)] lg:rounded-[1.85rem]",
  intimate:
    "relative min-h-[26rem] overflow-hidden rounded-[1.85rem] sm:aspect-[5/6] sm:min-h-[32rem] sm:max-h-[min(560px,70vh)] lg:aspect-auto lg:min-h-[36rem] lg:max-h-none lg:rounded-[2rem]"
};

export function ImageFeature(props: ImageFeatureProps) {
  const {
    eyebrow,
    title,
    body,
    image,
    alt,
    reverse = false,
    note,
    quiet = false,
    supportingImage,
    supportingAlt,
    faces,
    facesImageAltSuffix = "",
    tone = "none",
    composition = "standard",
    imageClassName = "",
    eyebrowTone = "gold"
  } = props;

  const py = quiet ? "py-20 sm:py-28 lg:py-32" : "py-24 sm:py-36 lg:py-40";
  const toneClass = toneWrap[tone];
  const imageShell = compositionMap[composition];
  const mainImageFit =
    composition === "intimate"
      ? (imageClassName?.trim()
          ? `${imageClassName}`
          : "object-[center_40%] sm:object-[center_35%]")
      : imageClassName?.trim() || "object-center";

  return (
    <section className={`${py} ${toneClass}`}>
      <div className="section-shell grid gap-11 sm:gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16 xl:gap-[4.25rem]">
        <div className={`${reverse ? "lg:order-2 lg:pl-6 xl:pl-10" : "lg:pr-6 xl:pr-10"} ${quiet ? "lg:self-start" : ""}`}>
          <SectionIntro
            eyebrow={eyebrow}
            title={title}
            body={body}
            eyebrowTone={eyebrowTone}
            titleScale="feature"
          />
          {note ? (
            <div className={`mt-9 max-w-sm border-l border-brandGreen/35 pl-5 tracking-[0.01em] text-walnut sm:mt-10 ${bodyNoteClasses}`}>
              {note}
            </div>
          ) : null}
        </div>
        <MotionReveal
          delay={0.15}
          className={`grain shadow-[0_22px_58px_rgba(58,42,28,0.12)] transition-shadow duration-700 hover:shadow-[0_26px_64px_rgba(58,42,28,0.16)] ease-out ${imageShell} ${
            reverse ? "lg:order-1 lg:-ml-6 xl:-ml-10" : "lg:-mr-6 xl:-mr-10"
          }`}
        >
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className={`object-cover ${mainImageFit}`}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/24 via-charcoal/5 to-transparent" />
          {supportingImage ? (
            <div className="absolute bottom-5 right-5 hidden h-40 w-[7.25rem] overflow-hidden rounded-[1rem] border border-cream/45 shadow-[0_18px_44px_rgba(24,18,14,0.22)] sm:bottom-6 sm:right-6 sm:block sm:h-48 sm:w-36 lg:h-52 lg:w-40">
              <Image
                src={supportingImage}
                alt={supportingAlt ?? ""}
                fill
                sizes="200px"
                className="object-cover"
                loading="lazy"
              />
            </div>
          ) : null}
        </MotionReveal>
        {faces?.length ? <TeamEditorialGrid faces={faces} imageAltSuffix={facesImageAltSuffix} /> : null}
      </div>
    </section>
  );
}
