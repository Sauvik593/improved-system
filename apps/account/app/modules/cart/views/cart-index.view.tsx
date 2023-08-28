import { useTranslation } from 'react-i18next';
import { useLoaderData, Link, useLocation } from '@remix-run/react';
import { Alert, Pagination } from '@kyero/ui';

import { SectionHeader } from '~/components/base-layout/section-header';
import { OrderCart } from '~/modules/cart/components/order-cart';
import { CartLoader } from '~/modules/cart/cart-index.loader.server';

import { CartTable } from '../components/cart-table';

export const CartIndexView = () => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const {
    cart: { primeBoosts, pagination, totalFormatted },
  } = useLoaderData<CartLoader>();
  const isCartEmpty = primeBoosts.length === 0;

  return (
    <div className="relative overflow-hidden">
      <SectionHeader>
        <div className="mt-2">
          <Alert type="info" fullWidth>
            {t('cart.alert')}
          </Alert>
        </div>
      </SectionHeader>
      <div className="flex flex-col gap-6 xl:grid xl:grid-cols-[1fr,330px]">
        <div className="overflow-hidden rounded-t-xl">
          <CartTable primeBoosts={primeBoosts} isCartEmpty={isCartEmpty} />
        </div>
        <OrderCart
          totalCount={pagination.count}
          totalFormatted={totalFormatted}
          isCartEmpty={isCartEmpty}
        />
      </div>
      <Pagination
        {...pagination}
        pathname="/cart"
        totalPages={pagination.pages}
        search={search}
        LinkComponent={Link}
      />
    </div>
  );
};
