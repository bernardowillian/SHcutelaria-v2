# QA — Execução automatizada observada (23/10/2026)

## Evidência verificável

- **GitHub Actions:** https://github.com/bernardowillian/SHcutelaria-v2/actions/runs/40039771076
- **Commit validado:** `785d1e6f87647aaed1ca25eae5b806f80d18f935`
- **Ambiente:** GitHub-hosted Ubuntu runner, Node.js 22; Chromium Playwright em perfis desktop e Pixel 5 emulado.
- `npm ci --no-audit --no-fund` — **PASSOU**
- `npm run lint` (guard de conteúdo) — **PASSOU**
- `npm run typecheck` (`astro check`) — **PASSOU**
- `npm run test` (Vitest) — **11/11 PASSOU**
- `npm run build` (`astro check && astro build`) — **PASSOU**
- `npm run test:e2e` (Playwright) — **15 PASSOU, 1 SKIP (menu móvel não se aplica ao desktop), 0 falhas**.

Cobertura E2E implementada: rotas, h1 e metadados em preview, configurações completas e erros, transições Faca→Machado e Couro→Madeira, resumo, diálogo modal (Escape/foco), menu móvel, ausência de analytics externos, noindex/robots/sitemap e overflow em 320, 375, 390, 768, 1024 e 1440 px nas páginas principais.

## Defeitos corrigidos durante a execução
1. TypeScript strict apontou falta de `@types/node` e variáveis opcionais incorretas nos testes: corrigido.
2. Playwright encontrou input radio coberto por cartão e Astro dev toolbar afetando h1/menu: corrigido o alvo de clique e desativada toolbar.
3. Teste de viewport encontrou 9px de overflow na Home a 320px: reduzido trecho de microcópia/pseudoelemento e espaçamento mobile, e reflow passou na repetição.

## Limitações e gates não concluídos
- **Não executado** teste manual com NVDA/VoiceOver, zoom de navegador 200%/400%, iOS Safari, Android físico ou avaliação moderada com pessoas reais.
- **Não executado** axe-core ou Lighthouse; sem resultados de WCAG 2.2 AA completos e sem medições CWV LCP/INP/CLS ou RUM.
- Não existe deploy/preview externo verificado, teste de redirecionamento HTTP 301 do host, contato WhatsApp oficial, conteúdo comercial aprovado ou parecer jurídico.
- Os testes de URL WhatsApp validam a criação, **não** o envio de mensagem no serviço externo.
- Devem ser revisadas imagens licenciadas, conteúdo institucional, materiais sensíveis e política de privacidade antes de qualquer publicação.

As regras unitárias representam o **modelo provisório de preferências**, ainda não uma matriz comercial aprovada. As issues #1–#4 acompanham bloqueios.
