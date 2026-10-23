# Fase 2 — exploração UX/UI e decisão visual

**Status:** alternativas esquemáticas documentadas e protótipo navegável implementado. **Pesquisa com pessoas e aprovação de marca não executadas.**

## Jornadas
- Pessoa buscando uma faca: Home → Personalizar → Ferramenta → Estilo (faca) → Lâmina → Cabo → Bainha/detalhes → Revisão → Copiar ou abrir conversa com número aprovado.
- Pessoa interessada em blocos: Home → Blocos → Ler aviso de referência/estoque → Examinar ilustração ampliada → Consultar disponibilidade por canal oficial após aprovação.
- Pessoa interessada em restauração: Home → Restauração → Ler etapas e limitações → Combinar avaliação pelo canal oficial após validação.

Exceções: sem JS há texto de orientação; sem número comercial validado há cópia do resumo sem link falso; erros por etapa focam mensagem; edição retorna à etapa sem apagar escolha válida; diálogo fecha por Escape com retorno de foco.

## Alternativas exploradas

| Alternativa | Wireframe resumido da Home | Trade-off |
|---|---|---|
| A — Forja escura | Fundo grafite em todo site; hero com peça; grid escuro para serviços | Atmosfera forte, porém leitura longa e campos ficam mais exigentes |
| B — Ateliê editorial | Cabeçalho areia; hero grafite com ilustração; área clara com três serviços; seção de processo em bege | Escolhida como ponto de partida; leitura clara, ações em cobre, identidade artesanal |
| C — Industrial minimalista | Header cinza; hero tipográfico sem textura; cards contornados e sem calor | Leve e técnico, porém menor caráter artesanal |

## Wireframes implementados

**Home:** [marca / navegação] → [hero editorial / ação Personalizar + Como funciona / estudo gráfico] → [3 cards de caminhos] → [processo em 3 etapas] → [compromisso editorial] → [FAQ] → [rodapé].

**Personalizar:** [título + aviso de não compra] → [Etapa N de M e progresso] → [escolhas em radios grandes] → [erro contextual] → [Voltar / Continuar] → [revisão com edição, copiar e contato condicionado].

**Blocos:** [cabeçalho + aviso ilustrativo] → [grid sem dependência de swipe] → [dialog via teclado/Escape] → [contato condicionado].

**Restauração:** [mensagem acolhedora] → [aviso de avaliação antes de enviar objeto] → [3 passos] → [FAQ nativo].

## Critérios de design implementados
18 px corpo/1.6; títulos editoriais Georgia de licença do sistema (sem redistribuir fontes); tokens do dossiê em `global.css`; alvos principais ≥48–52px; controles selecionados com marca ✓, borda e fundo; links explícitos; motion reduzido; coluna única em mobile; sem carrosséis automáticos, popups de marketing nem captura de dados.

**Limitações:** falta fotografia autêntica licenciada, aprovação de textos e sessão moderada de usabilidade. O desenho é protótipo técnico, não identidade formalmente aprovada. Testes manuais com 55+, teclado, leitores de tela e zoom permanecem Gate 6.
