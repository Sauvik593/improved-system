import { GUIDES_DATA } from './guides-seeds';

export interface GuideArticle {
  title: string;
  category: string;
  type: 'article';
  url: string;
  img: string;
  imgRetina?: string;
}

export interface GuideLocation {
  name: string;
  description: string;
  type: 'location';
  url: string;
  img: string;
  imgRetina?: string;
}

export type Guide = GuideArticle | GuideLocation;

export interface GuidesResponse {
  guides: Guide[];
  seeAllLink: string;
}

// this is the API that will be used to get the country regions
// now it's a mocked call, but it will be a real API call
export const getGuides = async (request: Request, locale: string, nationId: number) => {
  const guides = GUIDES_DATA[nationId as keyof typeof GUIDES_DATA];

  if (!guides) {
    throw new Error(`Nation ${nationId} not found in Guides`);
  }

  return Promise.resolve({
    seeAllLink: `/${locale}/advice`,
    guides: guides[locale as keyof typeof guides],
  });
};
