import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

/**
 * Redireciona qualquer rota sem prefixo de idioma (`/`, `/menu`, `/about`, ...)
 * para o idioma predefinido. Substitui as antigas páginas de redirecionamento
 * duplicadas em `app/<rota>/page.tsx`.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /** Rotas neutras (ResDiary, Brevo) — sem prefixo /pt ou /en. */
  const neutralRoutes = ["/booking-successful", "/subscription-pending", "/subscription-confirmed"] as const;
  const neutralRoute = neutralRoutes.find((route) => pathname === route || pathname === `${route}/`);

  if (neutralRoute) {
    if (pathname.endsWith("/") && pathname.length > 1) {
      const url = request.nextUrl.clone();
      url.pathname = neutralRoute;
      return NextResponse.redirect(url, 308);
    }
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) =>
      pathname === `/${locale}` ||
      pathname === `/${locale}/` ||
      pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) {
    const localeOnlyTrailingSlash = locales.find((locale) => pathname === `/${locale}/`);
    if (localeOnlyTrailingSlash) {
      const url = request.nextUrl.clone();
      url.pathname = `/${localeOnlyTrailingSlash}`;
      return NextResponse.redirect(url, 308);
    }
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  /** Exclui assets internos do Next, ícones dinâmicos, ficheiros estáticos e OG image. */
  matcher: ["/((?!_next|opengraph-image|icon|apple-icon|.*\\.).*)"]
};
