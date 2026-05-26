import Image from "next/image";
import { atmosphereEyebrowClasses, statementTitleClasses } from "@/lib/sectionTitle";
import { imageToneAtmosphere } from "@/lib/imageTone";

type AtmosphereMomentProps = {
  eyebrow: string;
  line: string;
  imageAlt: string;
  imageSrc?: string;
};

export function AtmosphereMoment({ eyebrow, line, imageAlt, imageSrc = "/images/hero/Alinhamento-mesas.webp" }: AtmosphereMomentProps) {
  return (
    <section className="relative min-h-[50vh] w-full overflow-hidden sm:min-h-[52vh] lg:min-h-[58vh]" aria-labelledby="atmosphere-moment-heading">
      {/*
        TODO (editorial): Substituir fotografia diurna da sala por imagem noturna com iluminação ambiente.
        Contexto: a narrativa do hero é «noites quentes do Algarve» — esta cena diurna quebra o ritmo emocional.
        Não alterar automaticamente; decisão editorial + novo asset em public/images/hero/.
      */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="100vw"
        loading="lazy"
        className={`object-cover object-[center_56%] sm:object-[center_60%] lg:object-[center_63%] xl:object-[center_64%] ${imageToneAtmosphere} scale-[1.05] translate-y-[2.5%]`}
        quality={68}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(22,19,16,0.5)_0%,rgba(26,23,18,0.27)_48%,rgba(28,26,22,0.13)_100%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_120%_at_22%_55%,transparent_0%,rgba(24,26,22,0.2)_100%)]" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-[82rem] items-end px-5 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-28 lg:px-12 lg:pb-20 lg:pt-32">
        <div className="reveal-on-load max-w-xl">
          <p className={`text-gold/[0.82] ${atmosphereEyebrowClasses}`}>{eyebrow}</p>
          <h2
            id="atmosphere-moment-heading"
            className={`mt-6 text-cream sm:mt-8 ${statementTitleClasses}`}
            style={{ textShadow: "0 2px 28px rgba(12, 9, 7, 0.35)" }}
          >
            {line}
          </h2>
        </div>
      </div>
    </section>
  );
}
