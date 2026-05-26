import Image from "next/image";
import Link from "next/link";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TeamEditorialGrid, type TeamFace } from "@/components/sections/TeamEditorialGrid";
import { bodyLeadClasses, bodyNoteClasses } from "@/lib/sectionTitle";

type ContextLink = {
  before: string;
  label: string;
  after: string;
  href: string;
};

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
  contextLink?: ContextLink;
  faces?: TeamFace[];
  facesImageAltSuffix?: string;
  /** Fundo envolvente da faixa onde o bloco vive — alterna ritmo vertical da página. */
  tone?: "none" | "warm" | "linen";
  /** Varia proporção/recorte editorial da fotografia dominante. */
  composition?: "standard" | "panorama" | "intimate";
  /** Classes Tailwind extras no `<Image>` principal (ex.: `object-[center_30%]`). */
  imageClassName?: string;
  eyebrowTone?: "gold" | "institutional";
  /** Reduz padding vertical — secções mais condensadas. */
  density?: "default" | "compact";
  /** `stacked`: imagem dominante em cima, texto abaixo (quebra o ritmo texto|imagem). */
  layout?: "split" | "stacked";
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
    contextLink,
    faces,
    facesImageAltSuffix = "",
    tone = "none",
    composition = "standard",
    imageClassName = "",
    eyebrowTone = "gold",
    density = "default",
    layout = "split"
  } = props;

  const py =
    density === "compact"
      ? quiet
        ? "py-14 sm:py-20 lg:py-24"
        : "py-16 sm:py-24 lg:py-28"
      : quiet
        ? "py-20 sm:py-28 lg:py-32"
        : "py-24 sm:py-36 lg:py-40";
  const toneClass = toneWrap[tone];
  const compactShell =
    density === "compact" && composition === "panorama"
      ? "relative min-h-[22rem] overflow-hidden rounded-[1.35rem] sm:min-h-[28rem] lg:min-h-[min(34rem,52vh)] lg:rounded-[1.85rem]"
      : null;
  const imageShell = compactShell ?? compositionMap[composition];
  const mainImageFit =
    composition === "intimate"
      ? (imageClassName?.trim()
          ? `${imageClassName}`
          : "object-[center_40%] sm:object-[center_35%]")
      : imageClassName?.trim() || "object-center";

  const textBlock = (
    <>
      <SectionIntro eyebrow={eyebrow} title={title} body={body} eyebrowTone={eyebrowTone} titleScale="feature" />
      {contextLink ? (
        <p className={`mt-5 max-w-[36rem] sm:mt-6 ${bodyLeadClasses} text-walnut`}>
          {contextLink.before}
          <Link
            href={contextLink.href}
            className="border-b border-brandGreen/35 text-charcoal transition hover:border-brandGreen/60 hover:text-brandGreen"
          >
            {contextLink.label}
          </Link>
          {contextLink.after}
        </p>
      ) : null}
      {note ? (
        <div className={`mt-7 max-w-sm border-l border-brandGreen/35 pl-5 tracking-[0.01em] text-walnut sm:mt-8 ${bodyNoteClasses}`}>
          {note}
        </div>
      ) : null}
    </>
  );

  const imageBlock = (
    <MotionReveal
      delay={0.12}
      className={`grain shadow-[0_22px_58px_rgba(58,42,28,0.12)] transition-shadow duration-700 hover:shadow-[0_26px_64px_rgba(58,42,28,0.16)] ease-out ${imageShell} ${
        layout === "split" ? (reverse ? "lg:order-1 lg:-ml-6 xl:-ml-10" : "lg:-mr-6 xl:-mr-10") : ""
      }`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 52vw, 100vw"
        className={`object-cover ${mainImageFit}`}
        loading="lazy"
        quality={72}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/24 via-charcoal/5 to-transparent" />
      {supportingImage && layout === "split" ? (
        <div className="absolute bottom-5 right-5 hidden h-40 w-[7.25rem] overflow-hidden rounded-[1rem] border border-cream/45 shadow-[0_18px_44px_rgba(24,18,14,0.22)] sm:bottom-6 sm:right-6 sm:block sm:h-48 sm:w-36 lg:h-52 lg:w-40">
          <Image
            src={supportingImage}
            alt={supportingAlt ?? ""}
            fill
            sizes="200px"
            className="object-cover"
            loading="lazy"
            quality={68}
          />
        </div>
      ) : null}
    </MotionReveal>
  );

  if (layout === "stacked") {
    return (
      <section className={`${py} ${toneClass}`}>
        <div className="section-shell">
          {imageBlock}
          <div className="mx-auto mt-10 max-w-2xl sm:mt-12">{textBlock}</div>
        </div>
        {faces?.length ? (
          <div className="section-shell mt-12">
            <TeamEditorialGrid faces={faces} imageAltSuffix={facesImageAltSuffix} />
          </div>
        ) : null}
      </section>
    );
  }

  return (
    <section className={`${py} ${toneClass}`}>
      <div className="section-shell grid gap-9 sm:gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14 xl:gap-[3.5rem]">
        <div className={`${reverse ? "lg:order-2 lg:pl-6 xl:pl-10" : "lg:pr-6 xl:pr-10"} ${quiet ? "lg:self-start" : ""}`}>
          {textBlock}
        </div>
        {imageBlock}
        {faces?.length ? <TeamEditorialGrid faces={faces} imageAltSuffix={facesImageAltSuffix} /> : null}
      </div>
    </section>
  );
}
