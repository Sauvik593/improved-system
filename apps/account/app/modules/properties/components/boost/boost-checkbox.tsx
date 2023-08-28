import { ReactNode } from 'react';
import { Checkbox } from '@kyero/ui';
import { useTranslation } from 'react-i18next';

import { type PrimeBoostSlotLocation } from '~/modules/properties/types';
interface Props {
  location: PrimeBoostSlotLocation;
  priceFormatted: string;
  readonly?: boolean;
  children?: ReactNode;
}

export const BoostCheckbox = ({ location, priceFormatted, readonly = false, children }: Props) => {
  const { t } = useTranslation();
  const locationType = location.type.toLowerCase();

  return (
    <Checkbox
      label={
        <div className="relative flex items-start justify-between">
          <div className="flex w-full flex-col gap-2 md:flex-row md:items-center">
            <p className="font-bold text-sierra-night-100">
              {location.name} {location.type}:
            </p>
            <p>{t('primeBoosts.priceForMonth', { priceFormatted })}</p>
          </div>
          <div className="ml-auto md:absolute md:right-0">{children}</div>
        </div>
      }
      defaultChecked={readonly}
      disabled={readonly}
      theme="wide"
      name={`prime_boosts[${locationType}][location_id]`}
      value={location.id}
    />
  );
};

BoostCheckbox.displayName = 'BoostCheckbox';
