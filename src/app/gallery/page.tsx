import type { Metadata } from "next";
import Image from "next/image";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { galleryImages } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gallery | Restaurante Figueiral Atmosphere",
  description:
    "View the cinematic gallery for Restaurante Figueiral in Almancil, Algarve, featuring terrace atmosphere, dining, wine and signature picanha.",
  path: "/gallery"
});

export default function GalleryPage() {
  return (
    <section className="pt-36 pb-24 sm:pt-44">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Gallery"
          title="Cinematic moments from the table, the terrace and the glow of an Algarve evening."
          body="A visual expression of premium Mediterranean hospitality: fire, wine, atmosphere and generous service."
        />
        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {galleryImages.map((image, index) => (
            <MotionReveal
              key={image.src}
              delay={(index % 3) * 0.06}
              className="mb-5 break-inside-avoid overflow-hidden rounded-[1.6rem] shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
            >
              <div
                className={`grain relative border border-cream/10 ${
                  image.tall ? "h-[520px]" : "h-[360px]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/42 via-transparent to-transparent" />
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
