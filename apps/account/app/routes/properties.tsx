import { type V2_MetaFunction } from '@remix-run/node';

import { loader, PropertiesLoader } from '@properties/properties-index.loader.server';
import { PropertiesIndexView } from '@properties/views/properties-index.view';

export const meta: V2_MetaFunction = ({ data }: { data: PropertiesLoader }) => [
  {
    title: data.title,
  },
];

export { loader };

export default PropertiesIndexView;
