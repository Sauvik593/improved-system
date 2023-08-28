import { AdminApiClient } from '@mocks-server/admin-api-client';
import { test, expect } from '@playwright/test';

const apiClient = new AdminApiClient();

test.beforeAll(async () => {
  await apiClient.updateConfig({
    mock: {
      collections: {
        selected: 'homepage-spain',
      },
    },
  });
});

test('has spanish page', async ({ page }) => {
  await page.goto('/');
  const pageComponent = await page.getByTestId('homepage.spain');
  expect(pageComponent).toBeVisible();
});

test('redirects to the root when locale is en', async ({ page }) => {
  await page.goto('/en');
  await page.waitForURL('/');
  const fullUrl = new URL(page.url());
  expect(fullUrl.pathname).toBe('/');
});
