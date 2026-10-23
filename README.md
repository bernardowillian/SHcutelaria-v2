# SH Cutelaria V2

Reconstrução independente do site institucional e do personalizador de orçamentos da SH Cutelaria. **Protótipo técnico não autorizado para publicação comercial** até resolver Gate 0. O repositório [V1](https://github.com/Bits-Bytes-Grupo-de-P-I/SHcutelaria) não foi modificado.

## Rodar localmente

Requer Node.js 22 e npm. Após gerar/commitar o lockfile: `npm ci`, `npm run dev`, abrir `http://localhost:4321`. Para validar: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`. Para E2E: `npx playwright install chromium` e `npm run test:e2e`.

## Configuração

Copie `.env.example` para `.env` somente em ambiente local. `PUBLIC_WHATSAPP_NUMBER` deve conter número oficial validado em dígitos E.164 (55 + DDD + telefone) e **não** deve ser preenchido com exemplo inventado. Sem ele, o resumo pode ser copiado; o link externo não aparece. `PUBLIC_SITE_APPROVED` é `false` até autorização explícita de publicação: preview recebe noindex + robots de bloqueio. `SITE_URL` só pode usar o domínio após confirmação de controle.

## Arquitetura

- Astro estático + TypeScript strict; CSS artesanal editorial sem dependências de UI.
- `src/domain/configurator.ts`: regras puras, validação, normalização e WhatsApp.
- `src/components/Configurator.astro`: interface progressiva nativa e resumo editável.
- `src/data/`: navegação e referências ilustrativas (não estoque).
- `src/pages/`: 7 rotas e 404, sitemap e robots.
- `tests/unit/` e `tests/e2e/`: regressões das condições e navegação.
- `docs/decisions/` e `docs/implementation/`: bloqueios e rastreabilidade.

## Segurança editorial

Sem login, estoque, pagamentos, sorteio, rastreamento, backend ou banco. Não contém fotos da V1 porque as permissões não foram fornecidas. Imagem SVG é ilustração autoral, não peça à venda. Informações comerciais, canais oficiais e texto legal ainda necessitam aprovação.

## Hospedagem e rollback

`public/_redirects` e `public/_headers` destinam-se a hospedagens compatíveis. Validar redirects 301 no provedor escolhido; `seguranca.html` aguarda equivalência jurídica. Não alterar DNS. Estratégia: publicar primeiro preview privado/noindex, registrar SHA do build, testar navegação e redirecionamentos, obter aprovação de negócio/jurídico, então liberar indexação; rollback reutiliza o artefato/SHA anterior e restaura as configurações do host. Documentação em `docs/implementation/RELEASE.md`.

## Evidências

Comandos, execuções e limitações devem constar do PR e do arquivo `docs/implementation/AUDIT-TRACEABILITY.md`. Nenhuma aprovação de WCAG 2.2 AA, pesquisa com usuários ou Core Web Vitals reais é presumida.
