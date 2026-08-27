import { expect, test } from '@playwright/test';
import { routeUrl } from './routes';

const routes = [
  '/',
  '/work',
  '/work/badia-padel-tour',
  '/work/structcad',
  '/work/eedif',
  '/work/hclab-mobile',
  '/work/hdsolutions',
  '/about',
  '/resume',
  '/this-route-does-not-exist',
];

test('@links internal, external, hash, and email links are valid', async ({
  page,
  request,
  baseURL,
}) => {
  if (!baseURL) throw new Error('Playwright baseURL is required for link validation.');

  const origin = new URL(baseURL).origin;
  const checked = new Set<string>();

  for (const route of routes) {
    await page.goto(routeUrl(route));
    const pageUrl = page.url();
    const hrefs = await page
      .locator('a[href]')
      .evaluateAll((anchors) =>
        anchors
          .map((anchor) => anchor.getAttribute('href'))
          .filter((href): href is string => Boolean(href)),
      );

    for (const href of hrefs) {
      if (href.startsWith('mailto:')) {
        expect(href).toMatch(/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/);
        continue;
      }

      if (href.startsWith('#')) {
        await expect(page.locator(href)).toHaveCount(1);
        continue;
      }

      const url = new URL(href, pageUrl);
      const key = `${url.origin}${url.pathname}${url.search}`;
      if (checked.has(key)) continue;
      checked.add(key);

      if (url.origin === origin) {
        const response = await request.get(`${url.pathname}${url.search}`);
        expect(response.status(), `Broken internal link: ${href}`).toBeLessThan(400);

        if (url.hash) {
          await page.goto(url.toString());
          await expect(page.locator(url.hash)).toHaveCount(1);
        }
        continue;
      }

      if (url.protocol === 'http:' || url.protocol === 'https:') {
        const response = await request.get(url.toString(), {
          timeout: 20_000,
          headers: { 'user-agent': 'David-Sanchez-Portfolio-Link-Check/1.0' },
        });
        expect(response.status(), `Broken external link: ${href}`).toBeLessThan(400);
      }
    }
  }
});
