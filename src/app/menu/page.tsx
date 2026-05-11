import type { Metadata } from "next";
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
