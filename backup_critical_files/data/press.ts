import type { Locale } from "@/i18n/config";

export type PressCategoryId = "gastronomia" | "lifestyle" | "turismo" | "internacional";

type Localized = { pt: string; en: string };

export type PressArticleContent = {
  summary: Localized;
  context: Localized;
  pullQuotes: { pt: string[]; en: string[] };
};

export type PressArticle = {
  id: string;
  slug: string;
  category: PressCategoryId;
  date: string;
  publication: Localized;
  logo: string | null;
  title: Localized;
  summary: Localized;
  excerpt: Localized;
  context: Localized;
  pullQuotes: { pt: string[]; en: string[] };
  originalUrl: string;
  image: string;
  imageAlt: Localized;
  meta: {
    title: Localized;
    description: Localized;
    keywords: { pt: string[]; en: string[] };
  };
};

export const pressArticles: PressArticle[] = [
  {
    id: "luxury-editor-must-visit",
    slug: "luxury-editor-must-visit",
    logo: null,
    category: "lifestyle",
    date: "2023-06-12",
    publication: { pt: "The Luxury Editor", en: "The Luxury Editor" },
    title: {
      pt: "O destino gastronómico familiar perto da Quinta do Lago",
      en: "The family-owned gastronomic destination near Quinta do Lago"
    },
    excerpt: {
      pt: "Uma crítica que destaca a picanha, a consistência da casa e a sensação de restaurante vivido há gerações em Almancil.",
      en: "A review highlighting picanha, the house consistency and the feeling of a restaurant lived across generations in Almancil."
    },
    summary: {
      pt: "The Luxury Editor descreve o Figueiral como um ponto de referência para quem procura autenticidade perto da Quinta do Lago — longe do circuito ruidoso, mas próximo o suficiente para quem viaja pela região. A peça sublinha a picanha ao estilo brasileiro, a carta de vinhos portugueses e a hospitalidade familiar que faz com que muitos clientes regressem ano após ano.",
      en: "The Luxury Editor describes Figueiral as a reference for those seeking authenticity near Quinta do Lago — away from the noisy circuit, yet close enough for travellers exploring the region. The piece emphasises Brazilian-style picanha, the Portuguese wine list and family hospitality that brings guests back year after year."
    },
    context: {
      pt: "Publicado num contexto de guias de viagem de luxo no Algarve, o artigo posiciona o Figueiral como uma pausa gastronómica credível entre Almancil, Vale do Lobo e a costa algarvia.",
      en: "Published in the context of Algarve luxury travel guides, the article positions Figueiral as a credible gastronomic pause between Almancil, Vale do Lobo and the Algarve coast."
    },
    pullQuotes: {
      pt: [
        "Um restaurante familiar que parece ter encontrado o equilíbrio entre tradição e conforto.",
        "A picanha continua a ser o prato que define a identidade da casa."
      ],
      en: [
        "A family restaurant that seems to have found the balance between tradition and comfort.",
        "Picanha remains the dish that defines the identity of the house."
      ]
    },
    originalUrl:
      "https://theluxuryeditor.com/review/figueiral-restaurant-the-must-visit-family-owned-gastronomic-destination-near-quinta-do-lago-portugal/",
    image: "/images/press/luxury-editor-review.webp",
    imageAlt: {
      pt: "Picanha grelhada no Restaurante Figueiral — menção The Luxury Editor",
      en: "Grilled picanha at Restaurante Figueiral — The Luxury Editor feature"
    },
    meta: {
      title: {
        pt: "O destino gastronómico familiar perto da Quinta do Lago — The Luxury Editor",
        en: "The family-owned gastronomic destination near Quinta do Lago — The Luxury Editor"
      },
      description: {
        pt: "Menção editorial da The Luxury Editor ao Restaurante Figueiral, casa familiar em Almancil perto da Quinta do Lago.",
        en: "The Luxury Editor feature on Restaurante Figueiral, a family house in Almancil near Quinta do Lago."
      },
      keywords: {
        pt: ["Luxury Editor Figueiral", "restaurante Quinta do Lago", "picanha Almancil"],
        en: ["Luxury Editor Figueiral", "Quinta do Lago restaurant", "picanha Almancil"]
      }
    }
  },
  {
    id: "magg-melhor-picanha-algarve",
    slug: "magg-melhor-picanha-algarve",
    logo: null,
    category: "gastronomia",
    date: "2024-03-18",
    publication: { pt: "MAGG", en: "MAGG" },
    title: {
      pt: "A melhor picanha do Algarve",
      en: "The best picanha in the Algarve"
    },
    excerpt: {
      pt: "Travel MAGG destaca a picanha do Figueiral como uma referência gastronómica em Almancil.",
      en: "Travel MAGG highlights Figueiral picanha as a gastronomic reference in Almancil."
    },
    summary: {
      pt: "O artigo da MAGG aproxima o Figueiral de quem viaja pelo Algarve à procura de mesas com memória. A picanha ao estilo brasileiro é apresentada como razão suficiente para desviar a rota até Almancil — com foco no produto, na grelha e na consistência de uma casa que mantém o mesmo discurso há décadas.",
      en: "The MAGG article brings Figueiral closer to those travelling the Algarve in search of tables with memory. Brazilian-style picanha is presented as reason enough to detour to Almancil — with focus on produce, the grill and the consistency of a house that has kept the same story for decades."
    },
    context: {
      pt: "Integrado na vertical de viagens da MAGG, o texto reforça o Figueiral como paragem natural para quem explora o Algarve central.",
      en: "Part of MAGG's travel vertical, the text reinforces Figueiral as a natural stop for those exploring central Algarve."
    },
    pullQuotes: {
      pt: ["Uma paragem obrigatória para amantes de carne na grelha."],
      en: ["A must-stop for fire-grilled meat lovers."]
    },
    originalUrl: "https://magg.sapo.pt/viagens/travelmagg/artigos/a-melhor-picanha-do-algarve",
    image: "/images/press/magg-picanha.webp",
    imageAlt: {
      pt: "Picanha na grelha — artigo MAGG sobre o Figueiral",
      en: "Picanha on the grill — MAGG article on Figueiral"
    },
    meta: {
      title: { pt: "A melhor picanha do Algarve — MAGG", en: "The best picanha in the Algarve — MAGG" },
      description: {
        pt: "Resumo editorial da menção MAGG ao Restaurante Figueiral e à picanha em Almancil.",
        en: "Editorial summary of MAGG coverage of Restaurante Figueiral and picanha in Almancil."
      },
      keywords: { pt: ["MAGG Figueiral", "picanha Algarve"], en: ["MAGG Figueiral", "picanha Algarve"] }
    }
  },
  {
    id: "revista-bica-melhor-picanha-algarve",
    slug: "revista-bica-melhor-picanha-algarve",
    logo: null,
    category: "gastronomia",
    date: "2024-02-10",
    publication: { pt: "Revista Bica", en: "Revista Bica" },
    title: {
      pt: "Convite a degustar a melhor picanha do Algarve",
      en: "An invitation to taste the best picanha in the Algarve"
    },
    excerpt: {
      pt: "A Revista Bica sublinha a picanha como estrela da carta e convite à mesa algarvia.",
      en: "Revista Bica emphasises picanha as the menu star and an invitation to the Algarve table."
    },
    summary: {
      pt: "A peça gastronómica descreve o Figueiral como uma casa onde a picanha não é moda — é identidade. O texto liga o fogo da grelha à hospitalidade de Almancil e à relação de confiança com clientes habituais e visitantes.",
      en: "The gastronomy piece describes Figueiral as a house where picanha is not a trend — it is identity. The text connects the grill fire to Almancil hospitality and the trust built with regulars and visitors."
    },
    context: {
      pt: "Publicação ligada à cultura e gastronomia regional, reforça a reputação da picanha do Figueiral no Algarve.",
      en: "A publication tied to regional culture and food, reinforcing Figueiral picanha reputation in the Algarve."
    },
    pullQuotes: {
      pt: ["A picanha ao estilo brasileiro continua a ser o ex-líbris da casa."],
      en: ["Brazilian-style picanha remains the house signature dish."]
    },
    originalUrl:
      "https://revistabica.com/restaurante-figueiral-convida-a-degustar-a-melhor-picanha-do-algarve/",
    image: "/images/press/bica-picanha.webp",
    imageAlt: {
      pt: "Picanha — Revista Bica, Restaurante Figueiral",
      en: "Picanha — Revista Bica, Restaurante Figueiral"
    },
    meta: {
      title: { pt: "Convite a degustar a melhor picanha do Algarve — Revista Bica", en: "An invitation to taste the best picanha in the Algarve — Revista Bica" },
      description: {
        pt: "Menção da Revista Bica à picanha do Restaurante Figueiral em Almancil.",
        en: "Revista Bica mention of picanha at Restaurante Figueiral in Almancil."
      },
      keywords: { pt: ["Revista Bica Figueiral"], en: ["Revista Bica Figueiral"] }
    }
  },
  {
    id: "anoticia-melhor-picanha-almancil",
    slug: "anoticia-melhor-picanha-almancil",
    logo: null,
    category: "gastronomia",
    date: "2024-10-09",
    publication: { pt: "A Notícia", en: "A Notícia" },
    title: {
      pt: "Degustar a melhor picanha do Algarve em Almancil",
      en: "Tasting the best picanha in the Algarve in Almancil"
    },
    excerpt: {
      pt: "Jornal regional destaca o Figueiral como referência de picanha na zona de Almancil.",
      en: "Regional newspaper highlights Figueiral as a picanha reference in the Almancil area."
    },
    summary: {
      pt: "A Notícia aproxima o leitor local e visitante da proposta do Figueiral: carne na grelha, ambiente descontraído e uma picanha que atravessa gerações de clientes. O artigo reforça a ligação da casa ao território algarvio.",
      en: "A Notícia brings local and visiting readers closer to Figueiral's offer: fire-grilled meat, a relaxed setting and a picanha that spans generations of guests. The article reinforces the house bond with the Algarve."
    },
    context: {
      pt: "Cobertura de imprensa regional que documenta a reputação acumulada do restaurante em Almancil.",
      en: "Regional press coverage documenting the restaurant's accumulated reputation in Almancil."
    },
    pullQuotes: {
      pt: ["Em Almancil, a picanha do Figueiral é pedida com naturalidade e confiança."],
      en: ["In Almancil, Figueiral picanha is ordered with ease and confidence."]
    },
    originalUrl:
      "https://anoticia.pt/2024/10/09/em-almancil-e-possivel-degustar-aquela-que-e-considerada-a-melhor-picanha-do-algarve/",
    image: "/images/press/anoticia-picanha.webp",
    imageAlt: {
      pt: "Preparação de picanha — A Notícia, Figueiral Almancil",
      en: "Picanha preparation — A Notícia, Figueiral Almancil"
    },
    meta: {
      title: { pt: "Degustar a melhor picanha do Algarve em Almancil — A Notícia", en: "Tasting the best picanha in the Algarve in Almancil — A Notícia" },
      description: {
        pt: "Resumo da menção da A Notícia ao Restaurante Figueiral e à picanha no Algarve.",
        en: "Summary of A Notícia coverage of Restaurante Figueiral and picanha in the Algarve."
      },
      keywords: { pt: ["A Notícia Figueiral"], en: ["A Notícia Figueiral"] }
    }
  },
  {
    id: "observador-picanha-fim-semana",
    slug: "observador-picanha-fim-semana",
    logo: null,
    category: "gastronomia",
    date: "2023-11-03",
    publication: { pt: "Observador", en: "Observador" },
    title: {
      pt: "Picanha e boa mesa no fim de semana algarvio",
      en: "Picanha and a good table for an Algarve weekend"
    },
    excerpt: {
      pt: "O Observador inclui o Figueiral numa seleção de experiências gastronómicas no Algarve.",
      en: "Observador includes Figueiral in a selection of gastronomic experiences in the Algarve."
    },
    summary: {
      pt: "Numa lista de sugestões para o fim de semana, o Observador aponta o Figueiral como paragem credível para quem procura carne, vinho e ambiente familiar. A referência insere-se num contexto de lifestyle nacional, não apenas regional.",
      en: "In a weekend suggestions list, Observador points to Figueiral as a credible stop for those seeking meat, wine and a family atmosphere. The reference sits in a national lifestyle context, not only regional."
    },
    context: {
      pt: "Menção em media nacional que amplia a visibilidade do restaurante para além do Algarve.",
      en: "National media mention that extends the restaurant visibility beyond the Algarve."
    },
    pullQuotes: {
      pt: ["Uma mesa em Almancil para quem quer combinar fogo, vinho e calma."],
      en: ["A table in Almancil for those who want fire, wine and calm combined."]
    },
    originalUrl:
      "https://observador.pt/2023/11/03/picanha-trufa-branca-e-uma-amizade-cantada-em-palco-12-coisas-para-fazer-no-fim-de-semana/",
    image: "/images/press/observador-trufa.webp",
    imageAlt: {
      pt: "Fogo na cozinha — menção Observador, Figueiral",
      en: "Fire in the kitchen — Observador mention, Figueiral"
    },
    meta: {
      title: { pt: "Picanha e boa mesa no fim de semana algarvio — Observador", en: "Picanha and a good table for an Algarve weekend — Observador" },
      description: {
        pt: "Contexto editorial da menção do Observador ao Restaurante Figueiral.",
        en: "Editorial context of Observador mention of Restaurante Figueiral."
      },
      keywords: { pt: ["Observador Figueiral"], en: ["Observador Figueiral"] }
    }
  },
  {
    id: "lux-figueiral-tradicao-almancil",
    slug: "lux-figueiral-tradicao-almancil",
    logo: null,
    category: "lifestyle",
    date: "2023-10-09",
    publication: { pt: "Lux", en: "Lux" },
    title: {
      pt: "O restaurante com maior tradição em Almancil",
      en: "The restaurant with the longest tradition in Almancil"
    },
    excerpt: {
      pt: "A revista Lux destaca décadas de presença e consistência do Figueiral na região.",
      en: "Lux magazine highlights decades of presence and consistency of Figueiral in the region."
    },
    summary: {
      pt: "O artigo da Lux enquadra o Figueiral como uma instituição local — não no sentido formal, mas no sentido vivido: clientes que voltam, pratos que se repetem, uma sala que conhece o ritmo de Almancil. A tradição aparece ligada à picanha e à forma de receber.",
      en: "The Lux article frames Figueiral as a local institution — not formally, but lived: returning guests, recurring dishes, a dining room that knows Almancil's pace. Tradition is tied to picanha and the way of welcoming."
    },
    context: {
      pt: "Publicação de lifestyle que reforça a imagem premium e humana do restaurante.",
      en: "Lifestyle publication reinforcing the restaurant's premium yet human image."
    },
    pullQuotes: {
      pt: ["Mais do que servir — uma casa que cuida de quem entra há décadas."],
      en: ["More than serving — a house that cares for those who walk in for decades."]
    },
    originalUrl: "https://www.lux.iol.pt/lifestyle/09-10-2023/figueiral-o-restaurante-com-maior-tradicao-em-almancil",
    image: "/images/press/lux-almancil.webp",
    imageAlt: {
      pt: "Receção no Figueiral — artigo Lux",
      en: "Reception at Figueiral — Lux article"
    },
    meta: {
      title: { pt: "O restaurante com maior tradição em Almancil — Lux", en: "The restaurant with the longest tradition in Almancil — Lux" },
      description: {
        pt: "Resumo editorial da menção Lux ao Restaurante Figueiral.",
        en: "Editorial summary of Lux coverage of Restaurante Figueiral."
      },
      keywords: { pt: ["Lux Figueiral Almancil"], en: ["Lux Figueiral Almancil"] }
    }
  },
  {
    id: "portugal-news-key-to-success",
    slug: "portugal-news-key-to-success",
    logo: null,
    category: "lifestyle",
    date: "2022-10-14",
    publication: { pt: "The Portugal News", en: "The Portugal News" },
    title: {
      pt: "A chave do sucesso do Restaurante Figueiral",
      en: "The key to success at Restaurante Figueiral"
    },
    excerpt: {
      pt: "Jornal internacional em inglês destaca a história familiar e a consistência da casa.",
      en: "International English-language newspaper highlights the family story and house consistency."
    },
    summary: {
      pt: "The Portugal News explora o percurso do Figueiral desde 1986, sublinhando a relação entre equipa, produto e clientes internacionais que frequentam a zona da Quinta do Lago e Vale do Lobo.",
      en: "The Portugal News explores Figueiral's journey since 1986, emphasising the relationship between team, produce and international guests who visit the Quinta do Lago and Vale do Lobo area."
    },
    context: {
      pt: "Cobertura orientada para residentes estrangeiros e visitantes internacionais no Algarve.",
      en: "Coverage aimed at foreign residents and international visitors in the Algarve."
    },
    pullQuotes: {
      pt: ["Uma história de consistência numa região em constante mudança."],
      en: ["A story of consistency in a region in constant change."]
    },
    originalUrl: "https://www.theportugalnews.com/news/2022-10-14/the-key-to-success-figueiral-restaurant/71167",
    image: "/images/press/portugal-news-success.webp",
    imageAlt: {
      pt: "Convívio à mesa — The Portugal News",
      en: "Dining together — The Portugal News"
    },
    meta: {
      title: { pt: "A chave do sucesso do Restaurante Figueiral — The Portugal News", en: "The key to success at Restaurante Figueiral — The Portugal News" },
      description: {
        pt: "Menção The Portugal News ao Restaurante Figueiral em Almancil.",
        en: "The Portugal News mention of Restaurante Figueiral in Almancil."
      },
      keywords: { pt: ["Portugal News Figueiral"], en: ["Portugal News Figueiral"] }
    }
  },
  {
    id: "portugal-news-figueiral-experience",
    slug: "portugal-news-figueiral-experience",
    logo: null,
    category: "lifestyle",
    date: "2022-10-28",
    publication: { pt: "The Portugal News", en: "The Portugal News" },
    title: {
      pt: "A experiência Figueiral",
      en: "The Figueiral experience"
    },
    excerpt: {
      pt: "Segunda peça da mesma publicação sobre o ritmo, a mesa e a hospitalidade da casa.",
      en: "A second piece from the same publication on the pace, table and hospitality of the house."
    },
    summary: {
      pt: "Complementando a cobertura anterior, este artigo descreve o que significa jantar no Figueiral: fogo, vinho, tempo sem pressa e uma equipa que conhece o ritmo de quem escolhe Almancil como base no Algarve.",
      en: "Complementing the earlier coverage, this article describes what dining at Figueiral means: fire, wine, unhurried time and a team that knows the pace of those who choose Almancil as a base in the Algarve."
    },
    context: {
      pt: "Reforço editorial internacional da proposta da casa para visitantes anglófonos.",
      en: "International editorial reinforcement of the house offer for English-speaking visitors."
    },
    pullQuotes: {
      pt: ["Uma noite sem pressa, entre a grelha e a conversa."],
      en: ["An evening without hurry, between the grill and conversation."]
    },
    originalUrl: "https://www.theportugalnews.com/news/2022-10-28/a-figueiral-experience/71541",
    image: "/images/press/portugal-news-experience.webp",
    imageAlt: {
      pt: "Garrafeira — The Portugal News, Figueiral",
      en: "Wine cellar — The Portugal News, Figueiral"
    },
    meta: {
      title: { pt: "A experiência Figueiral — The Portugal News", en: "The Figueiral experience — The Portugal News" },
      description: {
        pt: "Resumo da segunda menção The Portugal News ao Figueiral.",
        en: "Summary of the second The Portugal News feature on Figueiral."
      },
      keywords: { pt: ["Figueiral Portugal News"], en: ["Figueiral Portugal News"] }
    }
  },
  {
    id: "business-traveller-restaurant-guide",
    slug: "business-traveller-restaurant-guide",
    logo: null,
    category: "lifestyle",
    date: "2023-04-22",
    publication: { pt: "Business Traveller", en: "Business Traveller" },
    title: {
      pt: "Guia de restaurantes para jantar com estilo",
      en: "Restaurant guide to dine in style"
    },
    excerpt: {
      pt: "Menção num guia internacional de viagens de negócios e lifestyle.",
      en: "Mention in an international business travel and lifestyle guide."
    },
    summary: {
      pt: "O Figueiral surge num guia de restauração para viajantes exigentes, posicionado como opção credível perto dos empreendimentos de luxo do Algarve central — com carne, vinho e ambiente maduro.",
      en: "Figueiral appears in a dining guide for discerning travellers, positioned as a credible option near central Algarve luxury resorts — with meat, wine and a mature atmosphere."
    },
    context: {
      pt: "Visibilidade junto de público internacional e viajantes de negócios na região.",
      en: "Visibility among international and business travellers in the region."
    },
    pullQuotes: {
      pt: ["Uma mesa credível entre Almancil e a costa algarvia."],
      en: ["A credible table between Almancil and the Algarve coast."]
    },
    originalUrl: "https://www.businesstraveller.com/sponsored/restaurant-guide-dine-in-style/",
    image: "/images/press/business-traveller.webp",
    imageAlt: {
      pt: "Esplanada do Figueiral — Business Traveller",
      en: "Figueiral terrace — Business Traveller"
    },
    meta: {
      title: { pt: "Guia de restaurantes para jantar com estilo — Business Traveller", en: "Restaurant guide to dine in style — Business Traveller" },
      description: {
        pt: "Menção Business Traveller ao Restaurante Figueiral.",
        en: "Business Traveller mention of Restaurante Figueiral."
      },
      keywords: { pt: ["Business Traveller Figueiral"], en: ["Business Traveller Figueiral"] }
    }
  },
  {
    id: "visit-algarve-figueiral",
    slug: "visit-algarve-figueiral",
    logo: null,
    category: "turismo",
    date: "2024-01-15",
    publication: { pt: "Visit Algarve", en: "Visit Algarve" },
    title: {
      pt: "Restaurante Figueiral no guia oficial do Algarve",
      en: "Restaurante Figueiral in the official Algarve guide"
    },
    excerpt: {
      pt: "Ficha oficial de turismo que documenta a casa em Almancil.",
      en: "Official tourism listing documenting the house in Almancil."
    },
    summary: {
      pt: "A presença no portal Visit Algarve consolida o Figueiral como ponto gastronómico recomendado para quem explora a região — com referência a Almancil, produto local e tradição de mesa.",
      en: "Presence on the Visit Algarve portal consolidates Figueiral as a recommended gastronomic point for those exploring the region — with reference to Almancil, local produce and dining tradition."
    },
    context: {
      pt: "Referência institucional de turismo regional.",
      en: "Institutional regional tourism reference."
    },
    pullQuotes: {
      pt: ["Um equipamento gastronómico de referência em Almancil."],
      en: ["A reference gastronomic venue in Almancil."]
    },
    originalUrl: "https://visitalgarve.pt/equipamento/9222/restaurante-figueiral",
    image: "/images/press/visit-algarve.webp",
    imageAlt: {
      pt: "Esplanada — Visit Algarve, Figueiral",
      en: "Terrace — Visit Algarve, Figueiral"
    },
    meta: {
      title: { pt: "Restaurante Figueiral no guia oficial do Algarve — Visit Algarve", en: "Restaurante Figueiral in the official Algarve guide — Visit Algarve" },
      description: {
        pt: "Ficha Visit Algarve do Restaurante Figueiral em Almancil.",
        en: "Visit Algarve listing for Restaurante Figueiral in Almancil."
      },
      keywords: { pt: ["Visit Algarve Figueiral"], en: ["Visit Algarve Figueiral"] }
    }
  },
  {
    id: "viagensa4-figueiral",
    slug: "viagensa4-figueiral",
    logo: null,
    category: "turismo",
    date: "2023-08-20",
    publication: { pt: "ViagensA4", en: "ViagensA4" },
    title: {
      pt: "Paragem gastronómica em Almancil",
      en: "A gastronomic stop in Almancil"
    },
    excerpt: {
      pt: "Blog de viagens português recomenda o Figueiral a quem atravessa o Algarve.",
      en: "Portuguese travel blog recommends Figueiral to those crossing the Algarve."
    },
    summary: {
      pt: "O artigo descreve o Figueiral como paragem natural para quem viaja pela A22 ou explora o interior algarvio — destacando a picanha, a garrafeira e a sensação de casa longe de casa.",
      en: "The article describes Figueiral as a natural stop for those travelling the A22 or exploring the Algarve interior — highlighting picanha, the wine cellar and a feeling of home away from home."
    },
    context: {
      pt: "Recomendação orgânica de viagem que reforça descoberta turística.",
      en: "Organic travel recommendation reinforcing tourist discovery."
    },
    pullQuotes: {
      pt: ["Vale a pena desviar até Almancil."],
      en: ["Worth the detour to Almancil."]
    },
    originalUrl: "https://viagensa4.com/restaurante-figueiral/",
    image: "/images/press/viagensa4.webp",
    imageAlt: {
      pt: "Vinho à mesa — ViagensA4, Figueiral",
      en: "Wine at the table — ViagensA4, Figueiral"
    },
    meta: {
      title: { pt: "Paragem gastronómica em Almancil — ViagensA4", en: "A gastronomic stop in Almancil — ViagensA4" },
      description: {
        pt: "Resumo da recomendação ViagensA4 ao Figueiral.",
        en: "Summary of ViagensA4 recommendation of Figueiral."
      },
      keywords: { pt: ["ViagensA4 Figueiral"], en: ["ViagensA4 Figueiral"] }
    }
  },
  {
    id: "evoque-tradition-modernity",
    slug: "evoque-tradition-modernity",
    logo: null,
    category: "internacional",
    date: "2022-05-12",
    publication: { pt: "Evoque Magazine", en: "Evoque Magazine" },
    title: {
      pt: "Tradição e modernidade no Figueiral",
      en: "Tradition and modernity at Figueiral"
    },
    excerpt: {
      pt: "Revista internacional explora o equilíbrio entre raiz e contemporaneidade.",
      en: "International magazine explores the balance between roots and contemporary dining."
    },
    summary: {
      pt: "A Evoque Magazine descreve o Figueiral como exemplo de casa que moderniza sem perder memória — grelha, vinho, equipa e clientes habituais como fio condutor de uma narrativa de décadas.",
      en: "Evoque Magazine describes Figueiral as an example of a house that modernises without losing memory — grill, wine, team and regulars as the thread of a decades-long narrative."
    },
    context: {
      pt: "Publicação internacional de lifestyle e gastronomia.",
      en: "International lifestyle and gastronomy publication."
    },
    pullQuotes: {
      pt: ["Raiz algarvia, mesa contemporânea."],
      en: ["Algarve roots, contemporary table."]
    },
    originalUrl: "https://evoquemagazine.pt/figueiral-tradition-and-modernity/",
    image: "/images/press/evoque-modernity.webp",
    imageAlt: {
      pt: "Empratamento — Evoque Magazine, Figueiral",
      en: "Plating — Evoque Magazine, Figueiral"
    },
    meta: {
      title: { pt: "Tradição e modernidade no Figueiral — Evoque Magazine", en: "Tradition and modernity at Figueiral — Evoque Magazine" },
      description: {
        pt: "Menção Evoque Magazine ao Restaurante Figueiral.",
        en: "Evoque Magazine feature on Restaurante Figueiral."
      },
      keywords: { pt: ["Evoque Figueiral"], en: ["Evoque Figueiral"] }
    }
  },
  {
    id: "evoque-passion-30-years",
    slug: "evoque-passion-30-years",
    logo: null,
    category: "internacional",
    date: "2021-11-08",
    publication: { pt: "Evoque Magazine", en: "Evoque Magazine" },
    title: {
      pt: "Uma paixão com mais de 30 anos",
      en: "A passion of more than 30 years"
    },
    excerpt: {
      pt: "Segunda menção Evoque sobre a dedicação familiar e a longevidade da casa.",
      en: "Second Evoque mention on family dedication and the house longevity."
    },
    summary: {
      pt: "O artigo centra-se na dedicação de Ivan, Cláudia e equipa — como a paixão pelo serviço e pelo produto sustenta um restaurante que atravessou gerações de clientes em Almancil.",
      en: "The article focuses on the dedication of Ivan, Cláudia and the team — how passion for service and produce sustains a restaurant that has spanned generations of guests in Almancil."
    },
    context: {
      pt: "Narrativa internacional sobre continuidade familiar e reputação.",
      en: "International narrative on family continuity and reputation."
    },
    pullQuotes: {
      pt: ["Mais do que um restaurante — uma história vivida à mesa."],
      en: ["More than a restaurant — a story lived at the table."]
    },
    originalUrl: "https://evoquemagazine.pt/figueiral-a-passion-with-more-than-30-years/",
    image: "/images/press/evoque-passion.webp",
    imageAlt: {
      pt: "Proprietários do Figueiral — Evoque Magazine",
      en: "Figueiral owners — Evoque Magazine"
    },
    meta: {
      title: { pt: "Uma paixão com mais de 30 anos — Evoque Magazine", en: "A passion of more than 30 years — Evoque Magazine" },
      description: {
        pt: "Resumo Evoque sobre a história familiar do Figueiral.",
        en: "Evoque summary on the Figueiral family story."
      },
      keywords: { pt: ["Evoque Figueiral família"], en: ["Evoque Figueiral family"] }
    }
  }
];

export function t(localized: Localized, lang: Locale): string {
  return localized[lang];
}

export function getAllPressSlugs(): string[] {
  return pressArticles.map((a) => a.slug);
}

export function getPressArticle(slug: string): PressArticle | undefined {
  return pressArticles.find((a) => a.slug === slug);
}

export function getFeaturedPressArticle(): PressArticle {
  return getPressArticlesSorted()[0];
}

export function getPressArticlesSorted(): PressArticle[] {
  return [...pressArticles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPressArticlesExceptFeatured(): PressArticle[] {
  return getPressArticlesSorted().slice(1);
}

export function getArticleContent(article: PressArticle): PressArticleContent {
  return {
    summary: article.summary,
    context: article.context,
    pullQuotes: article.pullQuotes
  };
}

export function formatPressDate(iso: string, lang: Locale): string {
  return new Intl.DateTimeFormat(lang === "pt" ? "pt-PT" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(iso));
}

export function pressArticlePath(lang: Locale, slug: string): string {
  return `/${lang}/about/press/${slug}`;
}
