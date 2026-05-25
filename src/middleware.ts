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

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  /** Exclui assets internos do Next, ícones dinâmicos, ficheiros estáticos e OG image. */
  matcher: ["/((?!_next|opengraph-image|icon|apple-icon|.*\\.).*)"]
};
