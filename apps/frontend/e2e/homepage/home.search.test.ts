import { AdminApiClient } from '@mocks-server/admin-api-client';
import { test, expect, devices } from '@playwright/test';

const apiClient = new AdminApiClient();

const SUGGESTION_API_WILDCARD = '**/kyero-api/location-suggestions*';

test.beforeAll(async () => {
  await apiClient.updateConfig({
    mock: {
      collections: {
        selected: 'homepage-spain',
      },
    },
  });
});

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

      await page.route(SUGGESTION_API_WILDCARD, async (route) => {
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
      await page.waitForResponse(SUGGESTION_API_WILDCARD);

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

      await page.route(SUGGESTION_API_WILDCARD, async (route) => {
        const json = {
          results: [],
        };
        await route.fulfill({ body: JSON.stringify(json), status: 200 });
      });

      await input.fill('Ali');

      await page.waitForResponse(SUGGESTION_API_WILDCARD);

      await expect(noResults).toBeVisible();
    });
  });
});

test.skip('Desktop - Recent searches', () => {
  test('when recent searches are saved in local storage', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      //@ts-ignore
      function createRecentSearch(props) {
        return {
          mainFeature: 'near_beach',
          location: {},
          nationId: props.nationId,
          params: {
            paymentSchema: 0,
          },
          url: '/en/fake-url?params=1',
          createdAt: 123123123,
          ...props,
        };
      }

      const recentSearches = {
        55529: [
          createRecentSearch({
            nationId: 55529,
            location: { ancestors: { en: ['Spain', 'Some', 'Location'] } },
            params: { paymentSchema: 0 },
            createdAt: 11111,
          }),
          createRecentSearch({
            nationId: 55529,
            location: { ancestors: { en: ['Spain', 'Some', 'Other'] } },
            params: { paymentSchema: 0 },
            createdAt: 22222,
          }),
          createRecentSearch({
            nationId: 55529,
            location: { ancestors: { en: ['Spain', 'Some', 'Name'] } },
            params: { paymentSchema: 1 },
            createdAt: 33333,
          }),
        ],
        55731: [
          createRecentSearch({
            nationId: 55731,
            location: { ancestors: { en: ['Portugal', 'Some', 'Location'] } },
            params: { paymentSchema: 0 },
            createdAt: 33333,
          }),
        ],
      };
      window.localStorage.setItem('ky.recentSearches', JSON.stringify(recentSearches));
    });

    await page.waitForTimeout(1000);

    const recentSearchesMessage = await page.getByTestId('recent-searches.message');
    expect(recentSearchesMessage).toBeHidden();

    // Focusing the input shows recent searches
    let input = await page.getByTestId('searchbox-input');
    await input.focus();
    await input.fill('1');
    await expect(recentSearchesMessage).toBeVisible();

    // Typing more than 2 characters hides recent searches
    await input.fill('123');
    await expect(recentSearchesMessage).toBeHidden();

    // removing letters to match less then 3 shows again
    await input.fill('11');
    await expect(recentSearchesMessage).toBeVisible();

    // Show correct recent searches for the country. In this case 2 searches for spain for sale
    let recentSearches = await page.getByTestId('recent-searches.item');
    await expect(await recentSearches.count()).toBe(2);

    // Switching search type to rent and agents shows valid recent searches
    const rentLabel = await page.getByTestId('searchbox.desktop.route-rent');
    await rentLabel.click();
    await input.focus();
    await expect(recentSearchesMessage).toBeVisible();
    await expect(await recentSearches.count()).toBe(1);

    // Going to another country, displays correct recent searches
    await page.keyboard.press('Escape');

    const browseMoreCountriesText = await page.getByTestId('searchbox-desktop.browse-more');
    const portugalLink = await browseMoreCountriesText.getByText('Portugal');
    const buyLabel = await page.getByTestId('searchbox.desktop.route-buy');
    await buyLabel.click();

    const urlPromise = page.waitForResponse((res) => {
      return res.url().includes('/portugal');
    });

    await portugalLink.click();

    await urlPromise;

    const portugalPage = await page.getByTestId('homepage.portugal');
    await expect(portugalPage).toBeVisible();

    await input.focus();
    await input.fill('11');

    await expect(await recentSearches.count()).toBe(1);

    // Clicking or selecting via ENTER goes to the correct search page. That for now throws 404
    const responsePromise = page.waitForResponse('/en/fake-url?params=1');
    await page.keyboard.press('Enter');

    const response = await responsePromise;

    expect(response.status()).toBe(404);
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

    const closeButton = await page.getByTestId('searchbox.close-modal');
    const mobileInput = page.getByTestId('searchbox.mobile-input');

    await expect(modal).toBeVisible();
    await expect(mobileInput).toBeFocused();

    // Close modal
    await closeButton.click();
    await expect(modal).toBeHidden();

    // Focus on last clicked element
    await expect(modalTrigger).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(modal).toBeVisible();
    await expect(mobileInput).toBeFocused();

    await closeButton.click();

    await expect(modal).toBeHidden();
    await expect(modalTrigger).toBeFocused();
  });
});

test.skip('Mobile - Recent searches', () => {
  test('when recent searches are saved in local storage and view is mobile', async ({ page }) => {
    await page.setViewportSize(devices['iPhone X'].viewport);
    await page.goto('/');
    await page.evaluate(() => {
      //@ts-ignore
      function createRecentSearch(props) {
        return {
          mainFeature: 'near_beach',
          location: {},
          nationId: props.nationId,
          params: {
            paymentSchema: 0,
          },
          url: '/en/fake-url?params=1',
          createdAt: 123123123,
          ...props,
        };
      }

      const recentSearches = {
        55529: [
          createRecentSearch({
            nationId: 55529,
            location: { ancestors: { en: ['Spain', 'Some', 'Location'] } },
            params: { paymentSchema: 0 },
            createdAt: 11111,
          }),
          createRecentSearch({
            nationId: 55529,
            location: { ancestors: { en: ['Spain', 'Some', 'Other'] } },
            params: { paymentSchema: 0 },
            createdAt: 22222,
          }),
          createRecentSearch({
            nationId: 55529,
            location: { ancestors: { en: ['Spain', 'Some', 'Name'] } },
            params: { paymentSchema: 1 },
            createdAt: 33333,
          }),
        ],
        55731: [
          createRecentSearch({
            nationId: 55731,
            location: { ancestors: { en: ['Portugal', 'Some', 'Location'] } },
            params: { paymentSchema: 0 },
            createdAt: 33333,
          }),
        ],
      };
      window.localStorage.setItem('ky.recentSearches', JSON.stringify(recentSearches));
    });

    await page.waitForTimeout(1000);

    const recentSearchesMessage = await page.getByTestId('recent-searches.message');
    const modalTrigger = await page.getByTestId('searchbox.mobile-trigger');
    // Open modal by clicking
    await modalTrigger.click();

    const mobileInput = page.getByTestId('searchbox.mobile-input');

    await expect(mobileInput).toBeFocused();
    await expect(recentSearchesMessage).toBeVisible();

    // Typing more than 2 characters hides recent searches
    await mobileInput.fill('123');
    await expect(recentSearchesMessage).toBeHidden();

    // removing letters to match less then 3 shows again
    await mobileInput.fill('11');
    await expect(recentSearchesMessage).toBeVisible();

    // Show correct recent searches for the country. In this case 2 searches for spain for sale
    let recentSearches = await page.getByTestId('recent-searches.item');
    await expect(await recentSearches.count()).toBe(2);

    // Switching search type to rent and agents shows valid recent searches
    const rentLabel = await page.getByTestId('searchbox.mobile.route-rent');
    await rentLabel.click();
    await mobileInput.click();
    await expect(recentSearchesMessage).toBeVisible();
    await expect(await recentSearches.count()).toBe(1);

    const closeModalButton = await page.getByTestId('searchbox.close-modal');

    await closeModalButton.click();

    const browseMoreCountriesText = await page.getByTestId('searchbox-desktop.browse-more');
    const portugalLink = await browseMoreCountriesText.getByText('Portugal');
    // Going to another country, displays correct recent searches
    const urlPromise = page.waitForResponse((res) => {
      return res.url().includes('/portugal');
    });

    await portugalLink.click();
    await urlPromise;

    const portugalPage = await page.getByTestId('homepage.portugal');
    await expect(portugalPage).toBeVisible();

    await modalTrigger.click();
    const buyLabel = await page.getByTestId('searchbox.mobile.route-buy');
    await buyLabel.click();
    await mobileInput.click();

    await expect(await recentSearches.count()).toBe(1);
    // Has portugal recent search
    const portugalRecentSearch = await recentSearches.first();
    const recentSearchLocation = await portugalRecentSearch.getByTestId('recent-search.location');

    expect(recentSearchLocation).toHaveText('Portugal, Some, Location');

    const responsePromise = page.waitForResponse('/en/fake-url?params=1');
    await recentSearchLocation.click();

    const response = await responsePromise;

    expect(response.status()).toBe(404);
  });
});
