import { json, LoaderFunction } from '@remix-run/node';

import { getPageTitle } from '@server/helpers';
import { fetchProperties, type PropertiesIndexDTO } from '@properties/api';

export type PropertiesLoader = PropertiesIndexDTO & { title: string };

const PAGE_TITLE = 'properties.title';

export const loader: LoaderFunction = async ({ request }) => {
  const [title, response] = await Promise.all([
    getPageTitle(request)(PAGE_TITLE),
    fetchProperties(request),
  ]);

  return json<PropertiesLoader>({ title, ...response });
};
