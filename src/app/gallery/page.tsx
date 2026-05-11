import type { Metadata } from "next";
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
              key={image}
              delay={(index % 3) * 0.06}
              className="mb-5 break-inside-avoid overflow-hidden rounded-[1.6rem] shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
            >
              <div
                className={`neutral-placeholder grain relative border border-cream/10 ${
                  index % 3 === 0 ? "h-[520px]" : "h-[360px]"
                }`}
                role="img"
                aria-label={`Temporary neutral atmosphere placeholder ${index + 1}`}
              >
                <div className="absolute inset-5 rounded-[1.1rem] border border-cream/10" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-5">
                  <span className="font-display text-3xl text-cream/70">Figueiral</span>
                  <span className="text-right text-[0.6rem] uppercase leading-5 tracking-[0.28em] text-gold/70">
                    Atmosphere study
                  </span>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
