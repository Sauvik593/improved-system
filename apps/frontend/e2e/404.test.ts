import { test, expect } from '@playwright/test';
import { SUPPORTED_LOCALES } from '~/i18n';

test.describe('404', () => {
  test('renders 404 page', async ({ page }) => {
    await page.goto('/non-existing-page');
    const pageComponent = await page.getByTestId('not-found-page');
    await expect(pageComponent).toBeVisible();
  });

  test('renders language switcher with links to root without country', async ({ page }) => {
    await page.goto('/non-existing-page');
    await page.click('[data-testid="menu.language-switcher"]');

    for (const locale of SUPPORTED_LOCALES) {
      const localeElement = page.getByTestId(`menu.language-switcher.${locale}`);
      if (locale === 'en') {
        await expect(localeElement).toHaveAttribute('data-active', 'true');
        await expect(localeElement).toHaveAttribute('href', `/`);
      } else {
        await expect(localeElement).toHaveAttribute('href', `/${locale}`);
        await expect(localeElement).toHaveAttribute('data-active', 'false');
      }
    }
  });

  test('translates the page for the correct language', async ({ page }) => {
    await page.goto('/es/non-existing-page');
    const languageSwitcherButton = await page.getByTestId('menu.language-switcher');

    await expect(await languageSwitcherButton.getByText('Español')).toBeVisible();
    await expect(await languageSwitcherButton.getByText('English')).toBeHidden();
  });
});
