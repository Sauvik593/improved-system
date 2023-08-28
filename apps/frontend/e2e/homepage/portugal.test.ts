import { AdminApiClient } from '@mocks-server/admin-api-client';
import { test, expect } from '@playwright/test';
import { agentSectionSpecHelper } from '../helpers/agent-section-spec.helper';
import { PORTUGAL as PORTUGAL_AGENTS } from '~/modules/agents/featured-agents-data.server';
import { PORTUGAL as PORTUGAL_GUIDES } from '~/modules/homepage/api/guides-seeds';

import { testGuidesSection } from 'e2e/helpers/advice-section-spec.helper';

import { COUNTRIES } from '~/modules/homepage/country-specific/helpers';
import { testTestimonialSection } from 'e2e/helpers/testimonial-section-spec.helper';

const apiClient = new AdminApiClient();
const { PORTUGAL } = COUNTRIES;

test.beforeAll(async () => {
  await apiClient.updateConfig({
    mock: {
      collections: {
        selected: 'homepage-portugal',
      },
    },
  });
});

test('has portugal page', async ({ page }) => {
  await page.goto('/en/portugal');
  const pageComponent = await page.getByTestId('homepage.portugal');

  await expect(pageComponent).toBeVisible();

  const buyersGuideForm = await page.getByTestId('buyers-guide-form');
  await expect(buyersGuideForm).toBeHidden();

  await agentSectionSpecHelper(page, PORTUGAL_AGENTS);
});

test.describe('locale based tests', async () => {
  Object.entries(PORTUGAL.translations).forEach(([locale, translation]) => {
    test(`in ${locale}`, async ({ page }) => {
      page.goto(`/${locale}/${translation}`);

      await testGuidesSection(page, PORTUGAL_GUIDES, locale);
      await testTestimonialSection(page, locale);
    });
  });
});
