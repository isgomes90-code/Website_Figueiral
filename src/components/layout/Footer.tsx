import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import { localizedPath, type Locale } from "@/i18n/config";
import { bodyNoteClasses, cardTitleClasses, editorialEyebrowClasses } from "@/lib/sectionTitle";
import { imageToneLogoFooter } from "@/lib/imageTone";
import { figueiralLogoFooterSrc, navItems, siteConfig, siteEmailHref, sitePhoneHref } from "@/lib/site";

const externalRel = "noopener noreferrer" as const;

const footerLinkClass =
  "footer-link w-fit border-b border-transparent pb-px transition hover:border-brandGreen/55";

export function Footer({ dictionary, lang }: { dictionary: Dictionary; lang: Locale }) {
  const footer = dictionary.footer;
  const contact = dictionary.contact;
  const navigation = dictionary.navigation;
  const { socials } = siteConfig;

  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(185deg,#353028_0%,#29241f_48%,#211e1b_100%)] pb-[5.25rem] pt-[4.25rem] text-sm sm:pb-[6rem] sm:pt-[5rem]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(136,148,138,0.22),rgba(248,243,236,0.14),transparent)]"
        aria-hidden
      />

      <div className="section-shell relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-16 xl:gap-x-14">
          <div className="min-w-0 border-b border-white/[0.1] pb-12 lg:col-span-5 lg:border-b-0 lg:pb-0">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
              <div
                className="relative h-[5.35rem] aspect-[2176/1532] shrink-0 sm:h-[6rem]"
                aria-hidden
              >
                <Image
                  src={figueiralLogoFooterSrc}
                  alt={dictionary.seo.images.logoFooter}
                  fill
                  sizes="(max-width: 640px) 122px, 136px"
                  className={imageToneLogoFooter}
                />
              </div>
              <div className="min-w-0 space-y-4">
                <p className={`footer-eyebrow ${editorialEyebrowClasses}`}>{footer.brandLine}</p>
                <p className={`text-cream ${cardTitleClasses}`}>{footer.legalName}</p>
                <p className={`footer-note max-w-[26rem] tracking-[0.008em] ${bodyNoteClasses}`}>
                  {footer.description}
                </p>
              </div>
            </div>
            <p className="footer-note mt-10 max-w-xl font-display text-[1.14rem] leading-snug tracking-[-0.008em] sm:mt-11 sm:text-[1.28rem] sm:leading-[1.36] lg:mt-14">
              {footer.closingPhrase}
            </p>
          </div>

          <div className="min-w-0 lg:col-span-3">
            <p className={`footer-eyebrow mb-6 ${editorialEyebrowClasses}`}>{footer.explore}</p>
            <nav
              className="grid gap-3.5 text-[0.88rem] leading-snug"
              aria-label={navigation.ariaMain}
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={localizedPath(lang, item.href)}
                  className={footerLinkClass}
                >
                  {navigation[item.labelKey]}
                </Link>
              ))}
            </nav>
            <Link
              href={localizedPath(lang, "/reservations")}
              className="mt-9 inline-flex min-h-11 max-w-[17rem] items-center justify-center rounded-full border border-white/28 bg-transparent px-6 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-cream/90 shadow-[inset_0_1px_0_rgba(255,252,246,0.06)] transition duration-500 hover:border-brandGreen/55 hover:bg-[rgba(111,121,108,0.14)] hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-brandGreen/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#241f1b]"
            >
              {footer.reservations}
            </Link>
          </div>

          <div className="min-w-0 lg:col-span-4">
            <p className={`footer-eyebrow mb-6 ${editorialEyebrowClasses}`}>{footer.visit}</p>

            <div className="footer-body space-y-10 text-[0.88rem] leading-[1.76]">
              <div>
                <p className="footer-field-label mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.28em]">
                  {footer.addressLabel}
                </p>
                <p>{siteConfig.address.street}</p>
                <p>{`${siteConfig.address.postalCode} ${siteConfig.address.locality}`}</p>
                <p>{`${siteConfig.address.region}, Portugal`}</p>
              </div>

              <div>
                <p className="footer-field-label mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.28em]">
                  {contact.openingHours}
                </p>
                <div className="space-y-1">
                  {contact.hours.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              <div>
                <p className="footer-field-label mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.28em]">
                  {navigation.contact}
                </p>
                <p>
                  <a
                    href={sitePhoneHref()}
                    className={footerLinkClass}
                  >
                    {siteConfig.phone}
                  </a>
                </p>
                <p className="mt-2">
                  <a href={siteEmailHref()} className={`${footerLinkClass} break-all`}>
                    {siteConfig.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-10 border-t border-white/[0.09] pt-12 sm:flex-row sm:items-start sm:justify-between lg:mt-16 lg:pt-14">
          <div className="min-w-0">
            <p className={`footer-eyebrow mb-5 ${editorialEyebrowClasses}`}>{footer.social}</p>
            <div className="flex flex-wrap gap-x-10 gap-y-3 text-[0.88rem]">
              <a
                href={socials.instagram}
                className={footerLinkClass}
                target="_blank"
                rel={externalRel}
              >
                Instagram
              </a>
              <a href={socials.facebook} className={footerLinkClass} target="_blank" rel={externalRel}>
                Facebook
              </a>
              <a
                href={socials.tripadvisor}
                className={footerLinkClass}
                target="_blank"
                rel={externalRel}
              >
                TripAdvisor
              </a>
            </div>
          </div>
          <p className="footer-muted max-w-[17rem] text-[0.78rem] leading-[1.74] tracking-[0.015em]">
            {footer.locationNote}
          </p>
        </div>

        <div className="hairline-dusk mt-12 opacity-90 lg:mt-14" />
        <div className="footer-fineprint mt-8 flex flex-col gap-4 text-[0.72rem] sm:flex-row sm:items-center sm:justify-between lg:mt-9">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] sm:tracking-[0.22em]">
            © {new Date().getFullYear()} {siteConfig.name}. {footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
