import { describe, it, expect } from 'vitest';
import { normalizeDraft, flowSteps, validateStep, summaryLines, buildWhatsAppMessage, buildWhatsAppUrl, type QuoteDraft } from '../../src/domain/configurator';

const full: QuoteDraft = {tool:'faca',style:'chef',blade:'carbono',handle:'madeira',sheath:'couro',leather:'bovino',note:'Preciso de ajuda.\nÓtimo 😊'};

describe('configurador / regras puras', () => {
  it('AC-01 faca com estilo e bainha de couro aparece no resumo', () => {
    expect(validateStep(full, 'review')).toEqual([]);
    expect(summaryLines(full)).toContain('Estilo: Chef');
    expect(summaryLines(full)).toContain('Preferência de couro: Couro bovino (referência)');
  });
  it.each(['cutelo','machado'] as const)('AC-02 %s remove estilo antigo e preserva materiais', tool => {
    const normalized = normalizeDraft({...full, tool});
    expect(normalized.style).toBeUndefined();
    expect(normalized.blade).toBe('carbono');
    expect(flowSteps(normalized)).not.toContain('style');
    expect(buildWhatsAppMessage(normalized)).not.toContain('Chef');
    expect(buildWhatsAppMessage(normalized)).not.toContain('Estilo:');
  });
  it('AC-03 madeira remove preferência antiga de couro', () => {
    const normalized = normalizeDraft({...full,sheath:'madeira'});
    expect(normalized.leather).toBeUndefined();
    expect(summaryLines(normalized).join(' ')).not.toContain('bovino');
    expect(buildWhatsAppMessage(normalized)).not.toContain('Preferência de couro:');
  });
  it('AC-04 exige escolhas por grupo sem perder dados', () => {
    const draft: QuoteDraft = {...full}; delete draft.blade;
    expect(validateStep(draft,'blade')[0]?.message).toContain('lâmina');
    expect(validateStep(draft,'review')).toHaveLength(1);
    expect(draft.handle).toBe('madeira');
  });
  it('estilo de faca é requerido como escolha explícita, orientação é válida', () => {
    const withoutStyle: QuoteDraft = {...full}; delete withoutStyle.style;
    expect(validateStep(withoutStyle,'style')).toHaveLength(1);
    expect(validateStep({...full,style:'orientacao'},'style')).toEqual([]);
  });
  it.each(['faca','cutelo','machado'] as const)('AC-01/08 mensagem %s consistente', tool => {
    for (const sheath of ['couro','madeira','sem','orientacao'] as const) {
      const draft = normalizeDraft({...full,tool,sheath});
      expect(validateStep(draft,'review')).toEqual([]);
      const result = buildWhatsAppMessage(draft);
      expect(result).toContain('Ferramenta:');
      expect(result).toContain('Bainha:');
      if (sheath !== 'couro') expect(result).not.toContain('Preferência de couro');
      if (tool !== 'faca') expect(result).not.toContain('Estilo:');
    }
  });
  it('AC-05 número ausente não cria link; número legítimo gera URL HTTPS codificada', () => {
    const message = buildWhatsAppMessage(full);
    expect(buildWhatsAppUrl(message,undefined)).toBeNull();
    expect(buildWhatsAppUrl(message,'5511999999999')).toContain('https://wa.me/5511999999999?text=');
    expect(decodeURIComponent(buildWhatsAppUrl(message,'5511999999999')!.split('?text=')[1]!)).toBe(message);
    expect(buildWhatsAppUrl(message,'abc')).toBeNull();
  });
  it('comentário com emojis, acentos e quebra de linha é preservado; excesso truncado', () => {
    const message = buildWhatsAppMessage(full);
    expect(message).toContain('Ótimo 😊');
    expect(message).toContain('ajuda.\nÓtimo');
    expect(normalizeDraft({...full,note:'x'.repeat(800)}).note).toHaveLength(400);
    expect(buildWhatsAppUrl('x'.repeat(7000),'5511999999999')).toBeNull();
  });
});
