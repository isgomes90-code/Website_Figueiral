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
  },
  openingHours: [
    "Monday to Sunday: 12:00 - 15:00",
    "Monday to Sunday: 18:30 - 23:00"
  ]
};

export const navItems = [
  { href: "/", labelKey: "home" },
  { href: "/menu", labelKey: "menu" },
  { href: "/wine-experience", labelKey: "wine" },
  { href: "/about", labelKey: "about" },
  { href: "/gallery", labelKey: "gallery" },
  { href: "/press", labelKey: "press" },
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
  dessert: "/images/food/Profiteroles-chocolate.webp"
};

export const menuCategories = [
  {
    title: "Signature Meat Experience",
    description: "Premium cuts prepared with patience, precision and the warmth of long-standing hospitality.",
    items: [
      {
        name: "Brazilian-Style Picanha",
        description: "The house signature, grilled over fire and served with classic accompaniments.",
        highlight: true
      },
      {
        name: "Matured Ribeye",
        description: "A deeply flavoured cut with elegant marbling and a charred Mediterranean finish."
      },
      {
        name: "Fillet Mignon",
        description: "Tender, refined and served with seasonal vegetables and house sauce."
      }
    ]
  },
  {
    title: "From the Algarve",
    description: "Fresh coastal flavours with a relaxed Mediterranean rhythm.",
    items: [
      {
        name: "Grilled Sea Bass",
        description: "Simply prepared with olive oil, herbs and citrus."
      },
      {
        name: "Garlic Prawns",
        description: "A warm table classic with coastal character."
      },
      {
        name: "Seasonal Market Fish",
        description: "Selected according to the best catch available."
      }
    ]
  },
  {
    title: "To Begin",
    description: "Elegant starters designed for sharing and conversation.",
    items: [
      {
        name: "Cured Meats & Warm Bread",
        description: "Portuguese flavours, olive oil and house preserves."
      },
      {
        name: "Burrata with Roasted Tomatoes",
        description: "Creamy burrata, basil oil and walnut textures."
      },
      {
        name: "Fire-Roasted Vegetables",
        description: "Seasonal vegetables, smoked yoghurt and herbs."
      }
    ]
  },
  {
    title: "Desserts",
    description: "Comforting classics with a polished restaurant finish.",
    items: [
      {
        name: "Caramelised Creme Brulee",
        description: "Silky custard, crisp sugar and citrus notes."
      },
      {
        name: "Chocolate & Port Wine",
        description: "Dark chocolate textures with a Portuguese wine accent."
      },
      {
        name: "Algarve Almond Tart",
        description: "Warm almond pastry with vanilla cream."
      }
    ]
  }
];

export const reviews = [
  {
    source: "Google Reviews",
    quote: "A timeless Algarve restaurant with exceptional picanha, warm service and a beautiful atmosphere.",
    author: "Recent guest",
    rating: "4.8"
  },
  {
    source: "Tripadvisor",
    quote: "Elegant, relaxed and consistently excellent. A must when staying near Quinta do Lago or Vale do Lobo.",
    author: "International traveller",
    rating: "Excellent"
  },
  {
    source: "Press Mention",
    quote: "A family dining institution in Almancil where hospitality is treated as seriously as the food.",
    author: "Algarve dining guide",
    rating: "Featured"
  }
];

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
