import { useTranslation } from 'react-i18next';

import { OrderCartFooter } from './order-cart-footer';

interface Props {
  totalFormatted: string;
  totalCount: number;
  isCartEmpty: boolean;
}

export const OrderCart = ({ totalFormatted, totalCount, isCartEmpty }: Props) => {
  const { t } = useTranslation();

  return (
    <article className="md:pb-4">
      <div className="rounded-md bg-white">
        <div className="w-full rounded-b-md px-4 py-2">
          <p className="text-h-4 font-bold leading-tight text-sierra-night-100">
            {t('cart.card.title')}
          </p>
        </div>
        <div className="border-t border-sierra-night-10 p-4 pb-10">
          <p className="text-p-1">{t('cart.card.boosts', { boosts: totalCount })}</p>
        </div>
        <div className="flex items-center justify-between border-t border-sierra-night-10 p-4">
          <p className="text-p-2 text-sierra-night-60">{t('cart.card.vat')}</p>
          <div className="flex text-h-4 font-bold">
            <p className="text-tile-100">{t('cart.card.totalPrice')}</p>
            <p className="ml-1 text-ocean-100">{totalFormatted}</p>
          </div>
        </div>
        {isCartEmpty ? null : <OrderCartFooter />}
      </div>
    </article>
  );
};
