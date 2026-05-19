export const siteConfig = {
  name: "Restaurante Figueiral",
  founded: "1986",
  url: "https://www.restaurantefigueiral.pt",
  phone: "+351 289 399 982",
  email: "reservas@restaurantefigueiral.pt",
  address: {
    street: "Almancil",
    locality: "Almancil",
    region: "Algarve",
    postalCode: "8135-000",
    country: "PT"
  },
  coordinates: {
    latitude: 37.0865,
    longitude: -8.0306
  },
  socials: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    tripadvisor: "https://www.tripadvisor.com/"
  }
};

/** Logótipo oficial (WebP); usar com moderação (header, footer, selos). */
export const figueiralLogoSrc = "/images/RSTFI_logo_ret.webp";

/** Variante creme para header sobre hero / fundos escuros. */
export const figueiralLogoHeaderCreamSrc = "/images/RSTFI_logo_header-cream.webp";

export const navItems = [
  { href: "/", labelKey: "home" },
  { href: "/menu", labelKey: "menu" },
  { href: "/wine-experience", labelKey: "wine" },
  { href: "/about", labelKey: "about" },
  { href: "/gallery", labelKey: "gallery" },
  { href: "/contact", labelKey: "contact" }
] as const;

export const images = {
  hero: "/images/hero/Preparacao-picanha.webp",
  picanha: "/images/food/Picanha-fundo-branco.webp",
  fire: "/images/food/Camarao-alho-fogo.webp",
  wine: "/images/wine/Vinho-detalhe-1.webp",
  wineCellar: "/images/wine/Vinho-garrafeira.webp",
  terrace: "/images/terrace/Esplanada-1.webp",
  terraceAlt: "/images/terrace/Esplanada-2.webp",
  family: "/images/people/Convicio-clientes-1.webp",
  dining: "/images/people/Empratamento-1.webp",
  bar: "/images/bar/Figueiral-0494-20191105-Web.webp",
  cocktail: "/images/bar/Expresso-martini-preparcao-1.webp",
  dessert: "/images/food/Profiteroles-chocolate.webp",
  /** Retrato família na secção Legado — adicionar ficheiro em `public/images/people/`. */
  legacyOwners: "/images/people/Proprietarios.jpg"
};

export const galleryImages = [
  { src: "/images/hero/Preparacao-picanha.webp", alt: "Preparacao de picanha no Restaurante Figueiral", tall: true },
  { src: "/images/people/Empratamento-1.webp", alt: "Empratamento cuidado na cozinha do Figueiral" },
  { src: "/images/wine/Vinho-garrafeira.webp", alt: "Garrafeira e selecao de vinhos do Figueiral" },
  { src: "/images/food/Camarao-alho-fogo.webp", alt: "Camarao ao alho com fogo e movimento" },
  { src: "/images/terrace/Esplanada-1.webp", alt: "Esplanada do Restaurante Figueiral em Almancil", tall: true },
  { src: "/images/food/Bife-cogumelos.webp", alt: "Prato de carne servido no Figueiral" },
  { src: "/images/bar/Expresso-martini-preparcao-1.webp", alt: "Cocktail preparado no Figueiral" },
  { src: "/images/people/Convicio-clientes-1.webp", alt: "Convivio de clientes no Figueiral" },
  { src: "/images/food/Rossini.webp", alt: "Prato Rossini preparado no Figueiral" },
  { src: "/images/food/Robalo-mustarda.webp", alt: "Robalo com mostarda no Figueiral" },
  { src: "/images/food/Tarte-maca.webp", alt: "Tarte de maca do Figueiral" }
];
