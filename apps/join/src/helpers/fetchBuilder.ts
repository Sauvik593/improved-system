import { Env } from '@lib/env';
import { REQUEST_AUTH_SETTINGS } from '@lib/api/strapi/baseStrapiService';

export const fetchBuilder = async (link: string) => {
  return fetch(`${Env.strapiUrl}/api/${link}`, REQUEST_AUTH_SETTINGS);
};
