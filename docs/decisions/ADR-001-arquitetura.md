# ADR-001 — Astro estático sem banco (2026-10-23)

**Status:** adotada para a implementação técnica do protótipo; publicação sujeita a aprovação.

## Contexto
A auditoria não demonstra persistência de pedidos ou necessidade de autenticação no site legado. O atendimento proposto é por orçamento em aplicativo externo.

## Decisão
Astro com saída estática, TypeScript strict, dados tipados, CSS global e JavaScript mínimo somente para menu, diálogos e wizard. Vitest para domínio e Playwright para jornadas. Sem React, backend, banco, pagamentos, tracking ou contas.

## Consequências
Site informativo funciona sem JavaScript. Configurador exige JS e oferece explicação/fallback de contato por cópia. Sem contato validado, link wa.me fica indisponível e resumo permanece copiável. _redirects e _headers atendem hosts compatíveis (ex. Netlify); devem ser adaptados/testados para o host eleito. Domínio inferido do legado não confirma autoridade sobre DNS.
