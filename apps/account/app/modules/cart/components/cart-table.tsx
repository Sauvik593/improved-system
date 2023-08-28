import { useTranslation } from 'react-i18next';
import { CartRow } from './cart-row';
import { EmptyRow } from './empty-row';

import { type PrimeBoost } from '~/modules/properties';

interface Props {
  primeBoosts: PrimeBoost[];
  isCartEmpty: boolean;
}

export const CartTable = ({ primeBoosts, isCartEmpty }: Props) => {
  const { t } = useTranslation();
  const renderRows = () =>
    isCartEmpty ? (
      <EmptyRow />
    ) : (
      primeBoosts.map((primeBoost) => <CartRow key={primeBoost.id} primeBoost={primeBoost} />)
    );

  return (
    <table className="w-full table-fixed">
      <thead className="hidden lg:table-header-group">
        <tr className="bg-sierra-night-20">
          <th className="px-4 py-3 text-left">{t('cart.table.name')}</th>
          <th className="px-4 py-3 text-left lg:w-[200px]">{t('cart.table.location')}</th>
          <th className="px-4 py-3 text-left lg:w-[120px] xl:w-[150px]">{t('cart.table.price')}</th>
          <th className="px-4 py-3 text-left lg:w-[50px]" />
        </tr>
      </thead>
      <tbody className="flex flex-col gap-4 lg:table-row-group">{renderRows()}</tbody>
    </table>
  );
};

CartTable.displayName = 'CartTable';
