import { test, expect, devices } from '@playwright/test';

test.describe('Desktop', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the homepage before each
    await page.goto('/');
  });

  test.describe('Search type', () => {
    test('should correctly handle state changes', async ({ page }) => {
      const typeFields = await page.locator('input[name="route"]');

      await expect(typeFields).toHaveCount(3);

      const [buy, rent, agents] = await typeFields.all();

      expect(await buy.inputValue()).toBe('buy');
      await expect(buy).toBeChecked();

      expect(await rent.inputValue()).toBe('rent');
      await expect(rent).not.toBeChecked();

      expect(await agents.inputValue()).toBe('agents');
      await expect(agents).not.toBeChecked();

      const rentalLabel = await page.getByTestId('searchbox.desktop.route-rent');

      await rentalLabel.click();

      await expect(buy).not.toBeChecked();
      await expect(rent).toBeChecked();
      await expect(agents).not.toBeChecked();

      const agentsLabel = await page.getByTestId('searchbox.desktop.route-agents');

      await agentsLabel.click();

      await expect(buy).not.toBeChecked();
      await expect(rent).not.toBeChecked();
      await expect(agents).toBeChecked();
    });
  });

  test.describe('Suggestion input', () => {
    test('should work correctly', async ({ page }) => {
      // There is a delay before the input is visible and js ready
      await page.waitForTimeout(1000);

      const input = await page.getByTestId('searchbox-input');

      await input.fill('Al');

      const minCharsMessage = await page.getByTestId('min-chars-message');
      const suggestions = await page.getByTestId('searchbox.results');

      await expect(suggestions).not.toBeVisible();
      await expect(minCharsMessage).toBeVisible();
      await expect(minCharsMessage).toHaveText('Please type minimum 3 characters...');

      await page.route('**/api/location-suggestions*', async (route) => {
        const json = {
          results: [
            {
              id: 3,
              name: 'Alicante province',
              popularity: 923,
              parent: 'Valencia region',
              nation_id: 55529,
              agent_list_path: '/en/estate-agents-spain/alicante-province-l3',
              to_rent_path: '/en/alicante-province-property-long-let-1l3',
              for_sale_path: '/en/alicante-province-property-for-sale-0l3',
            },
            {
              id: 862,
              name: 'Alicante',
              popularity: 607,
              parent: 'Alicante province',
              nation_id: 55529,
              agent_list_path: '/en/estate-agents-spain/alicante-l862',
              to_rent_path: '/en/alicante-property-long-let-1l862',
              for_sale_path: '/en/alicante-property-for-sale-0l862',
            },
          ],
        };

        await route.fulfill({ body: JSON.stringify(json), status: 200 });
      });

      await input.fill('Ali');
      await page.waitForResponse('**/api/location-suggestions*');

      await expect(minCharsMessage).not.toBeVisible();
      await expect(suggestions).toBeVisible();

      const firstResult = await page.getByTestId('searchbox.result.0');
      const secondResult = await page.getByTestId('searchbox.result.1');

      await expect(firstResult).toHaveAttribute('data-headlessui-state', 'active');
      await expect(secondResult).toHaveAttribute('data-headlessui-state', '');

      await page.keyboard.press('ArrowDown');

      await expect(firstResult).toHaveAttribute('data-headlessui-state', '');
      await expect(secondResult).toHaveAttribute('data-headlessui-state', 'active');

      await page.keyboard.press('Enter');

      await expect(suggestions).not.toBeVisible();
      await expect(input).toHaveValue('Alicante');
    });

    test('when no results are found', async ({ page }) => {
      // There is a delay before the input is visible and js ready
      await page.waitForTimeout(1000);

      const input = await page.getByTestId('searchbox-input');
      const noResults = await page.getByTestId('searchbox.no-results');

      await page.route('**/api/location-suggestions*', async (route) => {
        const json = {
          results: [],
        };
        await route.fulfill({ body: JSON.stringify(json), status: 200 });
      });

      await input.fill('Ali');

      await page.waitForResponse('**/api/location-suggestions*');

      await expect(noResults).toBeVisible();
    });
  });
});

test.describe('Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(devices['iPhone X'].viewport);
    // Go to the homepage before each
    await page.goto('/');
  });

  test('handling modal', async ({ page }) => {
    const modalTrigger = await page.getByTestId('searchbox.mobile-trigger');
    const modal = await page.getByTestId('searchbox.modal');

    await expect(modal).toBeHidden();

    // Open modal by clicking
    await modalTrigger.click();

    const mobileInput = page.getByTestId('searchbox.mobile-input');

    await expect(modal).toBeVisible();
    await expect(mobileInput).toBeFocused();

    // Close modal
    await page.keyboard.press('Escape');

    await expect(modal).toBeHidden();

    // Focus on last clicked element
    await expect(modalTrigger).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(modal).toBeVisible();
    await expect(mobileInput).toBeFocused();

    // Close using a button
    const closeButton = await page.getByTestId('searchbox.close-modal');

    await closeButton.click();

    await expect(modal).toBeHidden();
    await expect(modalTrigger).toBeFocused();
  });
});
