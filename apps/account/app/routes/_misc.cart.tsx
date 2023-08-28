import { V2_MetaFunction } from '@remix-run/node';

import { loader, CartLoader } from '@cart/cart-index.loader.server';
import { action } from '@cart/cart-index.action.server';
import { CartIndexView } from '@cart/views/cart-index.view';

export const meta: V2_MetaFunction = ({ data }: { data: CartLoader }) => [
  {
    title: data.title,
  },
];

export { action, loader };

export default CartIndexView;
