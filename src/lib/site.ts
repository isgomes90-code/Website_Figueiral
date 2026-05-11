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
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/wine-experience", label: "Wine" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" }
];

export const images = {
  hero: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2400&q=85",
  picanha: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1800&q=85",
  wine: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1800&q=85",
  terrace: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85",
  family: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=85",
  dining: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1800&q=85"
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
  images.hero,
  images.picanha,
  images.wine,
  images.terrace,
  images.family,
  images.dining,
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=85",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1600&q=85"
];
