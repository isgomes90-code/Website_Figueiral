import type { Locale } from "@/i18n/config";

type Localized<T> = Record<Locale, T>;

export type LocalContextCard = {
  label: Localized<string>;
  title: Localized<string>;
  body: Localized<string>;
};

export type LocalGalleryImage = {
  src: string;
  alt: Localized<string>;
  imageClassName?: string;
};

const houseGallery: LocalGalleryImage[] = [
  {
    src: "/images/food/Chateaubriand-opt.webp",
    alt: {
      pt: "Chateaubriand na grelha no Restaurante Figueiral.",
      en: "Chateaubriand on the grill at Restaurante Figueiral."
    },
    imageClassName: "object-[center_52%]"
  },
  {
    src: "/images/people/Rececao-clientes-opt.webp",
    alt: {
      pt: "Receção de clientes no Restaurante Figueiral.",
      en: "Guests being welcomed at Restaurante Figueiral."
    },
    imageClassName: "object-[center_48%]"
  },
  {
    src: "/images/people/Empratamento-3.webp",
    alt: {
      pt: "Empratamento no Restaurante Figueiral.",
      en: "Plating at Restaurante Figueiral."
    },
    imageClassName: "object-[center_32%]"
  },
  {
    src: "/images/food/Figueiral-servico.webp",
    alt: {
      pt: "Serviço de picanha à mesa no Restaurante Figueiral.",
      en: "Tableside picanha service at Restaurante Figueiral."
    },
    imageClassName: "object-[center_42%]"
  }
];

export type LocalLandingContent = {
  hero: {
    image: string;
    imageAlt: Localized<string>;
    imageClassName: string;
    subtitle: Localized<string>;
    overlay?: "default" | "daylight";
  };
  intro: {
    eyebrow: Localized<string>;
    title: Localized<string>;
    body: Localized<string>;
  };
  contexts: [LocalContextCard, LocalContextCard, LocalContextCard, LocalContextCard];
  house: {
    eyebrow: Localized<string>;
    title: Localized<string>;
    body: Localized<string>;
    note: Localized<string>;
    image: string;
    imageAlt: Localized<string>;
    supportingImage: string;
    supportingImageAlt: Localized<string>;
    supportingPosition?: "bottom-right" | "top-right";
    composition: "standard" | "panorama" | "intimate";
    imageClassName?: string;
  };
  gallery: LocalGalleryImage[];
  location: {
    eyebrow: Localized<string>;
    title: Localized<string>;
    body: Localized<string>;
    proximity: Localized<string>;
  };
  faq: Array<{ question: Localized<string>; answer: Localized<string> }>;
  finale: {
    eyebrow: Localized<string>;
    title: Localized<string>;
    body: Localized<string>;
  };
};

export const localLandingContent: Record<
  "restaurant-quinta-do-lago" | "restaurant-near-vale-do-lobo" | "restaurant-near-vilamoura",
  LocalLandingContent
> = {
  "restaurant-quinta-do-lago": {
    hero: {
      image: "/images/locations/QdL-Golf.webp",
      imageAlt: {
        pt: "Campo de golfe na Quinta do Lago, perto do Restaurante Figueiral em Almancil.",
        en: "Golf course at Quinta do Lago, near Restaurante Figueiral in Almancil."
      },
      imageClassName: "object-cover object-[center_70%]",
      overlay: "daylight",
      subtitle: {
        pt: "Picanha na grelha, vinho português e o ritmo calmo de uma casa em Almancil — para terminar o dia depois do golfe, da praia ou do resort.",
        en: "Fire-grilled picanha, Portuguese wine and the calm pace of a house in Almancil — to end the day after golf, the beach or the resort."
      }
    },
    intro: {
      eyebrow: { pt: "Ao lado da Quinta", en: "Beside Quinta do Lago" },
      title: {
        pt: "Uma mesa fora do circuito do resort, com a proximidade de quem já conhece a zona.",
        en: "A table away from the resort circuit, close enough for those who already know the area."
      },
      body: {
        pt: "Quem fica na Quinta do Lago procura, muitas vezes, uma noite diferente da do hotel: mais quieta, mais pessoal, com a grelha à vista. O Figueiral está em Almancil, próximo da Quinta — uma curta viagem para se sentar como em casa. O golfe, a praia e a Ria Formosa fazem o dia; a mesa, aqui, fecha-o.",
        en: "Guests staying at Quinta do Lago often want an evening unlike the hotel: quieter, more personal, with the grill in sight. Figueiral is in Almancil, close to Quinta — a short journey to sit as if at home. Golf, the beach and the Ria Formosa fill the day; the table here closes it."
      }
    },
    contexts: [
      {
        label: { pt: "Golfe", en: "Golf" },
        title: {
          pt: "Depois do campo, a mesa.",
          en: "After the course, the table."
        },
        body: {
          pt: "Um dia de golfe na Quinta pede uma noite sem relógio. Grelha acesa, vinho português, conversa que se prolonga — o Figueiral fecha o round com a calma que o campo já tinha começado.",
          en: "A day of golf at Quinta calls for an evening without a clock. Grill lit, Portuguese wine, conversation that lingers — Figueiral closes the round with the calm the course had already begun."
        }
      },
      {
        label: { pt: "Praia", en: "Beach" },
        title: {
          pt: "Da costa para a casa.",
          en: "From the coast to the house."
        },
        body: {
          pt: "Depois da praia, o que se quer é calor, produto e tempo. No Figueiral a grelha está pronta — carnes, peixe e uma mesa que não tem pressa de levantar.",
          en: "After the beach, what is wanted is warmth, produce and time. At Figueiral the grill is ready — meats, fish and a table in no hurry to rise."
        }
      },
      {
        label: { pt: "Ria Formosa", en: "Ria Formosa" },
        title: {
          pt: "A ria ao lado; o jantar, em Almancil.",
          en: "The lagoon beside you; dinner in Almancil."
        },
        body: {
          pt: "A Ria Formosa é o horizonte de quem está na Quinta. Nós não somos um miradouro — somos a mesa a que se regressa quando o dia ao ar livre pede fogo, picanha e uma garrafa aberta.",
          en: "The Ria Formosa is the horizon for those at Quinta. We are not a viewpoint — we are the table you return to when a day outdoors asks for fire, picanha and an open bottle."
        }
      },
      {
        label: { pt: "Jantar", en: "Dinner" },
        title: {
          pt: "Terminar o dia no Figueiral.",
          en: "End the day at Figueiral."
        },
        body: {
          pt: "Picanha fatiada à mesa, grelhados no fogo, hospitalidade familiar desde 1986. O destino da noite não é mais um restaurante do resort — é uma casa em Almancil.",
          en: "Picanha sliced at the table, fire grills, family hospitality since 1986. The evening's destination is not another resort restaurant — it is a house in Almancil."
        }
      }
    ],
    house: {
      eyebrow: { pt: "Desde 1986", en: "Since 1986" },
      title: {
        pt: "Picanha, fogo e uma receção que se lembra de quem volta.",
        en: "Picanha, fire and a welcome that remembers who returns."
      },
      body: {
        pt: "A assinatura da casa é a picanha ao estilo brasileiro, grelhada e fatiada à mesa. À volta, carnes, peixe, vinho português e uma equipa que trata da noite com naturalidade — sem formalidade de mais, sem pressa de menos.",
        en: "The house signature is Brazilian-style picanha, grilled and sliced at the table. Around it, meats, fish, Portuguese wine and a team that handles the evening naturally — without too much formality, without too little time."
      },
      note: {
        pt: "Uma casa familiar em Almancil. Quatro décadas à mesma mesa.",
        en: "A family house in Almancil. Four decades at the same table."
      },
      image: "/images/food/Picanha-fundo-branco.webp",
      imageAlt: {
        pt: "Picanha do Restaurante Figueiral, grelhada e servida à mesa.",
        en: "Picanha at Restaurante Figueiral, grilled and served at the table."
      },
      supportingImage: "/images/people/Proprietarios.webp",
      supportingImageAlt: {
        pt: "Ivan e Cláudia, proprietários do Restaurante Figueiral.",
        en: "Ivan and Cláudia, owners of Restaurante Figueiral."
      },
      composition: "panorama",
      imageClassName: "object-[center_48%]"
    },
    gallery: houseGallery,
    location: {
      eyebrow: { pt: "Como chegar", en: "How to find us" },
      title: {
        pt: "Em Almancil, próximo da Quinta do Lago.",
        en: "In Almancil, close to Quinta do Lago."
      },
      body: {
        pt: "O Figueiral fica em Almancil, a uma curta viagem de quem está na Quinta do Lago. Venha de carro, estacione connosco e jante sem pressa.",
        en: "Figueiral is in Almancil, a short journey from those staying at Quinta do Lago. Come by car, park with us and dine without hurry."
      },
      proximity: {
        pt: "No mesmo eixo encontra também Vale do Lobo. Estacionamento gratuito para clientes.",
        en: "Vale do Lobo sits on the same stretch. Free parking for guests."
      }
    },
    faq: [
      {
        question: {
          pt: "O Figueiral fica perto da Quinta do Lago?",
          en: "Is Figueiral near Quinta do Lago?"
        },
        answer: {
          pt: "Sim. Estamos em Almancil, próximo da Quinta do Lago — a uma curta viagem. Muitos dos nossos clientes vêm depois do golfe, da praia ou de um dia no resort.",
          en: "Yes. We are in Almancil, close to Quinta do Lago — a short journey. Many of our guests come after golf, the beach or a day at the resort."
        }
      },
      {
        question: {
          pt: "Preciso de reservar mesa?",
          en: "Do I need to book a table?"
        },
        answer: {
          pt: "Sim, sobretudo ao jantar e ao fim de semana. A sala enche com habitués e com quem fica na zona.",
          en: "Yes, especially for dinner and at the weekend. The room fills with regulars and with those staying in the area."
        }
      },
      {
        question: {
          pt: "Qual é o prato de assinatura?",
          en: "What is the signature dish?"
        },
        answer: {
          pt: "A picanha ao estilo brasileiro, grelhada no fogo e fatiada à mesa — o prato que define a casa.",
          en: "Brazilian-style picanha, grilled over fire and sliced at the table — the dish that defines the house."
        }
      },
      {
        question: {
          pt: "Há estacionamento?",
          en: "Is there parking?"
        },
        answer: {
          pt: "Sim. Há estacionamento gratuito para clientes.",
          en: "Yes. There is free parking for guests."
        }
      },
      {
        question: {
          pt: "O ambiente é formal?",
          en: "Is the atmosphere formal?"
        },
        answer: {
          pt: "Não. É uma casa familiar em Almancil: cuidada na mesa, descontraída na receção. Adequada a quem vem da Quinta sem querer o protocolo do resort.",
          en: "No. It is a family house in Almancil: careful at the table, easy at the door. Suited to those coming from Quinta who do not want resort formality."
        }
      },
      {
        question: {
          pt: "Qual é o horário?",
          en: "What are the opening hours?"
        },
        answer: {
          pt: "Servimos de segunda a sábado, das 19:00 às 22:00. Domingo encerrado.",
          en: "We serve Monday to Saturday, from 19:00 to 22:00. Closed on Sunday."
        }
      }
    ],
    finale: {
      eyebrow: { pt: "Reservas", en: "Reservations" },
      title: {
        pt: "Reserve mesa perto da Quinta do Lago.",
        en: "Book a table near Quinta do Lago."
      },
      body: {
        pt: "Para jantar a dois, em família ou com quem ficou na Quinta. Reserve online — nós tratamos do resto.",
        en: "For dinner for two, with family or with those staying at Quinta. Book online — we take care of the rest."
      }
    }
  },

  "restaurant-near-vale-do-lobo": {
    hero: {
      image: "/images/locations/VdL-Golf.webp",
      imageAlt: {
        pt: "Campo de golfe nas falésias de Vale do Lobo, perto do Restaurante Figueiral em Almancil.",
        en: "Cliff-top golf course at Vale do Lobo, near Restaurante Figueiral in Almancil."
      },
      imageClassName: "object-cover object-[center_72%]",
      overlay: "daylight",
      subtitle: {
        pt: "Uma mesa requintada e sem pressa, em Almancil — para casais e famílias que querem terminar o dia fora do resort.",
        en: "A refined, unhurried table in Almancil — for couples and families who want to end the day away from the resort."
      }
    },
    intro: {
      eyebrow: { pt: "Perto de Vale do Lobo", en: "Near Vale do Lobo" },
      title: {
        pt: "O final de tarde no resort; o jantar, numa casa que já conhece o ritmo da zona.",
        en: "Late afternoon at the resort; dinner in a house that already knows the pace of the area."
      },
      body: {
        pt: "Vale do Lobo pede noites com outro ritmo: menos circuito, mais mesa. O Figueiral fica em Almancil, próximo de Vale do Lobo — uma curta viagem depois do golfe, da praia ou de um final de tarde no resort. Casais, famílias, quem regressa todos os anos: a mesma grelha, a mesma receção.",
        en: "Vale do Lobo asks for evenings at a different pace: less of the circuit, more of the table. Figueiral is in Almancil, close to Vale do Lobo — a short journey after golf, the beach or a late afternoon at the resort. Couples, families, those who return every year: the same grill, the same welcome."
      }
    },
    contexts: [
      {
        label: { pt: "Golfe", en: "Golf" },
        title: {
          pt: "Depois do campo, o fogo.",
          en: "After the course, the fire."
        },
        body: {
          pt: "Quem joga em Vale do Lobo conhece o silêncio do campo. No Figueiral, esse silêncio continua à mesa: picanha na grelha, vinho escolhido, uma noite que não compete com o dia — prolonga-o.",
          en: "Those who play at Vale do Lobo know the quiet of the course. At Figueiral that quiet continues at the table: picanha on the grill, wine chosen, an evening that does not compete with the day — it extends it."
        }
      },
      {
        label: { pt: "Praia", en: "Beach" },
        title: {
          pt: "Sair da praia para a grelha.",
          en: "Leave the beach for the grill."
        },
        body: {
          pt: "O dia na praia de Vale do Lobo pede, à noite, calor e produto. Uma curta viagem até Almancil: carnes na grelha, peixe, uma mesa para a família ou para dois.",
          en: "A day on Vale do Lobo beach asks, by evening, for warmth and produce. A short journey to Almancil: meats on the grill, fish, a table for the family or for two."
        }
      },
      {
        label: { pt: "Resort", en: "Resort" },
        title: {
          pt: "O final de tarde pede mesa, não mais resort.",
          en: "Late afternoon asks for a table, not more of the resort."
        },
        body: {
          pt: "Há um momento, no resort, em que se quer outra sala — mais íntima, mais familiar. O Figueiral é essa pausa: próximo de Vale do Lobo, com a naturalidade de uma casa que recebe há décadas.",
          en: "There is a moment at the resort when another room is wanted — more intimate, more familiar. Figueiral is that pause: close to Vale do Lobo, with the ease of a house that has been welcoming guests for decades."
        }
      },
      {
        label: { pt: "Jantar", en: "Dinner" },
        title: {
          pt: "Para casais e famílias, sem pressa.",
          en: "For couples and families, without hurry."
        },
        body: {
          pt: "Picanha fatiada à mesa, grelhados, vinho português. Uma receção que trata bem quem vem a dois e quem traz as crianças. Desde 1986, o jantar é o que fecha o dia em Vale do Lobo para muitos dos nossos clientes.",
          en: "Picanha sliced at the table, grills, Portuguese wine. A welcome that looks after those coming as a couple and those bringing children. Since 1986, dinner is how many of our guests close the day from Vale do Lobo."
        }
      }
    ],
    house: {
      eyebrow: { pt: "A casa", en: "The house" },
      title: {
        pt: "Grelha à vista, picanha à mesa, hospitalidade de família.",
        en: "Grill in sight, picanha at the table, family hospitality."
      },
      body: {
        pt: "Desde 1986 servimos em Almancil com o mesmo critério: produto, fogo e tempo. A picanha brasileira é a assinatura; a receção é o que faz casais e famílias regressar quando estão em Vale do Lobo.",
        en: "Since 1986 we have served in Almancil with the same measure: produce, fire and time. Brazilian picanha is the signature; the welcome is what brings couples and families back when they are in Vale do Lobo."
      },
      note: {
        pt: "Requintado na mesa. Familiar na maneira de receber.",
        en: "Refined at the table. Familiar in the way we welcome."
      },
      image: "/images/food/Picanha-grelha-4-opt.webp",
      imageAlt: {
        pt: "Picanha na grelha no Restaurante Figueiral.",
        en: "Picanha on the grill at Restaurante Figueiral."
      },
      supportingImage: "/images/food/Figueiral-servico.webp",
      supportingImageAlt: {
        pt: "Serviço de picanha à mesa no Restaurante Figueiral.",
        en: "Tableside picanha service at Restaurante Figueiral."
      },
      supportingPosition: "top-right",
      composition: "intimate",
      imageClassName: "object-[center_42%]"
    },
    gallery: houseGallery,
    location: {
      eyebrow: { pt: "Como chegar", en: "How to find us" },
      title: {
        pt: "Em Almancil, próximo de Vale do Lobo.",
        en: "In Almancil, close to Vale do Lobo."
      },
      body: {
        pt: "O Figueiral fica em Almancil, a uma curta viagem de Vale do Lobo. Ideal para quem quer sair do resort ao jantar e regressar sem cálculo.",
        en: "Figueiral is in Almancil, a short journey from Vale do Lobo. Suited to those who want to leave the resort for dinner and return without calculation."
      },
      proximity: {
        pt: "Quinta do Lago fica no mesmo eixo. Estacionamento gratuito para clientes.",
        en: "Quinta do Lago sits on the same stretch. Free parking for guests."
      }
    },
    faq: [
      {
        question: {
          pt: "Há um restaurante perto de Vale do Lobo?",
          en: "Is there a restaurant near Vale do Lobo?"
        },
        answer: {
          pt: "Sim. O Figueiral fica em Almancil, próximo de Vale do Lobo. Muitos clientes vêm do resort ao jantar — casais, famílias e quem regressa todos os anos.",
          en: "Yes. Figueiral is in Almancil, close to Vale do Lobo. Many guests come from the resort for dinner — couples, families and those who return every year."
        }
      },
      {
        question: {
          pt: "É adequado para casais e para famílias?",
          en: "Is it suitable for couples and for families?"
        },
        answer: {
          pt: "Sim. A casa recebe os dois com a mesma atenção: uma mesa mais íntima a dois, ou uma mesa que se prolonga com crianças e amigos.",
          en: "Yes. The house welcomes both with the same care: a more intimate table for two, or a table that stretches with children and friends."
        }
      },
      {
        question: {
          pt: "Como se chega a partir do resort?",
          en: "How do I get there from the resort?"
        },
        answer: {
          pt: "De carro, a uma curta viagem até Almancil. Há estacionamento gratuito. No mapa abaixo encontra indicações.",
          en: "By car, a short journey to Almancil. There is free parking. Directions are on the map below."
        }
      },
      {
        question: {
          pt: "Qual é o ambiente?",
          en: "What is the atmosphere like?"
        },
        answer: {
          pt: "Requintado na mesa, familiar na receção. Sem o protocolo do resort — com o cuidado de uma casa que serve desde 1986.",
          en: "Refined at the table, familiar at the door. Without resort protocol — with the care of a house that has been serving since 1986."
        }
      },
      {
        question: {
          pt: "Convém reservar com antecedência?",
          en: "Should I book ahead?"
        },
        answer: {
          pt: "Sim. Ao jantar, sobretudo em época e ao fim de semana, a sala enche. Reserve online para garantir mesa.",
          en: "Yes. At dinner, especially in season and at the weekend, the room fills. Book online to secure a table."
        }
      },
      {
        question: {
          pt: "Servem picanha e grelhados?",
          en: "Do you serve picanha and grills?"
        },
        answer: {
          pt: "Sim. A picanha grelhada e fatiada à mesa é a assinatura da casa, acompanhada de outros grelhados, peixe e vinho português.",
          en: "Yes. Fire-grilled picanha sliced at the table is the house signature, alongside other grills, fish and Portuguese wine."
        }
      }
    ],
    finale: {
      eyebrow: { pt: "Reservas", en: "Reservations" },
      title: {
        pt: "Reserve mesa perto de Vale do Lobo.",
        en: "Book a table near Vale do Lobo."
      },
      body: {
        pt: "Para um jantar a dois, em família ou depois de um dia no resort. Reserve online — nós tratamos do resto.",
        en: "For dinner for two, with family or after a day at the resort. Book online — we take care of the rest."
      }
    }
  },

  "restaurant-near-vilamoura": {
    hero: {
      image: "/images/locations/Vilamoura_marina.webp",
      imageAlt: {
        pt: "Marina de Vilamoura ao entardecer, perto do Restaurante Figueiral em Almancil.",
        en: "Vilamoura marina at dusk, near Restaurante Figueiral in Almancil."
      },
      imageClassName: "object-cover object-[center_58%]",
      subtitle: {
        pt: "Depois da marina, do golfe ou de um passeio de barco — uma mesa em Almancil para fechar o dia com grelha, picanha e tempo.",
        en: "After the marina, golf or a boat trip — a table in Almancil to close the day with the grill, picanha and time."
      }
    },
    intro: {
      eyebrow: { pt: "Perto de Vilamoura", en: "Near Vilamoura" },
      title: {
        pt: "Sair do circuito da marina para uma mesa com outro ritmo.",
        en: "Leave the marina circuit for a table at a different pace."
      },
      body: {
        pt: "Vilamoura é marina, golfe, praia e movimento. Há noites em que isso basta; há outras em que se quer uma sala mais calma, com fogo à vista e uma receção que não apressa a conta. O Figueiral fica em Almancil, próximo de Vilamoura — uma curta viagem para terminar o dia à mesa.",
        en: "Vilamoura is marina, golf, beach and movement. Some evenings that is enough; others call for a quieter room, with fire in sight and a welcome that does not rush the bill. Figueiral is in Almancil, close to Vilamoura — a short journey to end the day at the table."
      }
    },
    contexts: [
      {
        label: { pt: "Golfe", en: "Golf" },
        title: {
          pt: "Depois do campo, a conversa.",
          en: "After the course, the conversation."
        },
        body: {
          pt: "Vilamoura vive também do golfe. Quando o round acaba, o Figueiral oferece o que o campo não dá: picanha na grelha, uma garrafa aberta e o tempo de quem já não está a jogar.",
          en: "Vilamoura lives on golf as well. When the round ends, Figueiral offers what the course cannot: picanha on the grill, a bottle open and the time of those who are no longer playing."
        }
      },
      {
        label: { pt: "Praia", en: "Beach" },
        title: {
          pt: "Da praia a uma mesa com fogo.",
          en: "From the beach to a table with fire."
        },
        body: {
          pt: "Vilamoura também é praia. Quando o dia na areia acaba, o Figueiral oferece o que a orla não dá à noite: grelha, picanha, uma sala com tempo — a uma curta viagem de Almancil.",
          en: "Vilamoura is the beach as well. When the day on the sand ends, Figueiral offers what the shore does not at night: the grill, picanha, a room with time — a short journey into Almancil."
        }
      },
      {
        label: { pt: "Marina", en: "Marina" },
        title: {
          pt: "Depois da marina ou do passeio, outra sala.",
          en: "After the marina or the boat trip, another room."
        },
        body: {
          pt: "A marina e os passeios de barco têm o seu próprio circuito. Nós estamos a uma curta viagem: uma casa em Almancil, com lounge, grelha e uma mesa que não compete com o cais — substitui-o, ao jantar.",
          en: "The marina and boat trips have their own circuit. We are a short journey away: a house in Almancil, with a lounge, a grill and a table that does not compete with the quay — it replaces it, at dinner."
        }
      },
      {
        label: { pt: "Jantar", en: "Dinner" },
        title: {
          pt: "Fechar o dia no Figueiral.",
          en: "Close the day at Figueiral."
        },
        body: {
          pt: "Mais cosmopolita no dia, mais casa à noite. Picanha fatiada à mesa, grelhados, uma sala que recebe quem vem de Vilamoura com apetite e sem pressa. Desde 1986.",
          en: "More cosmopolitan by day, more of a house by night. Picanha sliced at the table, grills, a room that welcomes those coming from Vilamoura with an appetite and without hurry. Since 1986."
        }
      }
    ],
    house: {
      eyebrow: { pt: "Figueiral", en: "Figueiral" },
      title: {
        pt: "Fogo na grelha, picanha à mesa, uma casa desde 1986.",
        en: "Fire on the grill, picanha at the table, a house since 1986."
      },
      body: {
        pt: "A grelha é o coração; a picanha brasileira, a assinatura. Em Almancil, a uma curta viagem de Vilamoura, servimos como sempre: produto visível, vinho português e uma equipa que conhece o ritmo de quem chega depois de um dia longo.",
        en: "The grill is the heart; Brazilian picanha, the signature. In Almancil, a short journey from Vilamoura, we serve as we always have: produce in sight, Portuguese wine and a team that knows the pace of those arriving after a long day."
      },
      note: {
        pt: "Uma alternativa à mesa da marina — com história e grelha.",
        en: "An alternative to the marina table — with history and a grill."
      },
      image: "/images/hero/Preparacao-picanha.webp",
      imageAlt: {
        pt: "Preparação da picanha na grelha do Restaurante Figueiral.",
        en: "Picanha being prepared on the grill at Restaurante Figueiral."
      },
      supportingImage: "/images/people/Proprietarios.webp",
      supportingImageAlt: {
        pt: "Ivan e Cláudia, proprietários do Restaurante Figueiral.",
        en: "Ivan and Cláudia, owners of Restaurante Figueiral."
      },
      composition: "intimate",
      imageClassName: "object-[center_40%]"
    },
    gallery: houseGallery,
    location: {
      eyebrow: { pt: "Como chegar", en: "How to find us" },
      title: {
        pt: "Em Almancil, próximo de Vilamoura.",
        en: "In Almancil, close to Vilamoura."
      },
      body: {
        pt: "O Figueiral fica em Almancil, a uma curta viagem de Vilamoura. Sai-se da marina ou do campo e chega-se a uma casa com estacionamento e mesa pronta.",
        en: "Figueiral is in Almancil, a short journey from Vilamoura. Leave the marina or the course and you arrive at a house with parking and a table ready."
      },
      proximity: {
        pt: "Estacionamento gratuito para clientes. Indicações no mapa.",
        en: "Free parking for guests. Directions on the map."
      }
    },
    faq: [
      {
        question: {
          pt: "O Figueiral fica perto de Vilamoura?",
          en: "Is Figueiral near Vilamoura?"
        },
        answer: {
          pt: "Sim. Estamos em Almancil, próximo de Vilamoura — a uma curta viagem da marina, dos campos de golfe e da praia.",
          en: "Yes. We are in Almancil, close to Vilamoura — a short journey from the marina, the golf courses and the beach."
        }
      },
      {
        question: {
          pt: "Vale a pena sair da marina para jantar?",
          en: "Is it worth leaving the marina for dinner?"
        },
        answer: {
          pt: "Se quiser uma mesa com outro ritmo — grelha, picanha, menos circuito — sim. Muitos dos nossos clientes vêm precisamente por isso.",
          en: "If you want a table at a different pace — grill, picanha, less of the circuit — yes. Many of our guests come for exactly that."
        }
      },
      {
        question: {
          pt: "Aceitam grupos e famílias?",
          en: "Do you take groups and families?"
        },
        answer: {
          pt: "Sim. Recebemos mesas a dois, famílias e grupos. Para grupos maiores, convém reservar com antecedência.",
          en: "Yes. We welcome tables for two, families and groups. For larger groups, it is best to book ahead."
        }
      },
      {
        question: {
          pt: "Posso ir depois de um passeio de barco ou de um round de golfe?",
          en: "Can I come after a boat trip or a round of golf?"
        },
        answer: {
          pt: "Sim. É uma das razões mais frequentes da visita: fechar o dia da marina, do barco ou do campo à mesa, com grelha e tempo.",
          en: "Yes. It is one of the most frequent reasons to visit: closing a day at the marina, on the boat or on the course at the table, with the grill and time."
        }
      },
      {
        question: {
          pt: "Qual é o horário?",
          en: "What are the opening hours?"
        },
        answer: {
          pt: "Segunda a sábado, das 19:00 às 22:00. Domingo encerrado. Reserve para garantir mesa.",
          en: "Monday to Saturday, from 19:00 to 22:00. Closed on Sunday. Book to secure a table."
        }
      },
      {
        question: {
          pt: "Como se chega e onde se estaciona?",
          en: "How do I get there and where do I park?"
        },
        answer: {
          pt: "De carro até Almancil. Há estacionamento gratuito para clientes. O mapa nesta página indica o caminho.",
          en: "By car to Almancil. There is free parking for guests. The map on this page shows the way."
        }
      }
    ],
    finale: {
      eyebrow: { pt: "Reservas", en: "Reservations" },
      title: {
        pt: "Reserve mesa perto de Vilamoura.",
        en: "Book a table near Vilamoura."
      },
      body: {
        pt: "Depois da marina, do golfe ou da praia. Reserve online — nós tratamos da mesa.",
        en: "After the marina, golf or the beach. Book online — we take care of the table."
      }
    }
  }
};
