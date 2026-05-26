/**
 * Dados públicos do restaurante — actualizar manualmente após verificar o Google Business Profile.
 * URL: https://business.google.com/
 */
export const GOOGLE_REVIEW_DATA = {
  ratingValue: "4.6",
  /** ← ATUALIZAR com número real de reviews no Google Business */
  reviewCount: "375",
  bestRating: "5",
  worstRating: "1",
  lastUpdated: "2025-05"
} as const;

/**
 * Placeholder para links de reviews em pt.json / en.json.
 * Para obter link directo: Google Maps → Restaurante Figueiral → Reviews → copiar URL do review.
 */
export const GOOGLE_MAPS_PLACE_URL = "https://www.google.com/maps/place/Restaurante+Figueiral";
