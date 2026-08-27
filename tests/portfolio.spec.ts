import { expect, test } from '@playwright/test';
import { basePath, routeUrl } from './routes';

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
  test(`route ${route} renders cleanly`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });

    const response = await page.goto(routeUrl(route));
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(hasHorizontalOverflow).toBe(false);
    expect(errors).toEqual([]);
  });
}

test('mobile navigation opens, navigates, and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(routeUrl('/'));

  const menuButton = page.locator('button[aria-controls="site-navigation"]');
  await expect(menuButton).toHaveAccessibleName('Menu');
  await menuButton.click();

  const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
  await expect(navigation).toBeVisible();
  await expect(menuButton).toHaveAccessibleName('Close');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

  await page.keyboard.press('Escape');
  await expect(menuButton).toBeFocused();
  await expect(menuButton).toHaveAccessibleName('Menu');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

  await menuButton.click();
  const workLink = navigation.getByRole('link', { name: 'Work', exact: true });
  await expect(workLink).toHaveAttribute('href', `${basePath}/work/`);
  await workLink.click();
  await expect(page).toHaveURL(new RegExp(`${basePath.replace(/\\/g, '\\\\')}\\/work\\/?import { expect, test } from '@playwright/test';
import { basePath, routeUrl } from './routes';

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
  test(`route ${route} renders cleanly`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });

    const response = await page.goto(routeUrl(route));
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(hasHorizontalOverflow).toBe(false);
    expect(errors).toEqual([]);
  });
}

test('mobile navigation opens, navigates, and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(routeUrl('/'));

  const menuButton = page.locator('button[aria-controls="site-navigation"]');
  await expect(menuButton).toHaveAccessibleName('Menu');
  await menuButton.click();

  const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
  await expect(navigation).toBeVisible();
  await expect(menuButton).toHaveAccessibleName('Close');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

  await page.keyboard.press('Escape');
  await expect(menuButton).toBeFocused();
  await expect(menuButton).toHaveAccessibleName('Menu');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

  await menuButton.click();
  const workLink = navigation.getByRole('link', { name: 'Work', exact: true });
  await expect(workLink).toHaveAttribute('href', `${basePath}/work/`);
));
});

test('keyboard skip link is available', async ({ page }) => {
  await page.goto(routeUrl('/'));
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
});

test('reduced motion keeps content and navigation available', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(routeUrl('/'));
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  const scrollBehavior = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  );
  expect(scrollBehavior).toBe('auto');
});

test('404 returns the custom recovery page', async ({ page }) => {
  const response = await page.goto(routeUrl('/this-route-does-not-exist'));
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('path');
  await expect(page.getByRole('link', { name: 'Home ↗', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Selected work ↗', exact: true })).toBeVisible();
});
