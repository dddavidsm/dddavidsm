import AxeBuilder from '@axe-core/playwright';
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

for (const route of routes) {
  test(`@a11y ${route} has no serious or critical axe violations`, async ({ page }) => {
    await page.goto(routeUrl(route));
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    const blocking = result.violations.filter((violation) =>
      ['critical', 'serious'].includes(violation.impact ?? ''),
    );
    expect(blocking).toEqual([]);
  });
}
