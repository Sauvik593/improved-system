import { BoostRocket } from '@kyero/icons';
import { useTranslation } from 'react-i18next';
import { CartRowAction } from './cart-row-action';

interface Props {
  name: string;
}

export const CartRowLocation = ({ name }: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      <p className="text-p-3 lg:text-h-6">{name}</p>
      <div className="flex gap-1">
        <BoostRocket className="my-auto text-sunshine-100" />
        <p className="text-h-6 font-bold">{t('ui.cart.monthlyBoost')}</p>
      </div>
    </div>
  );
};

CartRowAction.displayName = 'CartRowAction';
