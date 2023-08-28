import { PORTUGAL_MAP } from '~/modules/maps/portugal.map.server';
import { EUROPE_MAP } from '~/modules/maps/europe.map.server';
import { AFRICA_MAP } from '~/modules/maps/africa.map.server';

import { json, type LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  return json(
    {
      country: PORTUGAL_MAP,
      europe: EUROPE_MAP,
      africa: AFRICA_MAP,
      projectionConfig: {
        rotate: [8, -39.5, 0],
        scale: 5600,
      },
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=36000',
      },
    },
  );
};
