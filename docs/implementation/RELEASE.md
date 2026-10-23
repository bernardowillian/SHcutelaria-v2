# Publicação controlada e rollback

1. **Pré-requisitos:** validar G0-01..G0-09; registrar autorizador, fonte de cada texto e foto, WhatsApp oficial, hospedagem e domínio; obter revisão jurídica de privacidade e dos materiais anunciados. Não configurar analytics sem base adequada.
2. **Homologação:** instalar dependências pelo lockfile e executar `npm run verify`, `npm run test:e2e`, inspeção manual teclado/zoom/leitor e axe quando disponível. Usar `PUBLIC_SITE_APPROVED=false`, endereço temporário e acesso restrito quando possível. Inspecionar HTML de canonical, noindex, robots e sitemap.
3. **Regras do host:** Netlify reconhece `_redirects` e `_headers` de `public/` (copiados para dist). Em outros hosts mapear 301 equivalentes; não presumir suporte; checar com `curl -I` no preview. `seguranca.html` fica bloqueado até confirmar equivalência com /privacidade.
4. **Antes do corte:** registrar SHA do commit aprovado, endereço e backup da versão vigente, exportar configuração DNS atual, coletar baseline de URLs e registros de Search Console quando houver autorização. Guardar artefato anterior para rollback.
5. **Aprovação:** somente após proprietário confirmar material e jurídicos, definir `SITE_URL` correto, `PUBLIC_SITE_APPROVED=true`, `PUBLIC_WHATSAPP_NUMBER` verificado; executar build de produção, revisar novamente.
6. **Smoke após deploy:** rotas 200, redirects 301 de `/formulario.html`, `/blocos.html`, `/comprar.html`, links internos, teclado de modal, escolha de ferramenta, cópia e clique WhatsApp (não envio), canonical, robots e mobile. Sem smoke = não considerar concluído.
7. **Rollback:** restaurar release anterior pelo painel/artefato SHA; reverter DNS apenas mediante aprovação, respeitar TTL; testar novamente home, URLs antigas e contato. Registrar incidente e decisão.

Não há deploy nem DNS alterado por esta implementação.
