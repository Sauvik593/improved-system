import { useTranslation } from 'react-i18next';
import { Cart } from '@kyero/icons';

export const InCart = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center gap-2 text-p-3 font-bold">
      <Cart size={18} color="text-sierra-night-100" />
      <span>{t('ui.boostStatus.inCart.title')}</span>
    </div>
  );
};

InCart.displayName = 'InCart';
