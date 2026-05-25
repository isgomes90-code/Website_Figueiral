import type { Metadata } from "next";
import Image from "next/image";
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
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const dictionary = await getDictionary(locale);
  const gallery = dictionary.gallery;
  const galleryAlts = dictionary.seo.gallery;

  return (
    <section className="pt-36 pb-24 sm:pt-44">
      <div className="section-shell">
        <SectionIntro as="h1" eyebrow={gallery.intro.eyebrow} title={gallery.intro.title} body={gallery.intro.body} />
        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className="mb-5 break-inside-avoid overflow-hidden rounded-[1.6rem] border border-walnut/10 shadow-[0_16px_48px_rgba(58,44,34,0.1)]"
            >
              <div className={`relative bg-sand/40 ${image.tall ? "h-[520px]" : "h-[360px]"}`}>
                <Image
                  src={image.src}
                  alt={galleryAlts[index] ?? image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  loading="lazy"
                  quality={72}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/16 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
