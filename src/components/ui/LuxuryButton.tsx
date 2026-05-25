import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type LuxuryButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  /**
   * `headerReserve` — barra desktop: menos padding e tracking que o CTA hero,
   * evita competir pela largura com o nav (sobrepõe o base volumoso por defeito).
   */
  density?: "default" | "headerReserve";
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /** Quando verdadeiro, marca o destino como página atual (ex.: Reservas no header). */
  ariaCurrent?: boolean;
};

export function LuxuryButton({
  href,
  children,
  variant = "primary",
  density = "default",
  className = "",
  onClick,
  ariaCurrent
}: LuxuryButtonProps) {
  const baseDefault =
    "group inline-flex min-h-12 items-center justify-center rounded-full px-7 text-[0.7rem] font-semibold uppercase tracking-[0.3em] transition duration-500 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-paper";
  const baseHeaderReserve =
    "group inline-flex min-h-9 shrink-0 items-center justify-center rounded-full px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition duration-500 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-paper xl:min-h-10 xl:px-5 xl:py-[0.45rem] xl:text-[0.82rem] xl:tracking-[0.17em]";
  const base = density === "headerReserve" ? baseHeaderReserve : baseDefault;

  const variants = {
    primary:
      "border border-gold/55 bg-[rgba(156,121,87,0.88)] text-cream shadow-[0_12px_30px_rgba(111,80,50,0.14)] hover:-translate-y-0.5 hover:border-charcoal/20 hover:bg-charcoal hover:text-cream hover:shadow-[0_18px_38px_rgba(111,80,50,0.16)]",
    secondary:
      "border border-walnut/25 bg-cream/45 text-charcoal hover:-translate-y-0.5 hover:border-gold/70 hover:bg-cream hover:text-gold"
  };
  const classNames = `${base} ${variants[variant]} ${className}`;

  if (href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classNames}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames} onClick={onClick} {...(ariaCurrent ? { "aria-current": "page" as const } : {})}>
      {children}
    </Link>
  );
}
