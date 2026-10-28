import Image from "next/image";
import { FestiveButtonRow, FestiveMenuFrame } from "@/components/festivities/FestiveMenuActions";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { festiveHero } from "@/data/festivities";
import { buildMailtoHref } from "@/lib/mailto";
import {
  bodyLeadClasses,
  bodyNoteClasses,
  bodyTextClasses,
  displayFigureClasses,
  editorialEyebrowClasses,
  titleClassesFor
} from "@/lib/sectionTitle";
import { siteConfig, siteEmailHref, sitePhoneHref } from "@/lib/site";

type FestiveCopy = {
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    dates: string;
    scrollCta: string;
    imageAlt: string;
  };
  facts: {
    items: readonly { label: string; value: string }[];
    line: string;
  };
  menus: {
    eyebrow: string;
    title: string;
    body: string;
    hint: string;
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

const factBorders = [
  "border-r border-b lg:border-b-0",
  "border-b lg:border-r lg:border-b-0",
  "border-r",
  ""
];

const heroTitleClasses = titleClassesFor("section", "h1");
const darkSecondaryClass =
  "!border-cream/45 !bg-transparent !text-cream hover:!bg-cream hover:!text-charcoal";

const natalDesktopMask = {
  WebkitMaskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.7) 9%, #000 20%)",
  maskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.7) 9%, #000 20%)"
};

const natalMobileMask = {
  WebkitMaskImage: "linear-gradient(0deg, transparent 0%, rgba(0,0,0,0.8) 5%, #000 12%)",
  maskImage: "linear-gradient(0deg, transparent 0%, rgba(0,0,0,0.8) 5%, #000 12%)"
};

export function FestiveEventPage({
  menu,
  copy,
  actions,
  imageSrc,
  pdfHref
}: {
  menu: "natal" | "reveillon";
  copy: FestiveCopy;
  actions: { requestInfo: string; viewPdf: string };
  imageSrc: string;
  pdfHref: string;
}) {
  const mailtoHref = buildMailtoHref(siteConfig.email, copy.mailtoSubject, copy.mailtoBody);
  const scene = festiveHero[menu];
  const scrollHref = `#${scene.anchor}`;
  const cardBackground = menu === "natal" ? "bg-[#22312a]" : "bg-[#15110d]";

  return (
    <>
      <style>{`
        @media (min-width: 768px) and (max-width: 1279.98px) {
          .festive-natal-plate {
            object-position: 18% 64%;
            transform: scale(1.55);
            transform-origin: 0% 62%;
          }
        }
      `}</style>
      <section className="pb-10 pt-28 sm:pb-14 sm:pt-32">
        <div className="section-shell">
          <div className={`relative overflow-hidden rounded-[2rem] shadow-[0_22px_56px_rgba(58,44,34,0.1)] ${cardBackground}`}>
            {menu === "natal" ? <NatalHeroVisual alt={copy.hero.imageAlt} /> : <ReveillonHeroVisual alt={copy.hero.imageAlt} />}
            <MotionReveal
              delay={0.08}
              className="relative z-10 px-6 pb-8 pt-2 md:absolute md:left-[5.5%] md:top-[56%] md:max-w-[34rem] md:-translate-y-1/2 md:px-0 md:pb-0 md:pt-0"
            >
              <p className={`text-gold ${editorialEyebrowClasses}`}>{copy.hero.eyebrow}</p>
              <h1
                className={`mt-3 text-cream md:max-xl:!text-[clamp(2.1rem,0.95rem+2.4vw,4rem)] md:max-xl:!leading-[1.06] md:max-xl:!tracking-[-0.024em] ${heroTitleClasses}`}
              >
                {copy.hero.title}
              </h1>
              <p className={`mt-5 max-w-[30rem] text-cream/85 ${bodyLeadClasses}`}>{copy.hero.body}</p>
              <p className={`mt-6 text-gold ${editorialEyebrowClasses}`}>{copy.hero.dates}</p>
              <FestiveButtonRow
                menu={menu}
                mailtoHref={mailtoHref}
                requestInfo={actions.requestInfo}
                secondaryHref={scrollHref}
                secondaryLabel={copy.hero.scrollCta}
                secondaryClassName={darkSecondaryClass}
                wideUntil="md"
                className="mt-8"
              />
            </MotionReveal>
          </div>
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

      <section id={scene.anchor} className="scroll-mt-28 pb-16 pt-16 sm:pb-20 sm:pt-20">
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

      <section className="pb-36 pt-4 sm:pb-32 sm:pt-8 lg:pb-28">
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

function NatalHeroVisual({ alt }: { alt: string }) {
  return (
    <>
      <div className="relative hidden aspect-[2/1] md:block">
        <div className="absolute bottom-0 right-0 top-0 w-[60%]" style={natalDesktopMask}>
          <Image
            src={festiveHero.natal.photo}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1280px) 720px, 60vw"
            className="festive-natal-plate object-cover object-[50%_50%] brightness-[0.9] contrast-[1.05]"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 45% 55% at 70% 45%, rgba(255,196,110,0.18), transparent 70%), linear-gradient(180deg, rgba(20,28,23,0.35) 0%, transparent 30%)"
          }}
        />
        <Image
          src={festiveHero.natal.lightsDesktop}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
      </div>
      <div className="relative aspect-[4/5] md:hidden">
        <div className="absolute inset-0" style={natalMobileMask}>
          <Image
            src={festiveHero.natal.photo}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[44%_50%] brightness-[0.9] contrast-[1.05]"
          />
        </div>
        <Image
          src={festiveHero.natal.lightsMobile}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
      </div>
    </>
  );
}

function ReveillonHeroVisual({ alt }: { alt: string }) {
  return (
    <>
      <div className="relative hidden aspect-[2/1] md:block">
        <Image
          src={festiveHero.reveillon.desktop}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="relative aspect-[4/5] md:hidden">
        <Image
          src={festiveHero.reveillon.mobile}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </>
  );
}
