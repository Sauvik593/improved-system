import { AdminApiClient } from '@mocks-server/admin-api-client';
import { test, expect } from '@playwright/test';

import { agentSectionSpecHelper } from '../helpers/agent-section-spec.helper';
import { FRANCE as FRANCE_AGENTS } from '~/modules/agents/featured-agents-data.server';
import { FRANCE as FRANCE_GUIDES } from '~/modules/homepage/api/guides-seeds';
import { COUNTRIES } from '~/modules/homepage/country-specific/helpers';

import { testGuidesSection } from 'e2e/helpers/advice-section-spec.helper';
import { testTestimonialSection } from 'e2e/helpers/testimonial-section-spec.helper';

const apiClient = new AdminApiClient();
const { FRANCE } = COUNTRIES;

test.beforeAll(async () => {
  await apiClient.updateConfig({
    mock: {
      collections: {
        selected: 'homepage-france',
      },
    },
  });
});

test('has france page with valid components', async ({ page }) => {
  await page.goto('/en/france');
  const pageComponent = await page.getByTestId('homepage.france');
  await expect(pageComponent).toBeVisible();

  const buyersGuideForm = await page.getByTestId('buyers-guide-form');
  await expect(buyersGuideForm).toBeHidden();

  // Check if agent section is present
  await agentSectionSpecHelper(page, FRANCE_AGENTS);
});

test.describe('locale based tests', async () => {
  Object.entries(FRANCE.translations).forEach(([locale, translation]) => {
    test(`in ${locale}`, async ({ page }) => {
      page.goto(`/${locale}/${translation}`);

      await testGuidesSection(page, FRANCE_GUIDES, locale);
      await testTestimonialSection(page, locale);
    });
  });
});
