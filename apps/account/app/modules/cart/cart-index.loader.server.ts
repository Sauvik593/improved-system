import { json, LoaderFunction } from '@remix-run/node';

import { getPageTitle } from '@server/helpers';
import { CartDTO, fetchCart } from '~/modules/cart/api';

export type CartLoader = { title: string; cart: CartDTO };

const PAGE_TITLE = 'cart.title';

export const loader: LoaderFunction = async ({ request }) => {
  const [title, cart] = await Promise.all([getPageTitle(request)(PAGE_TITLE), fetchCart(request)]);

  return json<CartLoader>({ title, cart });
};
