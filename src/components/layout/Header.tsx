import Link from "next/link";
import { navItems } from "@/lib/site";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-3 mt-3 rounded-full border border-cream/10 bg-[rgba(15,13,11,0.72)] shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:mx-5 lg:mx-8">
        <div className="section-shell flex h-[4.6rem] items-center justify-between px-5 sm:px-7 lg:px-9">
          <Link href="/" className="group">
            <span className="block font-display text-[1.7rem] leading-none text-cream transition group-hover:text-gold">
              Figueiral
            </span>
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.38em] text-gold/85">
            Almancil since 1986
            </span>
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-[0.78rem] uppercase tracking-[0.2em] text-cream/70 transition duration-300 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:text-cream hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <LuxuryButton href="/reservations" className="min-h-11 px-6">
              Reserve
            </LuxuryButton>
          </div>
          <Link
            href="/reservations"
            className="rounded-full border border-gold/55 bg-gold/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold lg:hidden"
          >
            Reserve
          </Link>
        </div>
      </div>
      <nav
        aria-label="Mobile navigation"
        className="section-shell mt-3 flex gap-5 overflow-x-auto px-5 pb-3 text-[0.66rem] uppercase tracking-[0.24em] text-cream/60 lg:hidden"
      >
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 transition hover:text-gold">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
