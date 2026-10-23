import { test, expect } from '@playwright/test';

test('reflow básico sem overflow horizontal nos viewports-alvo', async ({page}) => {
  for (const width of [320,375,390,768,1024,1440]) {
    await page.setViewportSize({width,height:800});
    for (const route of ['/', '/personalizar/', '/blocos/', '/restauracao/']) {
      await page.goto(route);
      const metrics = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth
      }));
      expect(metrics.documentWidth, route + ' em ' + width + 'px').toBeLessThanOrEqual(metrics.viewportWidth + 1);
      await expect(page.locator('main h1')).toBeVisible();
    }
  }
});

test('nenhum serviço analítico externo solicitado durante a jornada', async ({page}) => {
  const external: string[] = [];
  page.on('request', request => {
    if (!request.url().startsWith('http://127.0.0.1:4321/')) external.push(request.url());
  });
  await page.goto('/personalizar/');
  await page.getByRole('radio',{name:/^Cutelo/}).check();
  await page.getByRole('button',{name:/Continuar/}).click();
  await expect(page.getByRole('radio',{name:/^Aço inox/})).toBeVisible();
  expect(external).toEqual([]);
});

test('arquivos SEO em preview não permitem indexação', async ({request}) => {
  const robots = await request.get('/robots.txt');
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain('Disallow: /');
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  const xml = await sitemap.text();
  expect(xml).toContain('/personalizar/');
  expect(xml).toContain('/privacidade/');
});
