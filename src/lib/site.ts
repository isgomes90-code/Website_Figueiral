/** Domínio oficial — usar em `NEXT_PUBLIC_SITE_URL` quando o site estiver em servidor. */
export const productionSiteUrl = "https://www.figueiral.pt";

const normalizeSiteUrl = (value: string) => value.replace(/\/$/, "");

/** URL pública (canonical, OG, sitemap). Por defeito: versão de teste em localhost. */
export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
);

export const isLocalTestSite =
  siteUrl.includes("localhost") || siteUrl.includes("127.0.0.1");

export const siteConfig = {
  name: "Restaurante Figueiral",
  founded: "1986",
  url: siteUrl,
  phone: "+351 289 395 558",
  email: "info@figueiral.pt",
  address: {
    street: "Rua Cristóvão Pires Norte, Restaurante Figueiral",
    locality: "Almancil",
    region: "Algarve",
    postalCode: "8135-117",
    country: "PT"
  },
  coordinates: {
    latitude: 37.0830545,
    longitude: -8.0334457
  },
  maps: {
    embedUrl:
      "https://maps.google.com/maps?q=37.0830545,-8.0334457&hl=pt&z=16&output=embed",
    placeUrl:
      "https://www.google.com/maps/place/Figueiral/@37.0830545,-8.0334457,17z/data=!3m1!4b1!4m6!3m5!1s0xd1ab3c1f80e254f:0xb24015ac29588ac8!8m2!3d37.0830545!4d-8.0334457!16s%2Fg%2F1tgxvtms"
  },
  booking: {
    widgetUrl: "https://booking.resdiary.com/widget/Standard/RestauranteFigueiral/13421"
  },
  socials: {
    instagram: "https://www.instagram.com/restaurantefigueiral/",
    facebook: "https://www.facebook.com/RestauranteFigueiral/?locale=pt_PT",
    tripadvisor:
      "https://www.tripadvisor.pt/Restaurant_Review-g262054-d2104103-Reviews-Figueiral-Almancil_Loule_Faro_District_Algarve.html"
  }
};

export function sitePhoneHref(phone: string = siteConfig.phone) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export function siteEmailHref(email: string = siteConfig.email) {
  return `mailto:${email}`;
}

/** Logótipo do header (verde, fundo transparente) — para fundos claros/paper. Rácio ~1,71:1. */
export const figueiralLogoSrc = "/images/Logo_Figueiral_Header.webp";

/** Variante creme do logótipo do header — para o hero escuro e fundos escuros. */
export const figueiralLogoHeaderCreamSrc = "/images/Logo_Figueiral_Header_cream.webp";

/** Footer mantém o logótipo creme anterior (caixa própria com rácio 2176/1532). */
export const figueiralLogoFooterSrc = "/images/RSTFI_logo_header-cream.webp";

export const navItems = [
  { href: "/", labelKey: "home" },
  { href: "/menu", labelKey: "menu" },
  { href: "/wine-experience", labelKey: "wine" },
  { href: "/about", labelKey: "about" },
  { href: "/gallery", labelKey: "gallery" },
  { href: "/contact", labelKey: "contact" }
] as const;

export const images = {
  hero: "/images/hero/Esplanada-1.webp",
  picanha: "/images/food/Picanha-fundo-branco.webp",
  fire: "/images/food/Camarao-alho-fogo-opt.webp",
  wine: "/images/wine/Vinho-detalhe-1.webp",
  wineCellar: "/images/wine/Vinho-garrafeira-opt.webp",
  terrace: "/images/terrace/Esplanada-1.webp",
  terraceAlt: "/images/terrace/Esplanada-3.webp",
  family: "/images/people/Convicio-clientes-1.webp",
  dining: "/images/people/Empratamento-1.webp",
  bar: "/images/bar/Figueiral-0494-20191105-Web.webp",
  cocktail: "/images/bar/Expresso-martini-preparcao-1.webp",
  dessert: "/images/food/Profiteroles-chocolate.webp",
  /** Retrato família na secção Legado — adicionar ficheiro em `public/images/people/`. */
  legacyOwners: "/images/people/Proprietarios.webp"
};

export const homeHighlightImages = [
  "/images/hero/Preparacao-picanha.webp",
  "/images/wine/Vinho-garrafeira-opt.webp",
  "/images/hero/Alinhamento-mesas.webp",
  "/images/people/Rececao-clientes-opt.webp"
] as const;

export const galleryImages = [
  { src: "/images/hero/Camarao-grelha.webp", alt: "Camarao na grelha no Restaurante Figueiral", tall: true },
  { src: "/images/food/cogumelos-com-alho-entrada-2-opt.webp", alt: "Cogumelos flambados no Restaurante Figueiral" },
  { src: "/images/food/Picanha-grelha-4-opt.webp", alt: "Picanha na grelha no Restaurante Figueiral", tall: true },
  { src: "/images/food/Picanha-acompanhamentos.webp", alt: "Picanha servida com acompanhamentos no Figueiral" },
  { src: "/images/food/Vulcao-chocolate.webp", alt: "Vulcao de chocolate no Restaurante Figueiral" },
  { src: "/images/hero/Entrada-restaurante.webp", alt: "Entrada do Restaurante Figueiral em Almancil" },
  { src: "/images/hero/Lounge-bar-opt.webp", alt: "Lounge bar do Restaurante Figueiral" },
  { src: "/images/wine/Vinho-mesa.webp", alt: "Vinho servido a mesa no Restaurante Figueiral" },
  { src: "/images/food/Linguado-camarao.webp", alt: "Linguado com camarao no Restaurante Figueiral" },
  { src: "/images/people/Convicio-clientes-2.webp", alt: "Convivio de clientes no Restaurante Figueiral" }
];
