import type { Locale } from "@/i18n/config";

type Localized<T> = Record<Locale, T>;

export type SeoLandingPage = {
  slug: string;
  primaryCta: { href: string; labelKey: "reserve" | "menu" | "wine" | "contact" | "about" };
  secondaryCta?: { href: string; labelKey: "reserve" | "menu" | "wine" | "contact" | "about" };
  meta: {
    title: Localized<string>;
    description: Localized<string>;
    keywords: Localized<string[]>;
  };
  content: {
    eyebrow: Localized<string>;
    title: Localized<string>;
    body: Localized<string>;
    note?: Localized<string>;
  };
};

export type FutureEditorialPage = {
  slug: string;
  meta: {
    title: Localized<string>;
    description: Localized<string>;
    keywords: Localized<string[]>;
  };
  content: {
    eyebrow: Localized<string>;
    title: Localized<string>;
    body: Localized<string>;
  };
};

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: "restaurant-almancil",
    primaryCta: { href: "/reservations", labelKey: "reserve" },
    secondaryCta: { href: "/about", labelKey: "about" },
    meta: {
      title: {
        pt: "Restaurante em Almancil | Restaurante Figueiral desde 1986",
        en: "Restaurant in Almancil | Restaurante Figueiral since 1986"
      },
      description: {
        pt: "Restaurante premium em Almancil, Algarve: picanha na grelha, vinho português e hospitalidade familiar desde 1986. Perto da Quinta do Lago e Vale do Lobo.",
        en: "Premium restaurant in Almancil, Algarve: fire-grilled picanha, Portuguese wine and family hospitality since 1986. Near Quinta do Lago and Vale do Lobo."
      },
      keywords: {
        pt: ["restaurante Almancil", "restaurante premium Algarve", "jantar Almancil", "Restaurante Figueiral"],
        en: ["restaurant Almancil", "premium restaurant Algarve", "dinner Almancil", "Restaurante Figueiral"]
      }
    },
    content: {
      eyebrow: { pt: "Almancil, Algarve", en: "Almancil, Algarve" },
      title: {
        pt: "Uma casa de referência em Almancil — fogo, vinho e mesas que se prolongam.",
        en: "A reference house in Almancil — fire, wine and tables that linger."
      },
      body: {
        pt: "Desde 1986, o Figueiral é parte do quotidiano de Almancil: famílias locais, habitués de há décadas e visitantes que procuram uma mesa honesta, bem servida e sem pressa. A grelha é o coração; a receção, o que faz muitos clientes voltar.",
        en: "Since 1986, Figueiral has been part of everyday Almancil: local families, decades-long regulars and visitors looking for an honest table, well served and unhurried. The grill is the heart; the welcome is what brings many guests back."
      },
      note: {
        pt: "Entre a Quinta do Lago e Vale do Lobo — a cinco minutos de carro.",
        en: "Between Quinta do Lago and Vale do Lobo — five minutes by car."
      }
    }
  },
  {
    slug: "best-picanha-algarve",
    primaryCta: { href: "/menu", labelKey: "menu" },
    secondaryCta: { href: "/reservations", labelKey: "reserve" },
    meta: {
      title: {
        pt: "Melhor Picanha no Algarve | Restaurante Figueiral Almancil",
        en: "Best Picanha in the Algarve | Restaurante Figueiral Almancil"
      },
      description: {
        pt: "Picanha ao estilo brasileiro grelhada no fogo, fatiada à mesa — a assinatura do Restaurante Figueiral em Almancil desde 1986.",
        en: "Brazilian-style picanha grilled over fire, sliced at the table — the signature of Restaurante Figueiral in Almancil since 1986."
      },
      keywords: {
        pt: ["melhor picanha Algarve", "picanha Almancil", "picanha grelhada Algarve", "Restaurante Figueiral"],
        en: ["best picanha Algarve", "picanha Almancil", "grilled picanha Algarve", "Restaurante Figueiral"]
      }
    },
    content: {
      eyebrow: { pt: "Assinatura da casa", en: "House signature" },
      title: {
        pt: "A picanha que a imprensa cita e os clientes pedem de cor.",
        en: "The picanha the press mentions and guests order from memory."
      },
      body: {
        pt: "Grelhada no fogo, fatiada à mesa, generosa e convivial — é o prato que define o Figueiral. Não é espetáculo; é tradição repetida todas as noites, com o mesmo cuidado de sempre.",
        en: "Grilled over fire, sliced at the table, generous and convivial — the dish that defines Figueiral. Not spectacle; tradition repeated every night, with the same care as always."
      }
    }
  },
  {
    slug: "restaurant-quinta-do-lago",
    primaryCta: { href: "/reservations", labelKey: "reserve" },
    secondaryCta: { href: "/contact", labelKey: "contact" },
    meta: {
      title: {
        pt: "Restaurante perto da Quinta do Lago | Restaurante Figueiral",
        en: "Restaurant near Quinta do Lago | Restaurante Figueiral"
      },
      description: {
        pt: "A cinco minutos da Quinta do Lago e Vale do Lobo: carnes na grelha, vinho português e hospitalidade familiar em Almancil.",
        en: "Five minutes from Quinta do Lago and Vale do Lobo: fire-grilled meats, Portuguese wine and family hospitality in Almancil."
      },
      keywords: {
        pt: ["restaurante Quinta do Lago", "jantar Quinta do Lago", "restaurante Vale do Lobo", "Almancil"],
        en: ["restaurant Quinta do Lago", "dinner Quinta do Lago", "restaurant Vale do Lobo", "Almancil"]
      }
    },
    content: {
      eyebrow: { pt: "Perto da Quinta do Lago", en: "Near Quinta do Lago" },
      title: {
        pt: "O refúgio de mesa para quem fica na zona — sem formalidade desnecessária.",
        en: "A dining refuge for those staying in the area — without unnecessary formality."
      },
      body: {
        pt: "Muitos dos nossos clientes vêm da Quinta do Lago, Vale do Lobo ou hotéis vizinhos. Procuram uma noite boa, bem servida, com a naturalidade de quem está em casa no Algarve — e é isso que tratamos de oferecer.",
        en: "Many of our guests come from Quinta do Lago, Vale do Lobo or nearby hotels. They want a good night, well served, with the ease of being at home in the Algarve — and that is what we aim to offer."
      }
    }
  },
  {
    slug: "wine-experience-algarve",
    primaryCta: { href: "/wine-experience", labelKey: "wine" },
    secondaryCta: { href: "/reservations", labelKey: "reserve" },
    meta: {
      title: {
        pt: "Experiência de Vinho no Algarve | Restaurante Figueiral",
        en: "Wine Experience in the Algarve | Restaurante Figueiral"
      },
      description: {
        pt: "Carta de vinhos portugueses escolhida para acompanhar carnes na grelha e jantares longos em Almancil, Algarve.",
        en: "Portuguese wine list chosen to accompany fire-grilled meats and long dinners in Almancil, Algarve."
      },
      keywords: {
        pt: ["vinho Algarve", "carta de vinhos Almancil", "harmonização carnes", "Restaurante Figueiral"],
        en: ["wine Algarve", "wine list Almancil", "meat pairing", "Restaurante Figueiral"]
      }
    },
    content: {
      eyebrow: { pt: "Vinhos portugueses", en: "Portuguese wines" },
      title: {
        pt: "Garrafas que acompanham a noite — não que dominam a mesa.",
        en: "Bottles that accompany the evening — not dominate the table."
      },
      body: {
        pt: "Ao longo dos anos fomos juntando rótulos que fazem sentido aqui: para a picanha, para o peixe, para aquele jantar que se prolonga sem pressa. A escolha é nossa; o tempo é de quem está sentado.",
        en: "Over the years we have gathered labels that make sense here: for picanha, for fish, for that dinner that stretches without hurry. The choice is ours; the time belongs to those seated."
      }
    }
  }
];

export const futureEditorialPages: FutureEditorialPage[] = [
  {
    slug: "journal",
    meta: {
      title: {
        pt: "Journal | Restaurante Figueiral Almancil",
        en: "Journal | Restaurante Figueiral Almancil"
      },
      description: {
        pt: "Notas editoriais, histórias de mesa e reflexões sobre hospitalidade no Algarve — em breve no Restaurante Figueiral.",
        en: "Editorial notes, table stories and reflections on hospitality in the Algarve — coming soon at Restaurante Figueiral."
      },
      keywords: {
        pt: ["journal Figueiral", "hospitalidade Algarve", "restaurante Almancil"],
        en: ["Figueiral journal", "Algarve hospitality", "Almancil restaurant"]
      }
    },
    content: {
      eyebrow: { pt: "Em breve", en: "Coming soon" },
      title: { pt: "Journal", en: "Journal" },
      body: {
        pt: "Estamos a preparar um arquivo editorial com histórias da casa, notas de mesa e reflexões sobre o ritmo do restaurante em Almancil.",
        en: "We are preparing an editorial archive with stories from the house, table notes and reflections on the rhythm of the restaurant in Almancil."
      }
    }
  },
  {
    slug: "stories",
    meta: {
      title: {
        pt: "Histórias | Restaurante Figueiral",
        en: "Stories | Restaurante Figueiral"
      },
      description: {
        pt: "Histórias reais de clientes, equipa e décadas de mesa partilhada no Figueiral — em breve.",
        en: "Real stories of guests, team and decades of shared tables at Figueiral — coming soon."
      },
      keywords: {
        pt: ["histórias Figueiral", "restaurante familiar Algarve"],
        en: ["Figueiral stories", "family restaurant Algarve"]
      }
    },
    content: {
      eyebrow: { pt: "Em breve", en: "Coming soon" },
      title: { pt: "Histórias", en: "Stories" },
      body: {
        pt: "Rostos, memórias e pequenos momentos que construíram a reputação do Figueiral ao longo de quatro décadas.",
        en: "Faces, memories and small moments that built Figueiral's reputation over four decades."
      }
    }
  },
  {
    slug: "wine-stories",
    meta: {
      title: {
        pt: "Wine Stories | Restaurante Figueiral",
        en: "Wine Stories | Restaurante Figueiral"
      },
      description: {
        pt: "Histórias de garrafas, produtores e harmonizações à mesa no Figueiral — em breve.",
        en: "Stories of bottles, producers and pairings at the table at Figueiral — coming soon."
      },
      keywords: {
        pt: ["wine stories Algarve", "vinho português Almancil"],
        en: ["wine stories Algarve", "Portuguese wine Almancil"]
      }
    },
    content: {
      eyebrow: { pt: "Em breve", en: "Coming soon" },
      title: { pt: "Wine Stories", en: "Wine Stories" },
      body: {
        pt: "As garrafas que escolhemos, os produtores que respeitamos e as noites em que o vinho prolonga a conversa.",
        en: "The bottles we choose, the producers we respect and the evenings when wine extends the conversation."
      }
    }
  },
  {
    slug: "algarve-guide",
    meta: {
      title: {
        pt: "Guia Algarve | Restaurante Figueiral Almancil",
        en: "Algarve Guide | Restaurante Figueiral Almancil"
      },
      description: {
        pt: "O nosso olhar sobre Almancil, a Quinta do Lago e o Algarve — em breve no Restaurante Figueiral.",
        en: "Our view of Almancil, Quinta do Lago and the Algarve — coming soon at Restaurante Figueiral."
      },
      keywords: {
        pt: ["guia Algarve", "Almancil restaurante", "Quinta do Lago"],
        en: ["Algarve guide", "Almancil restaurant", "Quinta do Lago"]
      }
    },
    content: {
      eyebrow: { pt: "Em breve", en: "Coming soon" },
      title: { pt: "Algarve Guide", en: "Algarve Guide" },
      body: {
        pt: "Sugestões honestas para quem nos visita: o que vale a pena conhecer na zona, além da nossa mesa.",
        en: "Honest suggestions for those who visit us: what is worth knowing in the area, beyond our table."
      }
    }
  },
  {
    slug: "hospitality-notes",
    meta: {
      title: {
        pt: "Hospitality Notes | Restaurante Figueiral",
        en: "Hospitality Notes | Restaurante Figueiral"
      },
      description: {
        pt: "Reflexões sobre receber bem, servir com memória e cuidar da mesa — em breve.",
        en: "Reflections on welcoming well, serving with memory and caring for the table — coming soon."
      },
      keywords: {
        pt: ["hospitalidade Algarve", "restaurante premium Almancil"],
        en: ["Algarve hospitality", "premium restaurant Almancil"]
      }
    },
    content: {
      eyebrow: { pt: "Em breve", en: "Coming soon" },
      title: { pt: "Hospitality Notes", en: "Hospitality Notes" },
      body: {
        pt: "Notas sobre o que significa receber bem — escrito por quem vive o restaurante todas as noites.",
        en: "Notes on what it means to welcome well — written by those who live the restaurant every night."
      }
    }
  }
];

export function t<T>(value: Localized<T>, lang: Locale): T {
  return value[lang];
}

export function getSeoLandingPage(slug: string): SeoLandingPage | undefined {
  return seoLandingPages.find((page) => page.slug === slug);
}

export function getAllSeoLandingSlugs(): string[] {
  return seoLandingPages.map((page) => page.slug);
}

export function getFutureEditorialPage(slug: string): FutureEditorialPage | undefined {
  return futureEditorialPages.find((page) => page.slug === slug);
}

export function getAllFutureEditorialSlugs(): string[] {
  return futureEditorialPages.map((page) => page.slug);
}

export function getAllEditorialSlugs(): string[] {
  return [...getAllSeoLandingSlugs(), ...getAllFutureEditorialSlugs()];
}

export function getEditorialPage(slug: string): SeoLandingPage | FutureEditorialPage | undefined {
  return getSeoLandingPage(slug) ?? getFutureEditorialPage(slug);
}

export function isSeoLandingPage(page: SeoLandingPage | FutureEditorialPage): page is SeoLandingPage {
  return "primaryCta" in page;
}
