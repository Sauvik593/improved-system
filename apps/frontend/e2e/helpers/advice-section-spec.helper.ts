import { expect, type Page } from '@playwright/test';

import { type Guide } from '~/modules/homepage/api/get-guides.server';
import { type GuidesTranslation } from '~/modules/homepage/api/guides-seeds';

export const testGuidesSection = async (
  page: Page,
  guideTranslations: GuidesTranslation,
  locale: string,
) => {
  const guides = guideTranslations[locale as keyof typeof guideTranslations];

  if (guides.length > 0) {
    await guidesSectionShouldBeVisible(page, guides);
  } else {
    await guidesSectionShouldHaveFallback(page);
  }
};

export const guidesSectionShouldBeVisible = async (page: Page, guides: Guide[]) => {
  const guidesSection = await page.getByTestId('homepage.section-guides');
  const guidesFallback = await page.getByTestId('homepage.section-guides-fallback');

  const guidesArticles = await guidesSection.getByTestId('guide-card.article');
  const guidesLocations = await guidesSection.getByTestId('guide-card.location');

  await expect(guidesSection).toBeVisible();
  await expect(guidesFallback).toBeHidden();

  const articles = guides.filter((guide) => guide.type === 'article');
  const locations = guides.filter((guide) => guide.type === 'location');

  await expect(await guidesArticles.count()).toEqual(articles.length);
  await expect(await guidesLocations.count()).toEqual(locations.length);
};

export const guidesSectionShouldHaveFallback = async (page: Page) => {
  const guidesSection = await page.getByTestId('homepage.section-guides');
  const guidesFallback = await page.getByTestId('homepage.section-guides-fallback');

  await expect(guidesSection).toBeHidden();
  await expect(guidesFallback).toBeVisible();
};
