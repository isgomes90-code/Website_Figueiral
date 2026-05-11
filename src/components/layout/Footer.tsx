import Image from "next/image";
import Link from "next/link";
import { navItems, siteConfig } from "@/lib/site";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

export function Footer({ dictionary, lang }: { dictionary: Dictionary; lang: Locale }) {
  const footer = dictionary.footer;
  const navigation = dictionary.navigation;

  return (
    <footer className="grain relative overflow-hidden border-t border-walnut/15 bg-sand px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <Image
        src="/images/bar/Cocktail-figueiral-siganture.jpg"
        alt=""
        fill
        unoptimized
        sizes="100vw"
        className="object-cover opacity-[0.06] blur-sm"
      />
      <div className="absolute inset-0 bg-sand/88" />
      <div className="relative mx-auto grid max-w-[82rem] gap-12 lg:grid-cols-[1.4fr_0.75fr_0.9fr]">
        <div>
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.36em] text-gold/85">{footer.brandLine}</p>
          <p className="mt-4 font-display text-5xl leading-none text-charcoal">Restaurante Figueiral</p>
          <p className="mt-6 max-w-md text-sm leading-7 text-walnut">
            {footer.description}
          </p>
        </div>
        <div>
          <p className="mb-5 text-[0.66rem] font-semibold uppercase tracking-[0.34em] text-gold/85">{footer.explore}</p>
          <div className="grid gap-3 text-sm text-walnut">
            {navItems.map((item) => (
              <Link key={item.href} href={localizedPath(lang, item.href)} className="transition hover:text-gold">
                {navigation[item.labelKey]}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-5 text-[0.66rem] font-semibold uppercase tracking-[0.34em] text-gold/85">{footer.visit}</p>
          <div className="space-y-2 text-sm leading-7 text-walnut">
            <p>Almancil, Algarve, Portugal</p>
            <p>{siteConfig.phone}</p>
            <p>{siteConfig.email}</p>
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-14 max-w-[82rem]">
        <div className="hairline" />
      </div>
      <div className="relative mx-auto mt-6 flex max-w-[82rem] flex-col gap-3 text-xs text-walnut/70 sm:flex-row sm:items-center sm:justify-between">
        <p>(c) {new Date().getFullYear()} Restaurante Figueiral. {footer.rights}</p>
        <p>{footer.locationNote}</p>
      </div>
    </footer>
  );
}
