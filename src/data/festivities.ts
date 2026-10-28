/** Pré-visualizações A4 geradas a 1200px de largura. */
export const festiveMenuImageSize = {
  width: 1200,
  height: 1697
} as const;

export const festiveHero = {
  natal: {
    anchor: "menus",
    photo: "/festividades/natal_capa.jpg",
    lightsDesktop: "/festividades/natal_luzes_desktop.png",
    lightsMobile: "/festividades/natal_luzes_mobile.png",
    width: 1536,
    height: 2048
  },
  reveillon: {
    anchor: "menu",
    desktop: "/festividades/reveillon-hero-desktop.webp",
    mobile: "/festividades/reveillon-hero-mobile.webp",
    width: 2400,
    height: 1200
  }
} as const;

export const festivityAssets = {
  natal: {
    pt: {
      image: "/festividades/natal-2026-pt.webp",
      pdf: "/festividades/natal-2026-pt.pdf"
    },
    en: {
      image: "/festividades/christmas-2026-en.webp",
      pdf: "/festividades/christmas-2026-en.pdf"
    }
  },
  reveillon: {
    pt: {
      image: "/festividades/reveillon-2026.webp",
      pdf: "/festividades/reveillon-2026.pdf"
    },
    en: {
      image: "/festividades/reveillon-2026.webp",
      pdf: "/festividades/reveillon-2026.pdf"
    }
  }
} as const;
