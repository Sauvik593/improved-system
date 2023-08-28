import { GeneralConfig, SeoConfig } from '@lib/types';
import get from 'lodash/get';

const DEFAULT_SEO_CONFIG: Partial<SeoConfig> = { preventIndexing: false };

const regexp = /<[^>]+>/g;

const stripHTML = (text: string) => {
  return text.replace(regexp, '');
};

export const useSeoConfig = ({
  title,
  description,
  generalConfig,
  seoConfig,
}: {
  generalConfig: GeneralConfig;
  seoConfig: SeoConfig | null;
  title?: string;
  description?: string | null;
}) => {
  const seo = seoConfig || DEFAULT_SEO_CONFIG;
  const PREVENT_INDEXING = seo.preventIndexing;

  const robotsIndexContent = PREVENT_INDEXING ? 'noindex' : 'index';
  const builtTitle = `${seo.title || title} - ${generalConfig.siteName}.com`;
  const descriptionTag = seo.description || description;
  const strippedDescription = descriptionTag && stripHTML(descriptionTag as string);

  const KYERO_SOCIAL_IMAGE =
    'https://d2hhh2ewuz3i8z.cloudfront.net/fit/1200x628/https://www.kyero.com/packs/media/images/social_cards/facebook_social_image-33ab69de89daa397bbefb9299d02b11a.jpg';
  const SEO_IMAGE = get(seo, 'facebook.img.url', KYERO_SOCIAL_IMAGE);

  return {
    seo,
    robotsIndexContent,
    builtTitle,
    descriptionTag,
    KYERO_SOCIAL_IMAGE,
    SEO_IMAGE,
    strippedDescription,
  };
};
