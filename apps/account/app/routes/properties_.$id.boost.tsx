import { V2_MetaFunction } from '@remix-run/node';

import { BoostView } from '@properties/views/properties-boost.view';

import { loader } from '@properties/property-boost.loader.server';
import { action } from '@properties/property-boost.action.server';

export const meta: V2_MetaFunction = ({ data }) => [
  {
    title: data['title'],
  },
];

export { loader, action };

export default BoostView;
