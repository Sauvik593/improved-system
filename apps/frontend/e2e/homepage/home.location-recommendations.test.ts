import { AdminApiClient } from '@mocks-server/admin-api-client';
import { test, expect } from '@playwright/test';

const wait = (time: number) => new Promise((res) => setTimeout(res, time));

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

const API_URL_WILDCARD = '**/kyero-api/location-recommendations*';

const SEED = {
  locations: [
    {
      id: 1351,
      for_sale_path: '/en/hondon-de-las-nieves-property-for-sale-0l1351',
      name: 'Hondon De Las Nieves',
      image_url:
        'https://d2hhh2ewuz3i8z.cloudfront.net/crop/480x320/https://s3-eu-west-1.amazonaws.com/production.kyero/location_guides/1351_shutterstock_416392570.jpg',
    },
    {
      id: 1822,
      for_sale_path: '/en/torrevieja-property-for-sale-0l1822',
      name: 'Torrevieja',
      image_url:
        'https://d2hhh2ewuz3i8z.cloudfront.net/crop/480x320/https://s3-eu-west-1.amazonaws.com/production.kyero/location_guides/1822_shutterstock_387255274.jpg',
    },
    {
      id: 1888,
      for_sale_path: '/en/villamartin-property-for-sale-0l1888',
      name: 'Villamartin',
      image_url:
        'https://d2hhh2ewuz3i8z.cloudfront.net/crop/480x320/https://s3-eu-west-1.amazonaws.com/production.kyero/location_guides/1888_shutterstock_87882490.jpg',
    },
    {
      id: 1902,
      for_sale_path: '/en/la-zenia-property-for-sale-0l1902',
      name: 'La Zenia',
      image_url:
        'https://d2hhh2ewuz3i8z.cloudfront.net/crop/480x320/https://s3-eu-west-1.amazonaws.com/production.kyero/location_guides/1902_shutterstock_385798252.jpg',
    },
  ],
};
test.describe.skip('Desktop', () => {
  test.describe('when successful', () => {
    test('should work correctly and not render carousel on desktop', async ({ page, context }) => {
      context.addCookies([
        {
          name: 'non_essential_cookies',
          value: 'false',
          domain: 'localhost',
          path: '/',
          expires: -1,
          httpOnly: false,
          secure: false,
          sameSite: 'Lax',
        },
      ]);

      await page.route(API_URL_WILDCARD, async (route) => {
        const json = SEED;
        await wait(100);
        await route.fulfill({ body: JSON.stringify(json), status: 200 });
      });

      await page.goto('/');

      const loaderSkeletons = await page.getByTestId('location-recommendation.loader-item');
      const results = await page.getByTestId('location-recommendation.item');
      const leftButton = await page.getByTestId('location-recommendation.left-button');
      const rightButton = await page.getByTestId('location-recommendation.left-button');

      expect(loaderSkeletons).toHaveCount(4);
      expect(loaderSkeletons).toHaveCount(0);
      expect(leftButton).not.toBeVisible();
      expect(rightButton).not.toBeVisible();

      await page.waitForResponse(API_URL_WILDCARD);

      let dataLayer = await page.evaluate(() => window.dataLayer);
      expect(dataLayer).toEqual([{ event: 'suggested.location.kyero.count', kyeroCount: 4 }]);

      expect(loaderSkeletons).toHaveCount(0);
      expect(results).toHaveCount(SEED.locations.length);

      expect(leftButton).not.toBeVisible();
      expect(rightButton).not.toBeVisible();

      const firstLink = await results.first().locator('a', { hasText: 'View properties' });

      await firstLink.click();

      expect(new URL(page.url()).pathname).toBe(SEED.locations[0].for_sale_path);
    });
  });

  test.describe('when error', () => {
    test('should work correctly and not render carousel on desktop', async ({ page }) => {
      await page.route(API_URL_WILDCARD, async (route) => {
        await wait(100);
        await route.fulfill({ status: 500 });
      });

      await page.goto('/');

      const loaderSkeletons = await page.getByTestId('location-recommendation.loader-item');
      const results = await page.getByTestId('location-recommendation.item');
      const leftButton = await page.getByTestId('location-recommendation.left-button');
      const rightButton = await page.getByTestId('location-recommendation.left-button');
      const errorState = await page.getByTestId('location-recommendation.error');

      expect(loaderSkeletons).toHaveCount(4);
      expect(loaderSkeletons).toHaveCount(0);
      expect(leftButton).not.toBeVisible();
      expect(rightButton).not.toBeVisible();
      expect(errorState).not.toBeVisible();

      await page.waitForResponse(API_URL_WILDCARD);

      expect(loaderSkeletons).toHaveCount(0);
      expect(results).toHaveCount(0);
      expect(leftButton).not.toBeVisible();
      expect(rightButton).not.toBeVisible();
      expect(errorState).toBeVisible();
    });
  });
});
