import type { Metadata } from "next";
import Image from "next/image";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { menuCategories } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Menu | Restaurante Figueiral Almancil",
  description:
    "Explore the SEO-friendly HTML menu at Restaurante Figueiral in Almancil, featuring premium picanha, steak, Algarve fish, starters and desserts.",
  path: "/menu"
});

export default function MenuPage() {
  return (
    <section className="pt-36 pb-24 sm:pt-44">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Menu"
          title="A premium Algarve menu built around fire, produce and generous hospitality."
          body="The menu is structured for a refined dining experience and ready to be connected to a CMS such as Sanity. Dishes are shown as indexable HTML for stronger search visibility."
        />
        <MotionReveal className="mt-12 overflow-hidden rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.32)]">
          <div className="relative min-h-[20rem] sm:min-h-[28rem]">
            <Image
              src="/images/food/Picanha-grelha.jpg"
              alt="Picanha na grelha no Figueiral"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
            <div className="absolute bottom-6 left-6 max-w-sm sm:bottom-9 sm:left-9">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold">Fire and produce</p>
              <p className="mt-3 font-display text-3xl leading-tight text-cream sm:text-4xl">
                The menu begins with the rhythm of the grill.
              </p>
            </div>
            <div className="absolute bottom-6 right-6 hidden h-36 w-32 overflow-hidden rounded-[1rem] border border-cream/15 shadow-[0_20px_60px_rgba(0,0,0,0.4)] sm:block">
              <Image
                src="/images/food/Cogumelos-alho.JPG"
                alt="Cogumelos ao alho no Figueiral"
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
          </div>
        </MotionReveal>
        <div className="mt-14 grid gap-8">
          {menuCategories.map((category, index) => (
            <MotionReveal key={category.title} delay={index * 0.06} className="luxury-card rounded-[2rem] p-6 sm:p-9">
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">0{index + 1}</p>
                  <h2 className="mt-4 font-display text-4xl text-cream">{category.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-cream/62">{category.description}</p>
                </div>
                <div className="divide-y divide-cream/10">
                  {category.items.map((item) => (
                    <article key={item.name} className="py-6 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between gap-5">
                        <h3 className="font-display text-2xl text-cream">{item.name}</h3>
                        {item.highlight ? (
                          <span className="rounded-full bg-gold/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">
                            Signature
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm leading-7 text-cream/64">{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
