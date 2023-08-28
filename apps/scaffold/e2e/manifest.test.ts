import { test, expect } from '@playwright/test';

test.describe('/manifest.json specs', async () => {
  test('should have manifest file', async ({ page }) => {
    page.goto('/manifest.json');

    const resp = await page.waitForResponse((response) =>
      response.url().includes('/manifest.json'),
    );

    expect(resp.headers()['content-type']).toEqual('application/manifest+json');

    const body = await page.textContent('body');

    expect(await body).toBe(
      JSON.stringify({
        name: 'Kyero.com',
        theme_color: '#1F4DEF',
        background_color: '#1F4DEF',
        display: 'standalone',
        icons: [
          { src: 'favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'favicon/android-chrome-384x384.png', sizes: '384x384', type: 'image/png' },
          { src: 'favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      }),
    );
  });
});
