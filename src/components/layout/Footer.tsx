import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import { localizedPath, type Locale } from "@/i18n/config";
import { bodyNoteClasses, cardTitleClasses, editorialEyebrowClasses } from "@/lib/sectionTitle";
import { FacebookIcon, InstagramIcon, TripAdvisorIcon } from "@/components/icons/social";
import { imageToneLogoFooter } from "@/lib/imageTone";
import { figueiralLogoFooterSrc, navItems, siteConfig, siteEmailHref, sitePhoneHref } from "@/lib/site";

const externalRel = "noopener noreferrer" as const;

const footerLinkClass =
  "footer-link w-fit border-b border-transparent pb-px transition hover:border-brandGreen/55";

const footerSocialLinkClass =
  "footer-link inline-flex h-20 w-20 items-center justify-center rounded-full border border-transparent transition hover:border-brandGreen/40 hover:bg-white/[0.04] hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-brandGreen/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#241f1b]";

const footerSocialLinks = [
  { hrefKey: "instagram" as const, label: "Instagram", Icon: InstagramIcon },
  { hrefKey: "facebook" as const, label: "Facebook", Icon: FacebookIcon },
  { hrefKey: "tripadvisor" as const, label: "TripAdvisor", Icon: TripAdvisorIcon }
];

export function Footer({ dictionary, lang }: { dictionary: Dictionary; lang: Locale }) {
  const footer = dictionary.footer;
  const contact = dictionary.contact;
  const navigation = dictionary.navigation;
  const { socials } = siteConfig;

  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(185deg,#353028_0%,#29241f_48%,#211e1b_100%)] pb-[4.25rem] pt-[3.25rem] text-sm sm:pb-[4.75rem] sm:pt-[3.75rem]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(136,148,138,0.22),rgba(248,243,236,0.14),transparent)]"
        aria-hidden
      />

      <div className="section-shell relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-10 xl:gap-x-14">
          <div className="min-w-0 border-b border-white/[0.1] pb-8 lg:col-span-5 lg:border-b-0 lg:pb-0">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
              <div
                className="relative h-[6.25rem] aspect-[2176/1532] shrink-0 sm:h-[7.25rem]"
                aria-hidden
              >
                <Image
                  src={figueiralLogoFooterSrc}
                  alt={dictionary.seo.images.logoFooter}
                  fill
                  sizes="(max-width: 640px) 140px, 156px"
                  loading="lazy"
                  className={imageToneLogoFooter}
                />
              </div>
              <div className="min-w-0 space-y-4">
                <p className={`text-gold ${editorialEyebrowClasses}`}>{footer.brandLine}</p>
                <p className={`text-cream ${cardTitleClasses}`}>{footer.legalName}</p>
                <p className={`footer-note max-w-[26rem] tracking-[0.008em] ${bodyNoteClasses}`}>
                  {footer.description}
                </p>
              </div>
            </div>
            <p className="footer-note mt-7 max-w-xl font-display text-[1.14rem] leading-snug tracking-[-0.008em] sm:mt-8 sm:text-[1.28rem] sm:leading-[1.36] lg:mt-9">
              {footer.closingPhrase}
            </p>
          </div>

          <div className="min-w-0 lg:col-span-3">
            <p className={`mb-4 text-gold ${editorialEyebrowClasses}`}>{footer.explore}</p>
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
              <Link href={localizedPath(lang, "/press")} className={footerLinkClass}>
                {navigation.press}
              </Link>
            </nav>
            <Link
              href={localizedPath(lang, "/reservations")}
              className="mt-6 inline-flex min-h-11 max-w-[17rem] items-center justify-center rounded-full border border-white/28 bg-transparent px-6 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-cream/90 shadow-[inset_0_1px_0_rgba(255,252,246,0.06)] transition duration-500 hover:border-brandGreen/55 hover:bg-[rgba(111,121,108,0.14)] hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-brandGreen/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#241f1b]"
            >
              {footer.reservations}
            </Link>
          </div>

          <div className="min-w-0 lg:col-span-4">
            <p className={`mb-4 text-gold ${editorialEyebrowClasses}`}>{footer.visit}</p>

            <div className="footer-body space-y-7 text-[0.88rem] leading-[1.76]">
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

        <div className="mt-8 flex flex-col gap-6 border-t border-white/[0.09] pt-8 sm:flex-row sm:items-start sm:justify-between lg:mt-9 lg:pt-9">
          <div className="min-w-0">
            <p className={`mb-3 text-gold ${editorialEyebrowClasses}`}>{footer.social}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4">
              {footerSocialLinks.map(({ hrefKey, label, Icon }) => (
                <a
                  key={hrefKey}
                  href={socials[hrefKey]}
                  className={footerSocialLinkClass}
                  target="_blank"
                  rel={externalRel}
                  aria-label={label}
                >
                  <Icon className="h-10 w-10" />
                </a>
              ))}
            </div>
          </div>
          <p className="footer-muted max-w-[17rem] text-[0.78rem] leading-[1.74] tracking-[0.015em]">
            {footer.locationNote}
          </p>
        </div>

        <div className="hairline-dusk mt-7 opacity-90 lg:mt-8" />
        <div className="footer-fineprint mt-5 flex flex-col gap-3 text-[0.72rem] sm:flex-row sm:items-center sm:justify-between lg:mt-6">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] sm:tracking-[0.22em]">
            © {new Date().getFullYear()} {siteConfig.name}. {footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
