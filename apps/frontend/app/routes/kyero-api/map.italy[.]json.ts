import { ITALY_MAP } from '~/modules/maps/italy.map.server';
import { EUROPE_MAP } from '~/modules/maps/europe.map.server';
import { AFRICA_MAP } from '~/modules/maps/africa.map.server';

import { json, type LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  return json(
    {
      country: ITALY_MAP,
      europe: EUROPE_MAP,
      africa: AFRICA_MAP,
      projectionConfig: {
        rotate: [-15, -42, 0],
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
