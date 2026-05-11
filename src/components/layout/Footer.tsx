import Link from "next/link";
import { navItems, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="grain border-t border-cream/10 bg-[#0d0c0b] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto grid max-w-[82rem] gap-12 lg:grid-cols-[1.4fr_0.75fr_0.9fr]">
        <div>
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.36em] text-gold/85">Almancil since 1986</p>
          <p className="mt-4 font-display text-5xl leading-none text-cream">Restaurante Figueiral</p>
          <p className="mt-6 max-w-md text-sm leading-7 text-cream/60">
            Fire, wine and family hospitality in Almancil, held with the same quiet confidence for generations of
            Algarve evenings.
          </p>
        </div>
        <div>
          <p className="mb-5 text-[0.66rem] font-semibold uppercase tracking-[0.34em] text-gold/85">Explore</p>
          <div className="grid gap-3 text-sm text-cream/60">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-gold">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-5 text-[0.66rem] font-semibold uppercase tracking-[0.34em] text-gold/85">Visit</p>
          <div className="space-y-2 text-sm leading-7 text-cream/60">
            <p>Almancil, Algarve, Portugal</p>
            <p>{siteConfig.phone}</p>
            <p>{siteConfig.email}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-[82rem]">
        <div className="hairline" />
      </div>
      <div className="mx-auto mt-6 flex max-w-[82rem] flex-col gap-3 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
        <p>(c) {new Date().getFullYear()} Restaurante Figueiral. All rights reserved.</p>
        <p>Near Quinta do Lago and Vale do Lobo.</p>
      </div>
    </footer>
  );
}
