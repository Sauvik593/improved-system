import { test, expect } from '@playwright/test';

test.describe('/ads.txt specs', async () => {
  test('should have ads.txt file', async ({ page }) => {
    page.goto('/ads.txt');
    const resp = await page.waitForResponse((response) => response.url().includes('/ads.txt'));

    expect(resp.headers()['content-type']).toEqual('text/plain; charset=utf-8');

    expect(await page.textContent('body')).toBe(
      'google.com, pub-6935382283176616, DIRECT, f08c47fec0942fa0',
    );
  });
});
