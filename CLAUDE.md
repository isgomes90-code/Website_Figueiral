# FIGUEIRAL — CLAUDE.md
> Ficheiro de memória de trabalho. Actualizar sempre que houver mudanças relevantes.
> Última actualização: Junho 2026

---

## 👥 PESSOAS-CHAVE

| Nome | Role | Contacto | Notas |
|------|------|----------|-------|
| **Ivan** | Proprietário | +351 925 020 088 | Decisões finais; prefere batch work, validação semanal/mensal |
| **Cláudia Sousa** | Co-manager / Família | — | Frequentemente mencionada positivamente em reviews |
| **Olívia** | Sala Manager | — | Excelente reputação em comentários; gestão clientes premium |
| **Ivonaldo** | Chef | — | Rosto do "Behind the Plate"; aparece em fotos Staff & Equipa |

---

## 🏢 OPERAÇÃO

**Localização:** Almancil, Algarve, Portugal  
**Fundação:** 1986  
**Especialização:** Picanha Brasileira + Grelhados  
**Horário:** Terça a Sábado, apenas jantares (encerra domingo e segunda)  
**Email empresa:** info@figueiral.pt  
**WhatsApp Business:** +351 925 020 088  
**Gmail:** restaurantefigueiral@gmail.com  

**Capacidade:**
- Interior Sala 1: ~60 covers
- Interior Sala 2: ~60 covers
- Esplanada: ~80 covers
- **Total: ~200 covers**

**Sazonalidade:**
- Peak: Julho-Agosto (35-38% revenue anual)
- Low: Q1 (cash flow frágil; Janeiro 2026 encerrado — decisão correcta)
- Target 2026: 180 covers/noite em pico (nunca alcançado; máximo 2025: 158)
- Esplanada: aberta Maio-Outubro (condicionada ao tempo)

**Objectivo financeiro:** €1.000.000 revenue/ano → independência financeira familiar

---

## 🌐 WEBSITE & STACK TÉCNICA

**URL:** https://www.figueiral.pt  
**Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS  
**Repositório:** GitHub — isgomes90-code/Website_Figueiral, branch main  
**Deploy:** Vercel (automático ao push para main)  
**Domínio:** Domínios.pt  
**Email:** info@figueiral.pt alojado em cPanel  
**Nameservers:** ns1/ns2/ns3.dnscpanel.com  
**i18n:** PT/EN com dicionários em src/i18n/dictionaries/  

**Regra obrigatória:** Todo o conteúdo do site é sempre produzido em PT e EN (bilingue).

**Para alterações ao site:** criar prompt para o Cursor, não editar directamente.  
O Cursor faz commit e push para main → Vercel faz deploy automaticamente.

**Métricas actuais (Jun 2026):**
- PageSpeed: 96 mobile / 99 desktop
- Rich Results: 3 itens válidos (estrelas)
- Páginas indexadas: 25 de 66
- Sitemap: 66 URLs (33 rotas × PT/EN)

---

## 📄 LANDINGS SEO ACTIVAS

Todas com versão EN equivalente:

| PT | EN |
|----|----|
| /pt/restaurant-almancil | /en/restaurant-almancil |
| /pt/best-picanha-algarve | /en/best-picanha-algarve |
| /pt/restaurant-quinta-do-lago | /en/restaurant-quinta-do-lago |
| /pt/wine-experience-algarve | /en/wine-experience-algarve |
| /pt/restaurant-near-vilamoura | /en/restaurant-near-vilamoura |
| /pt/restaurant-near-quarteira | /en/restaurant-near-quarteira |
| /pt/restaurant-loule | /en/restaurant-loule |
| /pt/restaurant-faro | /en/restaurant-faro |
| /pt/restaurant-albufeira | /en/restaurant-albufeira |
| /pt/restaurant-near-portimao | /en/restaurant-near-portimao |
| /pt/restaurant-near-lagos | /en/restaurant-near-lagos |
| /pt/restaurant-near-tavira | /en/restaurant-near-tavira |

**Prioridades sitemap:**
- Homepage: 1.0
- Landings SEO: 0.9
- Core (menu, galeria, contacto, reservas): 0.8
- Secundárias (vinho, sobre, imprensa índice): 0.7
- Artigos de imprensa: 0.6

---

## 📊 RESERVAS — CANAIS E INSIGHTS

**Sistema:** ResDiary  
**Widget IDs:**
- Website (canal Online): **13421** ← correcto
- Instagram Stories: 33271
- ⚠️ Bug corrigido em 4 Jun 2026 — antes desta data, todas as reservas do website eram contabilizadas como Instagram Stories (dados contaminados Dez 2025 – Jun 2026)
- Canal Online fiável **apenas a partir de 4 Jun 2026**

**Volume 2025 por canal:**

| Canal | Pessoas 2025 | % |
|-------|-------------|---|
| Google Reserve | 2.026 | 71,9% |
| Online (website) | 432 | 15,3% |
| GoogleMB | 275 | 9,8% |
| Instagram Stories | 179 | 6,4% |
| Dish Cult | 21 | 0,7% |

**Insights críticos:**
- 72% dos covers reservam same-day ou dentro do mês → conteúdo deve priorizar imediaticidade
- Google domina 72% do volume — qualquer problema no GBP impacta directamente as reservas
- Instagram cresceu de 3 pessoas Jan-Abr 2025 para 111 Jan-Abr 2026 (+3600%)
- Canal Online colapsou em Set 2025 (ataque ao site antigo) — recuperação em curso
- Dish Cult marginal (0,7%) — não justifica esforço de gestão

---

## 💸 CUSTOS DE CANAIS

**ResDiary:** 947€/ano (~79€/mês) — sem custo por reserva, cobre todos os canais

**TheFork/TripAdvisor:**
- Visibilidade fixa: 100€ + IVA = 123€/mês
- Comissões: 2,12€ + IVA = 2,61€/cabeça
- Custo médio mensal total: ~590€
- Custo total Mar 2025 – Mai 2026 (15 meses): 8.852€
- **Decisão Jun 2026:** suspender comissões de reservas em época alta; manter perfil para visibilidade
- Avaliar impacto comparando volume Set-Out 2026 vs anos anteriores

---

## 🔧 SISTEMAS DIGITAIS

### Google Business Profile
- Conta: restaurantefigueiral@gmail.com
- 4.6★ com 375+ reviews Google / 601 TripAdvisor
- API formal submetida em Jun 2026 (projecto: figueiral-reviews, número: 781715319247)
- Aguardar aprovação (até 14 dias)

### Google Search Console
- Verificado via registo TXT no cPanel
- Sitemap submetido: https://www.figueiral.pt/sitemap.xml
- Status Jun 2026: 25 indexadas, 45 pendentes (normal para site recente)
- Validações iniciadas em 29 Mai 2026: 404 (/lp/figueiral-lda/reservas-pt) e redirect (/en/)

### WhatsApp Review Bot
- Meta App: "Figueiral Reviews" (ID: 1825830558822025)
- WHATSAPP_PHONE_ID: 2156423441809129
- Servidor: Railway → figueiral-reviews-bot-production.up.railway.app
- Webhook: /webhook, verify token: figueiral2025
- Repositório: isgomes90-code/figueiral-reviews-bot
- App publicada em modo live: 27 Mai 2026
- ⚠️ Token actual: User Token — **expira ~60 dias a partir de 27 Mai 2026**
- **Acção urgente antes de Julho 2026:** gerar System User token permanente

### PDF Renaming Automation
- Script: renomear_faturas.py
- Stack: Python + pdfplumber, anthropic, pandas, openpyxl, pytesseract, pdf2image, pillow
- Tesseract: C:\Program Files\Tesseract-OCR\tesseract.exe
- Poppler: C:\Program Files\poppler-26.02.0\Library\bin
- Modelo: claude-haiku-4-5
- Referência fornecedores: Lista de Fornecedores.xlsx

---

## 📱 SISTEMA DE CONTEÚDO

### Stack de Ferramentas
- **Meta Business Suite** — publicação e agendamento de todos os posts, reels e stories (ferramenta oficial e única)
- **Manus** — análise de métricas apenas, sem publicação
- **Claude** — estratégia, copy, planeamento mensal
- **Canva** — formatação de imagens para publicação
- **Inssist** — DESINSTALADO E REMOVIDO (Jun 2026)

### Formatos Obrigatórios
- Feed (Posts/Carrosséis): 1080×1080px
- Stories/Reels: 1080×1920px
- Sempre bilingue PT/EN + CTA (figueiral.pt)
- Publicar: 18h30–19h30
- Nunca ao domingo (restaurante encerrado)

### Tom e Estilo
- Sofisticado, elegante, emocional
- Sem emojis excessivos
- Sem copy longa (máximo 3 linhas visíveis)
- Não imitar fine dining com estética fria — o Figueiral é quente, familiar, com história

### Mix Mensal de Conteúdo
| Categoria | % |
|-----------|---|
| Carne & Picanha | 30% |
| Peixe | 12% |
| Esplanada & Exterior | 12% |
| Bar & Cocktails | 10% |
| Sala & Ambiente Interior / Clientes | 10% |
| Staff & Equipa | 8% |
| Detalhes & Mise en Place | 8% |
| Conteúdo Sazonal | 6% |
| Institucional / CTA | 4% |

### Frequência de Publicação
| Período | Posts/semana | Stories/semana |
|---------|-------------|----------------|
| Pico (Jul-Ago) | 5 | 7 |
| Verão (Jun-Set) | 4 | 5–7 |
| Baixa (Out-Dez) | 3–4 | 3–5 |

### Regras de Publicação Aprendidas
- Fotos horizontais ficam com barras pretas — sempre formatar no Canva antes de publicar
- Reels editados no Meta não permitem agendamento — passar pela edição sem tocar em nada
- Nunca usar imagens geradas por AI — apenas ficheiros reais da biblioteca
- Promover posts individualmente por €2 não tem impacto real — usar Gestor de Anúncios
- Para criar Reel: usar "Criar reel", não "Criar publicação"
- ⚠️ Penalização Meta activa desde 8 Jun 2026 — revisão pedida, aguardar 3–14 dias

---

## 📁 BIBLIOTECA DE MEDIA

**Localização:** `J:\O meu disco\PROJETOS\Fotos - Figueiral\MULTIMÉDIA - CLAUDE\Fotos`

⚠️ **NUNCA aceder a "Arquivo (originais)"**

| Pasta | Quantidade | Notas |
|-------|-----------|-------|
| Carne & Picanha | ~32 fotos | Principal categoria |
| Peixe | ~5 fotos | ⚠️ Escasso |
| Entradas & Marisco | ~20 fotos | |
| Bar & Cocktails | ~22 fotos | |
| Esplanada & Exterior | ~6 fotos | ⚠️ Muito escasso |
| Sala & Ambiente Interior | ~22 fotos | |
| Staff & Equipa | ~7 fotos | Inclui Ivonaldo, Olívia, Proprietários |
| Detalhes & Mise en Place | ~22 fotos | |
| Temáticas | ~3 fotos | Dia do Pai, Halloween, mesa |

**Formato:** .webp, 1080×1080px, prontas a publicar

**Vídeos prontos:**
- Figueiral_Explanada_9x16_1.mp4 — 48MB, 16 seg ✅ testado
- Figueiral_Reels_1_-_Mobile.mp4 — disponível
- Figueiral_Explanada_16x9_1.mp4 — versão landscape
- Figueiral_Reels_1_-_Web.mp4 — versão landscape

**Limite vídeo Manus:** 300MB máximo

---

## 💰 PLANO DE INVESTIMENTO PAGO (Jun–Dez 2026)

**Total:** €4.000 para 7 meses

| Mês | Meta Ads | Google Ads | Total |
|-----|----------|------------|-------|
| Jun | 300€ | 250€ | 550€ |
| Jul | 500€ | 400€ | 900€ |
| Ago | 500€ | 400€ | 900€ |
| Set | 250€ | 200€ | 450€ |
| Out | 300€ | 150€ | 450€ |
| Nov | 150€ | — | 150€ |
| Dez | 400€ | 200€ | 600€ |

**Audiências Meta:** turistas UK/DE/FR/ES no Algarve, residentes estrangeiros Almancil/QdL/VdL, retargeting visitantes website  
**Keywords Google:** restaurante Almancil, restaurante Quinta do Lago, restaurante Vale do Lobo, picanha Algarve, fine dining Algarve

---

## 📋 PLANO ESTRATÉGICO 2026 — ESTADO

### Fase 1 — Fundação
| Ponto | Descrição | Estado |
|-------|-----------|--------|
| 1.1 | Auditoria canais de reserva | ✅ Dashboard construído |
| 1.2 | Protocolo de serviço — pontos de fricção | ❌ Por fazer |
| 1.3 | Posicionamento da picanha — narrativa e menu | ❌ Por fazer |

### Fase 2 — Reputação
| Ponto | Descrição | Estado |
|-------|-----------|--------|
| 2.1 | Captação de reviews — abordagem humana | ⏳ Bot pronto, abordagem humana pendente |
| 2.2 | Resposta sistemática a reviews | ⏳ Bot live, Google API em aprovação |

### Fase 3 — Digital e Comunicação
| Ponto | Descrição | Estado |
|-------|-----------|--------|
| 3.1 | Estratégia Instagram | ⏳ Em curso |
| 3.2 | Newsletter — evolução de 180° | ❌ Por fazer |

### Fase 4 — Crescimento Q1
| Ponto | Descrição | Estado |
|-------|-----------|--------|
| 4.1 | Eventos sazonais Q1 | ✅ Jan 2026 fechado (correcto) |
| 4.2 | Parcerias golfe/residentes | ❌ Por iniciar |

### Fase 5 — Consolidação
| Ponto | Descrição | Estado |
|-------|-----------|--------|
| 5.1 | Dashboard mensal consolidado | ❌ Por construir |
| 5.2 | Calendário anual de comunicação | ❌ Por construir |

---

## ⚡ PENDENTES URGENTES (Jun 2026)

| Prioridade | Acção | Prazo |
|-----------|-------|-------|
| 🔴 CRÍTICO | Gerar System User token permanente WhatsApp | Antes de 27 Jul 2026 |
| 🟡 IMPORTANTE | Resolver penalização Meta | Aguardar 3–14 dias |
| 🟡 IMPORTANTE | Contactar TheFork para suspender comissões | Esta semana |
| 🟡 IMPORTANTE | Arrancar Meta Ads e Google Ads | Junho 2026 |
| 🟡 IMPORTANTE | Newsletter Junho — envio semana de 17 Jun | 17 Jun 2026 |
| 🟢 NORMAL | Aguardar aprovação Google Business API | Até 14 dias |
| 🟢 NORMAL | Plano conteúdo 11–30 Jun | Esta semana |
| 🟢 NORMAL | Sistema Stories — integrar no plano | Esta semana |

---

## 🔑 ACESSOS E CONTAS

| Serviço | Conta/Acesso | Notas |
|---------|-------------|-------|
| GitHub | isgomes90-code | Website_Figueiral + figueiral-reviews-bot |
| Vercel | isgomes90-code | Deploy automático do site |
| Domínios.pt | — | Domínio figueiral.pt |
| cPanel | Domínios.pt | Email info@figueiral.pt |
| Google Cloud | restaurantefigueiral@gmail.com | Projecto figueiral-reviews (781715319247) |
| Google Search Console | restaurantefigueiral@gmail.com | https://www.figueiral.pt verificado |
| Google Business | restaurantefigueiral@gmail.com | 4.6★ |
| Meta Business Suite | Conta pessoal Ivan | Página Restaurante Figueiral |
| Railway | — | figueiral-reviews-bot-production.up.railway.app |
| Anthropic Console | restaurantefigueiral@gmail.com | API Key activa |
| ResDiary | — | Widget Online ID: 13421 |

---

## 📐 CONVENÇÕES

**Abreviações:**
- PT = Português | EN = English
- Q1 = Jan-Mar | Peak = Jul-Ago | Low = Jan-Mar
- QdL = Quinta do Lago | VdL = Vale do Lobo

**Padrões de escrita:**
- Reviews negativas: profissional, medido, não confrontacional, dignidade do staff, deixar porta aberta para regresso
- Copy posts: sempre PT/EN, máximo 3 linhas visíveis
- Timing: batch semanal/mensal, nunca daily

**Princípios de trabalho:**
- Sempre avisar antes de acções que possam afectar outros serviços (email, DNS, etc.)
- Para alterações ao site: criar prompt para Cursor, não editar directamente
- Nunca apagar ficheiros — usar mv para mover
- Batch production sobre envolvimento diário
- Sucesso em escala = melhor equipa possível (humana + AI) — nunca dependência de uma única ferramenta
