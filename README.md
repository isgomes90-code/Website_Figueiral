# Restaurante Figueiral

Premium restaurant website for Restaurante Figueiral in Almancil, Algarve.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- SEO metadata, sitemap, robots and Restaurant schema
- CMS-ready data structure in `src/lib/site.ts`

## Getting Started

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Site URL (teste vs produção)

Por defeito, o site usa **`http://localhost:3000`** para metadados (canonical, Open Graph, sitemap) e **não** está ligado a `www.figueiral.pt` até existir alojamento.

- Em desenvolvimento: `npm run dev` → [http://localhost:3000](http://localhost:3000)
- Em teste local, `robots.txt` bloqueia indexação e as páginas têm `noindex`
- Para produção futura: definir `NEXT_PUBLIC_SITE_URL=https://www.figueiral.pt` (ver `.env.example`)

Contactos, redes sociais, mapa e ResDiary estão em `src/lib/site.ts`.
