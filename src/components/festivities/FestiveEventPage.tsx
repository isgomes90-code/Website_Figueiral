import Image from "next/image";
import { AtmosphereMoment } from "@/components/sections/AtmosphereMoment";
import { ImageFeature } from "@/components/sections/ImageFeature";
import { FestiveButtonRow, FestiveMenuFrame } from "@/components/festivities/FestiveMenuActions";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { festiveScenes } from "@/data/festivities";
import { buildMailtoHref } from "@/lib/mailto";
import {
  bodyLeadClasses,
  bodyNoteClasses,
  bodyTextClasses,
  cardTitleClasses,
  displayFigureClasses,
  editorialEyebrowClasses
} from "@/lib/sectionTitle";
import { imageToneEditorial } from "@/lib/imageTone";
import { siteConfig, siteEmailHref, sitePhoneHref } from "@/lib/site";

type FestiveCopy = {
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    dates: string;
    scrollCta: string;
  };
  facts: {
    items: readonly { label: string; value: string }[];
    line: string;
  };
  feature: {
    eyebrow: string;
    title: string;
    body: string;
    note: string;
  };
  menus: {
    eyebrow: string;
    title: string;
    body: string;
    hint: string;
  };
  steps: {
    eyebrow: string;
    title: string;
    items: readonly { title: string; body: string }[];
  };
  moment: {
    eyebrow: string;
    line: string;
  };
  close: {
    title: string;
    body: string;
    closed?: string;
  };
  imageAlt: string;
  mailtoSubject: string;
  mailtoBody: string;
};

type Scene = (typeof festiveScenes)["natal"] | (typeof festiveScenes)["reveillon"];

const factBorders = [
  "border-r border-b lg:border-b-0",
  "border-b lg:border-r lg:border-b-0",
  "border-r",
  ""
];

export function FestiveEventPage({
  menu,
  copy,
  actions,
  scene,
  alts,
  imageSrc,
  pdfHref
}: {
  menu: "natal" | "reveillon";
  copy: FestiveCopy;
  actions: { requestInfo: string; viewPdf: string };
  scene: Scene;
  alts: {
    hero: string;
    heroSupporting: string;
    feature: string;
    featureSupporting: string;
    moment: string;
  };
  imageSrc: string;
  pdfHref: string;
}) {
  const mailtoHref = buildMailtoHref(siteConfig.email, copy.mailtoSubject, copy.mailtoBody);
  const scrollHref = `#${scene.anchor}`;
  const momentObjectClassName = "momentObjectClassName" in scene ? scene.momentObjectClassName : undefined;

  return (
    <>
      <section className="pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.78fr_1.05fr] lg:items-end">
          <div>
            <SectionIntro as="h1" eyebrow={copy.hero.eyebrow} title={copy.hero.title} body={copy.hero.body} />
            <p className={`mt-8 text-gold ${editorialEyebrowClasses}`}>{copy.hero.dates}</p>
            <FestiveButtonRow
              menu={menu}
              mailtoHref={mailtoHref}
              requestInfo={actions.requestInfo}
              secondaryHref={scrollHref}
              secondaryLabel={copy.hero.scrollCta}
              className="mt-8"
            />
          </div>
          <MotionReveal delay={0.08} className="relative">
            <figure className="relative min-h-[26rem] overflow-hidden rounded-[2rem] border border-walnut/[0.09] shadow-[0_22px_56px_rgba(58,44,34,0.1)] sm:min-h-[32rem] lg:min-h-[34rem]">
              <Image
                src={scene.heroSrc}
                alt={alts.hero}
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className={`object-cover object-[center_50%] ${imageToneEditorial}`}
              />
              <div className="absolute bottom-5 right-5 hidden h-40 w-[7.25rem] overflow-hidden rounded-[1rem] border border-cream/45 shadow-[0_18px_44px_rgba(24,18,14,0.22)] sm:right-6 sm:block sm:h-48 sm:w-36 lg:bottom-6 lg:h-52 lg:w-40">
                <Image src={scene.heroSupportingSrc} alt={alts.heroSupporting} fill sizes="200px" className="object-cover" />
              </div>
            </figure>
          </MotionReveal>
        </div>
      </section>

      <section className="section-linen-breath py-14 sm:py-20">
        <div className="section-shell">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {copy.facts.items.map((item, index) => (
              <div key={item.label} className={`border-gold/25 px-5 py-7 sm:px-7 sm:py-8 ${factBorders[index] ?? ""}`}>
                <p className={`text-gold ${editorialEyebrowClasses}`}>{item.label}</p>
                <p className={`mt-4 text-[1.5rem] text-charcoal sm:text-[2rem] ${displayFigureClasses}`} style={{ lineHeight: 1.15 }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <p className={`mx-auto mt-10 max-w-[40rem] text-center text-walnut sm:mt-12 ${bodyLeadClasses}`}>{copy.facts.line}</p>
        </div>
      </section>

      <ImageFeature
        eyebrow={copy.feature.eyebrow}
        title={copy.feature.title}
        body={copy.feature.body}
        note={copy.feature.note}
        image={scene.featureSrc}
        alt={alts.feature}
        supportingImage={scene.featureSupportingSrc}
        supportingAlt={alts.featureSupporting}
        tone={scene.featureTone}
        imageClassName={`object-center ${imageToneEditorial}`}
        density="compact"
      />

      <section id={scene.anchor} className="scroll-mt-28 pb-16 pt-4 sm:pb-20 sm:pt-8">
        <div className="section-shell">
          <SectionIntro align="center" eyebrow={copy.menus.eyebrow} title={copy.menus.title} body={copy.menus.body} />
          <div className="mt-12 sm:mt-14">
            <FestiveMenuFrame
              menu={menu}
              imageSrc={imageSrc}
              imageAlt={copy.imageAlt}
              pdfHref={pdfHref}
              linkLabel={copy.menus.hint}
            />
            <p className={`mt-5 text-center text-walnut ${bodyNoteClasses}`}>{copy.menus.hint}</p>
            <FestiveButtonRow
              menu={menu}
              mailtoHref={mailtoHref}
              requestInfo={actions.requestInfo}
              secondaryHref={pdfHref}
              secondaryLabel={actions.viewPdf}
              secondaryTracksPdf
              align="center"
              className="mt-8"
            />
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="section-shell">
          <SectionIntro eyebrow={copy.steps.eyebrow} title={copy.steps.title} />
          <div className="mt-12 grid gap-5 md:grid-cols-3 sm:mt-14">
            {copy.steps.items.map((item, index) => (
              <MotionReveal key={item.title} delay={index * 0.08} className="luxury-card rounded-[1.5rem] p-7">
                <p className={`text-[2.75rem] text-gold sm:text-[3.25rem] ${displayFigureClasses}`}>0{index + 1}</p>
                <h3 className={`mt-8 text-charcoal ${cardTitleClasses}`}>{item.title}</h3>
                <p className={`mt-5 text-walnut ${bodyTextClasses}`}>{item.body}</p>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <AtmosphereMoment
        eyebrow={copy.moment.eyebrow}
        line={copy.moment.line}
        imageAlt={alts.moment}
        imageSrc={scene.momentSrc}
        objectClassName={momentObjectClassName}
      />

      <section className="pb-36 pt-16 sm:pb-32 sm:pt-24 lg:pb-28">
        <div className="section-shell">
          <SectionIntro align="center" eyebrow={copy.hero.eyebrow} title={copy.close.title} body={copy.close.body} />
          <FestiveButtonRow
            menu={menu}
            mailtoHref={mailtoHref}
            requestInfo={actions.requestInfo}
            secondaryHref={pdfHref}
            secondaryLabel={actions.viewPdf}
            secondaryTracksPdf
            align="center"
            className="mt-10"
          />
          <p className={`mt-8 text-center text-walnut ${bodyTextClasses}`}>
            <a href={sitePhoneHref()} className="underline decoration-gold/50 underline-offset-4 transition hover:text-charcoal">
              {siteConfig.phone}
            </a>
            <span aria-hidden="true"> · </span>
            <a href={siteEmailHref()} className="underline decoration-gold/50 underline-offset-4 transition hover:text-charcoal">
              {siteConfig.email}
            </a>
          </p>
          {copy.close.closed ? (
            <p className={`mt-6 text-center text-walnut ${bodyNoteClasses}`}>{copy.close.closed}</p>
          ) : null}
        </div>
      </section>
    </>
  );
}
