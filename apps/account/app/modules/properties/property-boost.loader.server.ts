import { json, LoaderFunction, Response as RemixResponse } from '@remix-run/node';

import { getPageTitle } from '@server/helpers';
import { fetchBoostPropertyData, type PropertyBoostDTO } from '@properties/api/boost';

export type PropertyboostLoader = { title: string; property: PropertyBoostDTO };

const PAGE_TITLE = 'properties.boost.title';

export const loader: LoaderFunction = async ({ request, params }) => {
  if (!params.id) {
    throw new RemixResponse('Error', { status: 400 });
  }

  const [title, response] = await Promise.all([
    getPageTitle(request)(PAGE_TITLE),
    fetchBoostPropertyData(request, params.id),
  ]);

  return json<PropertyboostLoader>({ title, property: response });
};
