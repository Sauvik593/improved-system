import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { Cart } from '@kyero/icons';

import type { Property } from '@properties/types';

export const InCart = (props: { property: Property }) => {
  const { t } = useTranslation();
  return (
    <Link
      to={`/properties/${props.property.id}/boost`}
      className="block rounded-md bg-sierra-night-5 hover:bg-sierra-night-10 focus:bg-sierra-night-10"
    >
      <div className="p-3 py-8">
        <div className="flex items-center justify-center gap-2 text-p-3 font-bold">
          <Cart color="text-sierra-night-100" size={20} />
          <span>{t('ui.boostStatus.inCart.title')}</span>
        </div>
      </div>
    </Link>
  );
};

InCart.displayName = 'InCart';
