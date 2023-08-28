import { SPAIN, PORTUGAL, ITALY, FRANCE } from './faqs-seeds';

const FAQS_MAP = {
  55529: SPAIN,
  55731: PORTUGAL,
  55732: ITALY,
  55702: FRANCE,
};

export interface FAQ {
  title: string;
  content: string;
}

// this is the API that will be used to get the country regions
// now it's a mocked call, but it will be a real API call
export const getFAQs = async (
  request: Request,
  locale: string,
  nationId: number,
): Promise<FAQ[]> => {
  const faqs = FAQS_MAP[nationId as keyof typeof FAQS_MAP];

  if (!faqs) {
    throw new Error(`Nation ${nationId} not found in FAQS`);
  }

  return Promise.resolve(faqs[locale as keyof typeof faqs]);
};
