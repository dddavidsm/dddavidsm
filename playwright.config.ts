import { defineConfig, devices } from '@playwright/test';

const origin = process.env.PLAYWRIGHT_ORIGIN ?? 'http://127.0.0.1:3000';
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const basePath = rawBasePath === '/' ? '' : rawBasePath.replace(/\/+$/, '');
const local = !process.env.PLAYWRIGHT_ORIGIN;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['list']] : 'list',
  use: {
    baseURL: origin,
    trace: 'on-first-retry',
  },
  webServer: local
    ? {
        command: 'npm run start',
        url: `${origin}${basePath}/`,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      }
    : undefined,
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
});
