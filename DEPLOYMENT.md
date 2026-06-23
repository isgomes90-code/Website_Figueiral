# Deploy — Restaurante Figueiral

## Variáveis de ambiente obrigatórias (Vercel / Netlify)

| Variável | Valor |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.figueiral.pt` |

⚠️ Sem esta variável, todos os canonical URLs e Open Graph ficam incorretos em produção.

O ficheiro `.env.production` na raiz do repositório já contém este valor para builds locais de produção (`npm run build`). **No painel Vercel ou Netlify, a variável tem de ser definida manualmente** — não é lida automaticamente do repositório em runtime serverless.

## Fallback em desenvolvimento

Se `NEXT_PUBLIC_SITE_URL` não estiver definida, o código em `src/lib/site.ts` usa `http://localhost:3000` e activa `noindex` via `isLocalTestSite`.

## ⚠️ DNS / Email — não tocar durante deploys

O deploy do site é independente do DNS. Email (info@figueiral.pt) e registos de autenticação vivem no cPanel (Domínios.pt).

- **NUNCA mudar nameservers** (ns1/ns2/ns3.dnscpanel.com) — parte o email.
- Alterações a DNS fazem-se **registo a registo no cPanel Zone Editor**, nunca por troca de nameservers.
- Não tocar em registos MX.
- O domínio é gerido em Domínios.pt; o site em Vercel. Apontamentos do domínio para a Vercel fazem-se por registos individuais (A/CNAME), confirmando sempre que não se afecta MX/SPF/DKIM do email.

## Checklist pós-deploy

- [ ] `NEXT_PUBLIC_SITE_URL=https://www.figueiral.pt` no painel Vercel/Netlify
- [ ] `reviewCount` em `src/data/restaurant.ts` actualizado com número real do Google Business
- [ ] URLs das reviews em `pt.json` / `en.json` — substituir placeholder `GOOGLE_MAPS_PLACE_URL` por links directos (ver comentário em `src/data/restaurant.ts`)
- [ ] Validar [PageSpeed Insights](https://pagespeed.web.dev/) em `https://www.figueiral.pt/pt`
- [ ] Validar [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Confirmar sitemap: `https://www.figueiral.pt/sitemap.xml`
- [ ] Confirmar `/pt/press` e favicon no browser
- [ ] Confirmar que o deploy não alterou registos DNS de email (MX/SPF/DKIM intactos)
