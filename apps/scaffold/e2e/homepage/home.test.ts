import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(await page.innerHTML('h1')).toContain('Find your dream home');
});

test('redirects to the root when locale is en', async ({ page }) => {
  await page.goto('/en');
  await page.waitForURL('/');
  const fullUrl = new URL(page.url());
  expect(fullUrl.pathname).toBe('/');
});
