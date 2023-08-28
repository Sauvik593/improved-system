import { test, expect } from '@playwright/test';

test.describe('when in different locales', () => {
  test('has correct title in default locale', async ({ page }) => {
    await page.goto('/');
    await expect(await page.innerHTML('h1')).toContain(
      'Access to millions of international buyers',
    );
  });

  test('has correct title and url in es locale', async ({ page }) => {
    await page.goto('/es');
    await expect(await page.innerHTML('h1')).toContain(
      'Acceso a millones de compradores internacionales',
    );
  });
});

test.describe('redirects correctly', () => {
  test('has correct path in default locale', async ({ page }) => {
    await page.goto('/');

    const fullUrl = new URL(page.url());
    expect(fullUrl.pathname).toBe('/en/join');
  });

  test('has correct path in es locale', async ({ page }) => {
    await page.goto('/es');

    const fullUrl = new URL(page.url());
    expect(fullUrl.pathname).toBe('/es/join');
  });
});
