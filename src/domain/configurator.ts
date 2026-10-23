/**
 * Modelo de preferências para solicitar orçamento — não representa catálogo aprovado.
 * IDs internos nunca dependem da capitalização dos rótulos apresentados.
 */
export const choices = {
  tool: [
    { id: 'faca', label: 'Faca', help: 'Uma peça de corte de formato tradicional.' },
    { id: 'cutelo', label: 'Cutelo', help: 'Para conversar sobre uma lâmina mais larga.' },
    { id: 'machado', label: 'Machado', help: 'Para descrever uma ferramenta de outro formato.' }
  ],
  style: [
    { id: 'chef', label: 'Chef', help: 'Estilo de referência, sujeito à confirmação.' },
    { id: 'japonesa', label: 'Japonesa', help: 'Estilo de referência, sujeito à confirmação.' },
    { id: 'hunter', label: 'Hunter', help: 'Estilo de referência, sujeito à confirmação.' },
    { id: 'utilitaria', label: 'Utilitária', help: 'Estilo de referência, sujeito à confirmação.' },
    { id: 'orientacao', label: 'Quero orientação', help: 'Ainda não tenho preferência.' }
  ],
  blade: [
    { id: 'inox', label: 'Aço inox', help: 'Referência de preferência; composição a confirmar.' },
    { id: 'carbono', label: 'Aço carbono', help: 'Referência de preferência; especificação a confirmar.' },
    { id: 'damasco', label: 'Damasco', help: 'Referência visual; viabilidade a confirmar.' },
    { id: 'orientacao', label: 'Quero orientação', help: 'Peço ajuda para escolher.' }
  ],
  handle: [
    { id: 'madeira', label: 'Madeira', help: 'Espécie e procedência a confirmar.' },
    { id: 'sintetico', label: 'Outro material', help: 'Gostaria de conversar sobre alternativas.' },
    { id: 'orientacao', label: 'Quero orientação', help: 'Ainda não sei qual material escolher.' }
  ],
  sheath: [
    { id: 'couro', label: 'Couro', help: 'Modelo e disponibilidade a confirmar.' },
    { id: 'madeira', label: 'Madeira', help: 'Modelo e disponibilidade a confirmar.' },
    { id: 'sem', label: 'Sem bainha', help: 'Prefiro consultar sem esse item.' },
    { id: 'orientacao', label: 'Quero orientação', help: 'Preciso de ajuda nesta escolha.' }
  ],
  leather: [
    { id: 'bovino', label: 'Couro bovino (referência)', help: 'Origem e oferta sujeitas à aprovação.' },
    { id: 'orientacao', label: 'Quero orientação', help: 'Prefiro conversar sobre isso.' }
  ]
} as const;

export type Tool = typeof choices.tool[number]['id'];
export type Style = typeof choices.style[number]['id'];
export type Blade = typeof choices.blade[number]['id'];
export type Handle = typeof choices.handle[number]['id'];
export type Sheath = typeof choices.sheath[number]['id'];
export type Leather = typeof choices.leather[number]['id'];
export type Step = 'tool' | 'style' | 'blade' | 'handle' | 'sheath' | 'review';

export type QuoteDraft = {
  tool?: Tool;
  style?: Style;
  blade?: Blade;
  handle?: Handle;
  sheath?: Sheath;
  leather?: Leather;
  note: string;
};

type ChoiceId = Tool | Style | Blade | Handle | Sheath | Leather;
export type FieldError = { field: Exclude<Step, 'review'>; message: string };

export function normalizeDraft(draft: QuoteDraft): QuoteDraft {
  const next = { ...draft, note: draft.note.slice(0, 400) };
  if (next.tool !== 'faca') delete next.style;
  if (next.sheath !== 'couro') delete next.leather;
  return next;
}

export function flowSteps(draft: QuoteDraft): Step[] {
  return draft.tool === 'faca'
    ? ['tool', 'style', 'blade', 'handle', 'sheath', 'review']
    : ['tool', 'blade', 'handle', 'sheath', 'review'];
}

export function validateStep(raw: QuoteDraft, step: Step): FieldError[] {
  const draft = normalizeDraft(raw);
  const messages: Partial<Record<Exclude<Step, 'review'>, string>> = {
    tool: 'Escolha o tipo de ferramenta para continuar.',
    style: 'Escolha um estilo ou marque “Quero orientação”.',
    blade: 'Escolha o material da lâmina para continuar.',
    handle: 'Escolha o material do cabo para continuar.',
    sheath: 'Escolha uma opção de bainha para continuar.'
  };
  if (step === 'review') return flowSteps(draft).filter(key => key !== 'review').flatMap(key => validateStep(draft, key));
  if (step === 'style' && draft.tool !== 'faca') return [];
  return draft[step] ? [] : [{ field: step, message: messages[step] ?? 'Faça uma escolha para continuar.' }];
}

export function labelFor(group: keyof typeof choices, id: ChoiceId | undefined): string {
  if (!id) return 'Não informado';
  return choices[group].find(choice => choice.id === id)?.label ?? 'Não informado';
}

export function summaryLines(raw: QuoteDraft): string[] {
  const draft = normalizeDraft(raw);
  const rows = ['Ferramenta: ' + labelFor('tool', draft.tool)];
  if (draft.tool === 'faca') rows.push('Estilo: ' + labelFor('style', draft.style));
  rows.push('Lâmina: ' + labelFor('blade', draft.blade));
  rows.push('Cabo: ' + labelFor('handle', draft.handle));
  rows.push('Bainha: ' + labelFor('sheath', draft.sheath));
  if (draft.sheath === 'couro' && draft.leather) rows.push('Preferência de couro: ' + labelFor('leather', draft.leather));
  if (draft.note.trim()) rows.push('Observações: ' + draft.note.trim());
  return rows;
}

export function buildWhatsAppMessage(raw: QuoteDraft): string {
  const lines = [
    'Olá! Gostaria de solicitar uma avaliação de orçamento à SH Cutelaria.',
    '',
    'Minhas preferências (sujeitas à confirmação):',
    ...summaryLines(raw).map(row => '• ' + row),
    '',
    'Podem confirmar viabilidade, disponibilidade, valor, prazo e condições?',
    'Se necessário, posso ajustar as escolhas. Obrigado!'
  ];
  return lines.join('\n');
}

/** Retorna null se o canal oficial não foi aprovado ou se a URL for longa demais. */
export function buildWhatsAppUrl(message: string, digits: string | undefined): string | null {
  if (!digits || !/^55\d{10,11}$/.test(digits)) return null;
  const url = 'https://wa.me/' + digits + '?text=' + encodeURIComponent(message);
  return url.length <= 6000 ? url : null;
}
