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
    <footer className="relative overflow-hidden bg-[linear-gradient(185deg,#332b24_0%,#282119_52%,#1f1a17_100%)] pb-[5.25rem] pt-[4.25rem] text-sm sm:pb-[6rem] sm:pt-[5rem]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(248,243,236,0.22),transparent)]"
        aria-hidden
      />

      <div className="section-shell relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-16 xl:gap-x-14">
          <div className="min-w-0 border-b border-white/[0.1] pb-12 lg:col-span-5 lg:border-b-0 lg:pb-0">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
              <div className="relative h-[4rem] w-[6.35rem] shrink-0 brightness-[1.08]" aria-hidden>
                <Image src={figueiralLogoSrc} alt="" fill sizes="168px" className="object-contain object-left" />
              </div>
              <div className="min-w-0 space-y-4">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.38em] text-gold/[0.84]">{footer.brandLine}</p>
                <p className="font-display text-[1.42rem] leading-[1.12] tracking-[-0.016em] text-cream/[0.96] sm:text-[1.62rem] sm:leading-[1.08]">
                  {footer.legalName}
                </p>
                <p className="max-w-[26rem] text-[0.93rem] leading-[1.82] tracking-[0.008em] text-cream/[0.56]">{footer.description}</p>
              </div>
            </div>
            <p className="mt-10 max-w-xl font-display text-[1.08rem] leading-snug tracking-[-0.008em] text-cream/[0.44] sm:mt-11 sm:text-[1.22rem] sm:leading-[1.38] lg:mt-14">
              {footer.closingPhrase}
            </p>
          </div>

          <div className="min-w-0 lg:col-span-3">
            <p className="mb-6 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-gold/[0.76]">{footer.explore}</p>
            <nav className="grid gap-3.5 text-[0.88rem] leading-snug text-cream/[0.62]" aria-label={navigation.ariaMain}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={localizedPath(lang, item.href)}
                  className="w-fit border-b border-transparent pb-px transition hover:border-gold/[0.45] hover:text-cream/[0.9]"
                >
                  {navigation[item.labelKey]}
                </Link>
              ))}
            </nav>
            <Link
              href={localizedPath(lang, "/reservations")}
              className="mt-9 inline-flex min-h-11 max-w-[17rem] items-center justify-center rounded-full border border-white/22 bg-transparent px-6 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-cream/[0.88] shadow-[inset_0_1px_0_rgba(255,252,246,0.05)] transition duration-500 hover:border-gold/[0.5] hover:bg-[rgba(156,121,87,0.12)] hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/65 focus-visible:ring-offset-2 focus-visible:ring-offset-[#241f1b]"
            >
              {footer.reservations}
            </Link>
          </div>

          <div className="min-w-0 lg:col-span-4">
            <p className="mb-6 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-gold/[0.76]">{footer.visit}</p>

            <div className="space-y-10 text-[0.88rem] leading-[1.76] text-cream/[0.6]">
              <div>
                <p className="mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-gold/[0.58]">{footer.addressLabel}</p>
                <p>{`${siteConfig.address.postalCode} ${siteConfig.address.locality}`}</p>
                <p>{`${siteConfig.address.region}, Portugal`}</p>
              </div>

              <div>
                <p className="mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-gold/[0.58]">{contact.openingHours}</p>
                <div className="space-y-1">
                  {contact.hours.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-gold/[0.58]">{navigation.contact}</p>
                <p>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="border-b border-transparent transition hover:border-gold/42 hover:text-cream/[0.88]"
                  >
                    {siteConfig.phone}
                  </a>
                </p>
                <p className="mt-2">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="break-all border-b border-transparent transition hover:border-gold/42 hover:text-cream/[0.88]"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-10 border-t border-white/[0.09] pt-12 sm:flex-row sm:items-start sm:justify-between lg:mt-16 lg:pt-14">
          <div className="min-w-0">
            <p className="mb-5 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-gold/[0.74]">{footer.social}</p>
            <div className="flex flex-wrap gap-x-10 gap-y-3 text-[0.88rem] text-cream/[0.64]">
              <a href={socials.instagram} className="border-b border-transparent pb-px transition hover:border-gold/[0.42] hover:text-cream/[0.88]" target="_blank" rel={externalRel}>
                Instagram
              </a>
              <a href={socials.facebook} className="border-b border-transparent pb-px transition hover:border-gold/[0.42] hover:text-cream/[0.88]" target="_blank" rel={externalRel}>
                Facebook
              </a>
              <a href={socials.tripadvisor} className="border-b border-transparent pb-px transition hover:border-gold/[0.42] hover:text-cream/[0.88]" target="_blank" rel={externalRel}>
                TripAdvisor
              </a>
            </div>
          </div>
          <p className="max-w-[17rem] text-[0.78rem] leading-[1.74] tracking-[0.015em] text-cream/[0.38]">{footer.locationNote}</p>
        </div>

        <div className="hairline-dusk mt-12 opacity-90 lg:mt-14" />
        <div className="mt-8 flex flex-col gap-4 text-[0.72rem] text-cream/[0.34] sm:flex-row sm:items-center sm:justify-between lg:mt-9">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] sm:tracking-[0.22em]">
            © {new Date().getFullYear()} {siteConfig.name}. {footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
