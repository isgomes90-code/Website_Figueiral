import type { Metadata } from "next";
import Image from "next/image";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { galleryImages } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  return pageMetadata({ ...dictionary.meta.pages.gallery, path: "/gallery", lang: locale });
}

export default async function GalleryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const gallery = dictionary.gallery;

  return (
    <section className="pt-36 pb-24 sm:pt-44">
      <div className="section-shell">
        <SectionIntro as="h1" eyebrow={gallery.intro.eyebrow} title={gallery.intro.title} body={gallery.intro.body} />
        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {galleryImages.map((image, index) => (
            <MotionReveal key={image.src} delay={(index % 3) * 0.06} className="mb-5 break-inside-avoid overflow-hidden rounded-[1.6rem] shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
              <div className={`grain relative border border-cream/60 ${image.tall ? "h-[520px]" : "h-[360px]"}`}>
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent" />
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
