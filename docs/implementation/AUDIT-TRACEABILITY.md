# Matriz de rastreabilidade — SH Cutelaria V2

Base: auditoria 00–13 e roadmap de 23/10/2026. Situação: implementação técnica em branch; verificações de CI devem ser ligadas ao PR. **Status parcial não é aceitação comercial.**

| ID | Trabalho implementado / evidência em código | Estado | Pendência de aceite |
|---|---|---|---|
| AUD-01 | `src/domain/configurator.ts` enum `faca` e regras por etapa; `tests/unit/configurator.test.ts` | Implementado | Opções comerciais a validar |
| AUD-02 | `normalizeDraft` limpa couro incompatível; unit testes | Implementado | Bainha aprovada pelo artesão |
| AUD-03 | Removido link `http://`, contato tipado por env | Parcial | Número oficial pendente |
| AUD-04 | Sem sorteios ou links vazios, guard de conteúdo | Implementado no MVP | Avaliação jurídica para qualquer retorno |
| AUD-05 | `Header.astro` menu button, aria-expanded, Escape | Implementado | QA manual leitor de tela |
| AUD-06 | `blocos.astro` dialog, Escape nativo, retorno de foco | Implementado | Fotos reais licenciadas |
| AUD-07 | FAQ `details/summary` nas páginas | Implementado | Revisão manual |
| AUD-08 | Sem foto de produto não autorizada; ilustrações rotuladas | Parcial | Adicionar imagens reais com alt revisados |
| AUD-09 | Hierarquia de cabeçalhos e links sem nesting inválido | Implementado | Inspeção manual |
| AUD-10 | `sitemap.xml.ts`, meta description, canonical, robots | Implementado | Domínio e SEO de produção |
| AUD-11 | `src/styles/global.css` tokens globais | Implementado | Verificação visual |
| AUD-12 | `Configurator.astro` form único, fieldsets e estado | Implementado | E2E, aprovação de matrizes |
| F-01 | Modelo + fluxo com validação | Parcial | Gate comercial |
| F-02 | Revisão editável e cópia | Implementado | Testar clipboard nos dispositivos |
| F-03 | Número validado, botão oculto sem contato | Parcial | Canal oficial |
| F-04 | Menu, dialog, FAQ nativos | Implementado | QA manual |
| F-05 | Home com três caminhos concretos | Parcial | Foto real e texto oficial |
| F-06 | Referências tipadas + aviso não estoque | Parcial | Catálogo e fotos reais |
| F-07 | Guia de condições sem invenções | Parcial | Aprovação de negócio/jurídica |
| F-08 | Sorteios fora do MVP | Implementado | Não relançar sem análise |
| F-09 | `public/_redirects` + testes de rotas | Parcial | Provedor e testes 301 |
| F-10 | Ampliação de ilustração com dialog | Parcial | Galeria de fotos licenciadas |
| F-11 | FAQ básico em `details`; sem busca | Parcial | Perguntas reais e priorização |
| F-12 | Dados tipados versionados em git | Parcial | Frequência de edição a validar |
| F-13 | Sem analytics | Bloqueado | LGPD/consentimento e finalidade |
| F-14 | Cópia de mensagem no final | Implementado | Teste dispositivos |
| F-15 | Histórias visuais não publicadas | Bloqueado | Licenças/relatos |
| F-16 | Tema editorial legível | Parcial | Pesquisa real / zoom / leitor |
| F-17 | Cadastro interno | Fora do MVP | Evidência operacional |
| F-18 | Painel/estoque | Fora do MVP | Evidência operacional |
| F-19 | Upload de fotos | Fora do MVP | Privacidade e segurança |
| F-20 | Checkout/pagamento | Fora do MVP | Condições oficiais |
| F-21 | Área do cliente | Fora do MVP | Necessidade |
| F-22 | Favoritos persistentes | Fora do MVP | Pesquisa, consentimento |
| AC-01 | `tests/unit/configurator.test.ts` + E2E revisão | Implementado, a executar | Regras aprovadas |
| AC-02 | Teste Faca → Machado | Implementado, a executar | UX e negócio |
| AC-03 | Teste Couro → Madeira | Implementado, a executar | UX e negócio |
| AC-04 | Erro contextual e foco | Implementado, a executar | QA teclado |
| AC-05 | Link oculto sem número, cópia | Implementado, a executar | Testar com contato oficial |
| AC-06 | Teste dialog/Escape/foco retorno | Implementado, a executar | A11y manual |
| AC-07 | Redirects em `_redirects` | Parcial | Host e 301 real |
| AC-08 | Site sem analytics | Implementado | Política e provedor a revisar |

## Gates

0: **bloqueado para publicação** por `docs/decisions/PENDENCIAS-NEGOCIO.md`. 1–5: implementação em curso, depende da CI e aceites. 6: revisão manual/axe/lab não concluídos. 7: preparação do host, sem publicação. 8: nenhuma medição iniciada. A linha F-13 não será habilitada sem fundamento.
