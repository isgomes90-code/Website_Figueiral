import Link from "next/link";
import type { ReactNode } from "react";

type LuxuryButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function LuxuryButton({ href, children, variant = "primary", className = "" }: LuxuryButtonProps) {
  const base =
    "group inline-flex min-h-12 items-center justify-center rounded-full px-7 text-[0.72rem] font-semibold uppercase tracking-[0.28em] transition duration-500 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-paper";
  const variants = {
    primary:
      "border border-gold/70 bg-gold text-charcoal shadow-[0_14px_34px_rgba(111,80,50,0.18)] hover:-translate-y-0.5 hover:bg-charcoal hover:text-cream hover:shadow-[0_20px_44px_rgba(111,80,50,0.2)]",
    secondary:
      "border border-walnut/25 bg-cream/45 text-charcoal hover:-translate-y-0.5 hover:border-gold/70 hover:bg-cream hover:text-gold"
  };
  const classNames = `${base} ${variants[variant]} ${className}`;

  if (href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={classNames}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}
