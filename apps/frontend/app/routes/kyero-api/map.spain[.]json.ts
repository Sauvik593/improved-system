import { SPAIN_MAP } from '~/modules/maps/spain.map.server';
import { EUROPE_MAP } from '~/modules/maps/europe.map.server';
import { AFRICA_MAP } from '~/modules/maps/africa.map.server';

import { json, type LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  return json(
    {
      country: SPAIN_MAP,
      europe: EUROPE_MAP,
      africa: AFRICA_MAP,
      projectionConfig: {
        rotate: [2.0, -40.0, 0],
        scale: 3200,
      },
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=36000',
      },
    },
  );
};
