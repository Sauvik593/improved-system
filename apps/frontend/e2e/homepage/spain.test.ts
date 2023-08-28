import { AdminApiClient } from '@mocks-server/admin-api-client';

import { test, expect } from '@playwright/test';
import { agentSectionSpecHelper } from '..//helpers/agent-section-spec.helper';

import { SPAIN as SPAIN_AGENTS } from '~/modules/agents/featured-agents-data.server';
import { SPAIN as SPAIN_GUIDES } from '~/modules/homepage/api/guides-seeds';
import { COUNTRIES } from '~/modules/homepage/country-specific/helpers';

import { testGuidesSection } from 'e2e/helpers/advice-section-spec.helper';
import { testTestimonialSection } from 'e2e/helpers/testimonial-section-spec.helper';

const { SPAIN } = COUNTRIES;

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

test('has spain with correct elements', async ({ page }) => {
  await page.goto('/en');
  const pageComponent = await page.getByTestId('homepage.spain');
  expect(pageComponent).toBeVisible();

  await agentSectionSpecHelper(page, SPAIN_AGENTS);

  for (const locale of SPAIN.buyersGuideLanguages) {
    await page.goto(`/${locale}`);
    const buyersGuideForm = await page.getByTestId('buyers-guide-form');

    // show buyers guide for valid locales
    await expect(buyersGuideForm).toBeVisible();
  }

  await page.goto('/fi');
  const buyersGuideForm = await page.getByTestId('buyers-guide-form');
  // hide buyers guide for invalid locales
  await expect(buyersGuideForm).toBeHidden();
});

test('redirects to the root when locale is en and spain', async ({ page }) => {
  await page.goto('/en/spain');
  await page.waitForURL('/');
  const fullUrl = new URL(page.url());
  expect(fullUrl.pathname).toBe('/');
});

test.describe('locale based tests', async () => {
  Object.entries(SPAIN.translations).forEach(([locale, translation]) => {
    test(`in ${locale}`, async ({ page }) => {
      page.goto(`/${locale}/${translation}`);

      await testGuidesSection(page, SPAIN_GUIDES, locale);
      await testTestimonialSection(page, locale);
    });
  });
});
