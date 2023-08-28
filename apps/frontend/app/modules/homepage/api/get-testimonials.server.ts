import { TESIMONIALS_SEED } from './testimonials-seeds';

export interface Testimonial {
  title: string;
  author: string;
  cite: string;
}

// this is the API that will be used to get the country regions
// now it's a mocked call, but it will be a real API call
export const getTestimonials = async (
  request: Request,
  locale: string,
  nationId: number,
): Promise<Testimonial[]> => {
  const testimonials = TESIMONIALS_SEED[locale as keyof typeof TESIMONIALS_SEED];

  if (!testimonials) {
    return [];
  }

  return Promise.resolve(testimonials);
};
