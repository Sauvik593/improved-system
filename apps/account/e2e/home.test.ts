import { AdminApiClient } from '@mocks-server/admin-api-client';
import { test, expect } from '@playwright/test';

const adminApiClient = new AdminApiClient();

test.describe('when unauthorized', () => {
  test('redirects to id.kyero.com', async ({ page }) => {
    await adminApiClient.updateConfig({
      mock: {
        collections: {
          selected: 'server-error',
        },
      },
    });

    await page.goto('/');

    await expect(page).toHaveURL(/id.kyero.com/);
  });
});

test.describe('when authorized', () => {
  test('has title', async ({ page }) => {
    await adminApiClient.updateConfig({
      mock: {
        collections: {
          selected: 'normal-user',
        },
      },
    });

    await page.goto('/');

    await expect(page).toHaveTitle(/Dashboard/);
  });
});
