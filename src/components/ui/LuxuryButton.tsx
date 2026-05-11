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
    "group inline-flex min-h-12 items-center justify-center rounded-full px-7 text-[0.72rem] font-semibold uppercase tracking-[0.28em] transition duration-500 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-charcoal";
  const variants = {
    primary:
      "border border-gold/70 bg-gold text-charcoal shadow-[0_14px_36px_rgba(0,0,0,0.22)] hover:-translate-y-0.5 hover:bg-cream hover:shadow-[0_20px_48px_rgba(182,144,84,0.22)]",
    secondary:
      "border border-cream/25 bg-cream/[0.03] text-cream hover:-translate-y-0.5 hover:border-gold/70 hover:bg-cream/10 hover:text-gold"
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
