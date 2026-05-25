import Image from "next/image";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { bodyNoteClasses, cardTitleClasses, editorialEyebrowClasses } from "@/lib/sectionTitle";
import { imageToneEditorial } from "@/lib/imageTone";

export type TeamFace = {
  name: string;
  role: string;
  quote: string;
  image: string;
};

type TeamEditorialGridProps = {
  faces: TeamFace[];
  imageAltSuffix: string;
};

export function TeamEditorialGrid({ faces, imageAltSuffix }: TeamEditorialGridProps) {
  return (
    <div className="col-span-full mt-14 grid w-full grid-cols-1 gap-10 sm:mt-16 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:mt-20 lg:grid-cols-3 lg:gap-x-7 xl:gap-x-8">
      {faces.map((face, index) => (
        <MotionReveal key={face.name} delay={0.08 + index * 0.06} className="group min-w-0">
          <figure className="w-full">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.35rem] border border-walnut/[0.08] bg-sand/40 shadow-[0_14px_40px_rgba(58,44,34,0.08)] transition-shadow duration-700 ease-out group-hover:shadow-[0_18px_48px_rgba(58,44,34,0.12)] sm:rounded-[1.45rem]">
              <Image
                src={face.image}
                alt={`${face.name}, ${face.role} — ${imageAltSuffix}`}
                fill
                sizes="(min-width: 1280px) 26vw, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                className={`object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] ${imageToneEditorial}`}
                loading="lazy"
              />
            </div>
            <figcaption className="mt-5 sm:mt-6">
              <p className={`text-charcoal ${cardTitleClasses}`}>{face.name}</p>
              <p className={`mt-2 text-gold ${editorialEyebrowClasses}`}>{face.role}</p>
              <p className={`mt-3 text-walnut/90 ${bodyNoteClasses}`}>{face.quote}</p>
            </figcaption>
          </figure>
        </MotionReveal>
      ))}
    </div>
  );
}
