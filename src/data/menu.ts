/** Visual assets for the menu page — decoupled from page components. */
export const menuHeroImage = "/images/hero/Preparacao-picanha.webp";

export const categoryVisuals = [
  {
    image: "/images/hero/Preparacao-picanha.webp",
    mini: "",
    overlay: "linear-gradient(180deg, rgba(52,42,35,0.08), rgba(52,42,35,0.44))"
  },
  {
    image: "/images/food/Robalo-mustarda.webp",
    mini: "/images/wine/Vinho-mesa.webp",
    overlay: "linear-gradient(180deg, rgba(96,96,72,0.04), rgba(96,78,57,0.3))"
  },
  {
    image: "/images/people/Empratamento-1.webp",
    mini: "/images/food/Cogumelos-alho.webp",
    overlay: "linear-gradient(180deg, rgba(92,68,48,0.04), rgba(92,68,48,0.32))"
  },
  {
    image: "/images/food/Tarte-maca.webp",
    mini: "/images/food/Profiteroles-chocolate.webp",
    overlay: "linear-gradient(180deg, rgba(156,121,87,0.04), rgba(92,68,48,0.28))"
  }
] as const;

export const interludeImages = [
  "/images/food/Camarao-alho-fogo.webp",
  "/images/wine/Vinho-garrafeira.webp",
  "/images/people/Empratamento-2.webp"
] as const;
