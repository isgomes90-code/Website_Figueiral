/** Visual assets for the menu page — decoupled from page components. */
export const menuHeroImage = "/images/food/Picanha-grelha-2.jpg";

/** Bloco editorial «À mesa» (posição 2 na página). */
export const menuAtTableImage = "/images/people/mesa-convivio.webp";

/** Order matches menu.categories: Para Começar → Carne → Algarve → Sobremesas */
export const categoryVisuals = [
  {
    image: "/images/food/camarao-com-alho-entrada.webp",
    mini: "/images/food/Camarao-grelhado-Entrada.webp",
    overlay: "linear-gradient(180deg, rgba(92,68,48,0.04), rgba(92,68,48,0.32))"
  },
  {
    image: "/images/hero/Preparacao-picanha.webp",
    mini: "/images/food/Chateaubriand.webp",
    overlay: "linear-gradient(180deg, rgba(52,42,35,0.08), rgba(52,42,35,0.44))",
    compact: true,
    imagePosition: "object-[center_46%]"
  },
  {
    image: "/images/people/Empratamento-3.webp",
    mini: "",
    overlay: "linear-gradient(180deg, rgba(96,96,72,0.01), rgba(96,78,57,0.06))",
    hideEditorial: true
  },
  {
    image: "/images/food/Profiteroles-chocolate.webp",
    mini: "/images/food/Tarte-maca.webp",
    overlay: "linear-gradient(180deg, rgba(156,121,87,0.04), rgba(92,68,48,0.28))"
  }
] as const;
