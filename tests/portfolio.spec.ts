import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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
];

for (const route of routes) {
  test(`route ${route} renders`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto(route);
    await expect(page.locator('main')).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test('mobile navigation works', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Menu' }).click();
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.getByRole('link', { name: 'Work' }).click();
  await expect(page).toHaveURL(/\/work$/);
});

test('keyboard skip link is available', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
});

test('reduced motion keeps content visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('404 has recovery links', async ({ page }) => {
  await page.goto('/this-route-does-not-exist');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('path');
  await expect(page.getByRole('link', { name: /Home/ })).toBeVisible();
});

test('@a11y home has no serious axe violations', async ({ page }) => {
  await page.goto('/');
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(result.violations.filter((v) => ['critical', 'serious'].includes(v.impact ?? ''))).toEqual(
    [],
  );
});
