import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import { localizedPath, type Locale } from "@/i18n/config";
import { figueiralLogoSrc, navItems, siteConfig } from "@/lib/site";

const externalRel = "noopener noreferrer" as const;

export function Footer({ dictionary, lang }: { dictionary: Dictionary; lang: Locale }) {
  const footer = dictionary.footer;
  const contact = dictionary.contact;
  const navigation = dictionary.navigation;
  const { socials } = siteConfig;

  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#2a231e_0%,#201a16_94%)] pb-24 pt-[4.75rem] text-sm sm:pb-[5.75rem] sm:pt-[5.75rem]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(248,243,236,0.26),transparent)]"
        aria-hidden
      />

      <div className="section-shell relative">
        <div className="grid gap-14 sm:gap-16 lg:grid-cols-2 lg:gap-16 xl:grid-cols-[1.05fr_repeat(3,minmax(0,1fr))] xl:gap-12">
          <div className="min-w-0 xl:pr-4">
            <div className="flex flex-col gap-9 border-b border-white/[0.12] pb-12 sm:flex-row sm:items-start sm:gap-11 lg:border-0 lg:pb-0">
              <div className="relative h-[3.75rem] w-[5.95rem] shrink-0 brightness-[1.06] opacity-[0.96]" aria-hidden>
                <Image src={figueiralLogoSrc} alt="" fill sizes="154px" className="object-contain object-left" />
              </div>
              <div className="min-w-0">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.38em] text-gold/[0.82]">{footer.brandLine}</p>
                <p className="mt-4 font-display text-[1.78rem] leading-[1.08] tracking-[-0.018em] text-cream/[0.96] sm:mt-5 sm:text-[2.05rem] sm:leading-[1.06] xl:text-[2.2rem]">
                  {footer.legalName}
                </p>
                <p className="mt-5 max-w-[24rem] text-[0.94rem] leading-[1.82] tracking-[0.01em] text-cream/[0.58] sm:mt-6">
                  {footer.description}
                </p>
              </div>
            </div>
            <p className="mt-11 max-w-lg font-display text-[1.2rem] leading-snug tracking-[-0.01em] text-cream/[0.42] sm:mt-12 sm:text-[1.36rem] sm:leading-[1.42] lg:mt-16">
              {footer.closingPhrase}
            </p>
          </div>

          <div className="min-w-0">
            <p className="mb-6 text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-gold/[0.72]">{footer.explore}</p>
            <nav className="grid gap-4 text-[0.9rem] text-cream/[0.58]" aria-label={navigation.ariaMain}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={localizedPath(lang, item.href)}
                  className="w-fit border-b border-transparent pb-0.5 transition hover:border-gold/[0.5] hover:text-cream/[0.9]"
                >
                  {navigation[item.labelKey]}
                </Link>
              ))}
            </nav>
            <Link
              href={localizedPath(lang, "/reservations")}
              className="mt-8 inline-flex min-h-12 max-w-[16rem] items-center justify-center rounded-full border border-white/26 bg-transparent px-7 py-3 text-[0.64rem] font-semibold uppercase tracking-[0.32em] text-cream/[0.9] shadow-[inset_0_1px_0_rgba(255,252,246,0.06)] transition duration-500 hover:border-gold/[0.55] hover:bg-gold/[0.15] hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal sm:tracking-[0.3em]"
            >
              {footer.reservations}
            </Link>
          </div>

          <div className="min-w-0">
            <p className="mb-6 text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-gold/[0.72]">{footer.visit}</p>
            <div className="space-y-2 text-[0.9rem] leading-[1.75] text-cream/[0.58]">
              <p className="pb-3 text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-gold/[0.55]">{footer.addressLabel}</p>
              <p>{`${siteConfig.address.postalCode} ${siteConfig.address.locality}`}</p>
              <p>{`${siteConfig.address.region}, Portugal`}</p>
              <p className="pt-4 pb-3 text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-gold/[0.55]">{contact.openingHours}</p>
              {contact.hours.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p className="pt-4">
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="border-b border-transparent transition hover:border-gold/40 hover:text-cream/[0.9]">
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.email}`} className="break-all border-b border-transparent transition hover:border-gold/40 hover:text-cream/[0.9]">
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <p className="mb-6 text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-gold/[0.72]">{footer.social}</p>
            <div className="flex flex-wrap gap-x-9 gap-y-3 text-[0.9rem] text-cream/[0.62]">
              <a href={socials.instagram} className="border-b border-transparent pb-px transition hover:border-gold/[0.45] hover:text-cream/[0.9]" target="_blank" rel={externalRel}>
                Instagram
              </a>
              <a href={socials.facebook} className="border-b border-transparent pb-px transition hover:border-gold/[0.45] hover:text-cream/[0.9]" target="_blank" rel={externalRel}>
                Facebook
              </a>
              <a href={socials.tripadvisor} className="border-b border-transparent pb-px transition hover:border-gold/[0.45] hover:text-cream/[0.9]" target="_blank" rel={externalRel}>
                TripAdvisor
              </a>
            </div>
            <p className="mt-12 max-w-[15rem] text-[0.8rem] leading-[1.75] tracking-[0.02em] text-cream/[0.38]">{footer.locationNote}</p>
          </div>
        </div>

        <div className="hairline-dusk mt-[3.75rem]" />
        <div className="mt-9 flex flex-col gap-4 text-[0.75rem] text-cream/[0.36] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.7rem] uppercase tracking-[0.2em] sm:tracking-[0.26em]">
            © {new Date().getFullYear()} {siteConfig.name}. {footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
