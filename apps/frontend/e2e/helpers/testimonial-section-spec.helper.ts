import { expect, type Page } from '@playwright/test';

import { TESIMONIALS_SEED } from '~/modules/homepage/api/testimonials-seeds';

export const testTestimonialSection = async (page: Page, locale: string) => {
  const localisedTestimonials = TESIMONIALS_SEED[locale as keyof typeof TESIMONIALS_SEED];

  const testimonialSection = await page.getByTestId('homepage.testimonials_section');

  // Check if section is visible
  await expect(testimonialSection).toBeVisible();

  // Check if section has correct number of testimonials
  const testimonials = await testimonialSection.getByTestId('testimonial');

  expect(localisedTestimonials).toHaveLength(3);
  expect(await testimonials.count()).toEqual(localisedTestimonials.length);

  localisedTestimonials.forEach(async (localisedTestimonial, index) => {
    const testimonial = testimonials.nth(index);

    const title = testimonial.getByTestId('testimonial.title');
    const cite = testimonial.getByTestId('testimonial.cite');
    const author = testimonial.getByTestId('testimonial.author');

    await expect(await title.textContent()).toEqual(localisedTestimonial.title);
    await expect(await cite.textContent()).toEqual(localisedTestimonial.cite);
    await expect(await author.textContent()).toEqual(localisedTestimonial.author);
  });
};
