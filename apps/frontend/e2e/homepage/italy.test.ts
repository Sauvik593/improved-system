import { AdminApiClient } from '@mocks-server/admin-api-client';
import { test, expect } from '@playwright/test';

import { agentSectionSpecHelper } from '../helpers/agent-section-spec.helper';
import { ITALY as ITALY_AGENTS } from '~/modules/agents/featured-agents-data.server';
import { ITALY as ITALY_GUIDES } from '~/modules/homepage/api/guides-seeds';

import { COUNTRIES } from '~/modules/homepage/country-specific/helpers';
import { testGuidesSection } from '../helpers/advice-section-spec.helper';
import { testTestimonialSection } from 'e2e/helpers/testimonial-section-spec.helper';

const apiClient = new AdminApiClient();

test.beforeAll(async () => {
  await apiClient.updateConfig({
    mock: {
      collections: {
        selected: 'homepage-italy',
      },
    },
  });
});

const ITALY = COUNTRIES.ITALY;

test('has italy page', async ({ page }) => {
  await page.goto('/en/italy');
  const pageComponent = await page.getByTestId('homepage.italy');
  await expect(pageComponent).toBeVisible();

  const buyersGuideForm = await page.getByTestId('buyers-guide-form');
  await expect(buyersGuideForm).toBeHidden();

  // Check if agent section is present
  await agentSectionSpecHelper(page, ITALY_AGENTS);
});

test.describe('locale based tests', async () => {
  Object.entries(ITALY.translations).forEach(([locale, translation]) => {
    test(`in ${locale}`, async ({ page }) => {
      page.goto(`/${locale}/${translation}`);

      await testGuidesSection(page, ITALY_GUIDES, locale);
      await testTestimonialSection(page, locale);
    });
  });
});
