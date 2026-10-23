import { test, expect } from '@playwright/test';

test('navegação e rotas principais respondem sem links internos quebrados', async ({page}) => {
  const routes = ['/', '/personalizar/', '/blocos/', '/restauracao/', '/sobre/', '/como-funciona/', '/privacidade/'];
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex,nofollow');
  }
  await page.goto('/');
  await expect(page.getByRole('link',{name:/Começar a personalizar/})).toBeVisible();
});

test('AC-01 AC-04 AC-05: erros recuperáveis e resumo copiável', async ({page}) => {
  await page.goto('/personalizar/');
  const next = page.getByRole('button',{name:/Continuar/});
  await next.click();
  const error = page.getByText('Escolha o tipo de ferramenta para continuar.');
  await expect(error).toBeVisible();
  await expect(error).toBeFocused();
  await page.getByRole('radio',{name:/^Faca/}).check();
  await next.click();
  await page.getByRole('radio',{name:/^Chef/}).check();
  await next.click();
  await next.click();
  await expect(page.getByText('Escolha o material da lâmina para continuar.')).toBeVisible();
  await page.getByRole('radio',{name:/^Aço carbono/}).check();
  await next.click();
  await page.getByRole('radio',{name:/^Madeira/}).check();
  await next.click();
  await page.getByRole('radio',{name:/^Couro/}).check();
  await page.getByRole('radio',{name:/Couro bovino/}).check();
  await page.locator('#quote-note').fill('Detalhes: Olá 😊\nPeça única');
  await next.click();
  await expect(page.locator('#summary-list')).toContainText('Chef');
  await expect(page.locator('#summary-list')).toContainText('Couro bovino');
  await expect(page.locator('#quote-message')).toHaveValue(/Olá 😊/);
  await expect(page.locator('#whatsapp-link')).toBeHidden();
  await expect(page.locator('#contact-pending')).toBeVisible();
  await expect(page.locator('#copy-summary')).toBeVisible();
  await expect(page.getByText('Pedido enviado')).toHaveCount(0);
});

test('AC-02 e AC-03: editar limpa condicionais sem apagar escolhas compatíveis', async ({page}) => {
  await page.goto('/personalizar/');
  const next = page.getByRole('button',{name:/Continuar/});
  await page.getByRole('radio',{name:/^Faca/}).check(); await next.click();
  await page.getByRole('radio',{name:/^Chef/}).check(); await next.click();
  await page.getByRole('radio',{name:/^Aço inox/}).check(); await next.click();
  await page.getByRole('radio',{name:/^Madeira/}).check(); await next.click();
  await page.getByRole('radio',{name:/^Couro/}).check();
  await page.getByRole('radio',{name:/Couro bovino/}).check(); await next.click();
  await page.getByRole('button',{name:'Editar ferramenta'}).click();
  await page.getByRole('radio',{name:/^Machado/}).check();
  await next.click();
  await expect(page.getByRole('radio',{name:/^Aço inox/})).toBeChecked();
  await next.click(); await next.click();
  await page.getByRole('radio',{name:/^Madeira/}).last().check();
  await next.click();
  await expect(page.locator('#summary-list')).not.toContainText('Chef');
  await expect(page.locator('#summary-list')).not.toContainText('Couro bovino');
  await expect(page.locator('#summary-list')).toContainText('Machado');
});

test('AC-06: diálogo retorna foco e fecha com Escape', async ({page}) => {
  await page.goto('/blocos/');
  const trigger = page.getByRole('button',{name:'Ver detalhe ilustrativo'}).first();
  await trigger.focus(); await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('button',{name:'Fechar'})).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('menu móvel informa expansão e pode fechar com Escape', async ({page,isMobile}) => {
  test.skip(!isMobile,'Controle móvel');
  await page.goto('/');
  const toggle = page.getByRole('button',{name:/Menu/});
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded','true');
  await expect(page.getByRole('navigation',{name:'Navegação móvel'})).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded','false');
  await expect(toggle).toBeFocused();
});
