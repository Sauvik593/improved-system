import { useTranslation } from 'react-i18next';
import { Link } from '@remix-run/react';
import { BoostRocket } from '@kyero/icons';

import { getBoostedSlotsCount } from '~/modules/properties/components/helpers';
import type { Property } from '@properties/types';

export const Boosted = (props: { property: Property }) => {
  const { t } = useTranslation();
  const count = getBoostedSlotsCount(props.property);
  return (
    <Link
      to={`/properties/${props.property.id}/boost`}
      className="block rounded-md bg-sierra-night-5 hover:bg-sierra-night-10 focus:bg-sierra-night-10"
    >
      <div className="p-3 py-8">
        <div className="flex items-center justify-center gap-2 text-p-3 font-bold">
          <BoostRocket className="h-6 w-6 text-orange-100" />
          <span>{t('ui.boostStatus.boosted.title')}!</span>
          <span className="rounded-full bg-orange-100 px-2 text-white">{count}/3</span>
        </div>
      </div>
    </Link>
  );
};

Boosted.displayName = 'Boosted';
