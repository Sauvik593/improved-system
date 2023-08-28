import { useTranslation } from 'react-i18next';

import { UnavailableLocation } from './unavailable-location';

import { type PrimeBoostSlot } from '~/modules/properties/types';

interface Props {
  slots: PrimeBoostSlot[];
}

export const UnavailableLocations = ({ slots }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="p-4">
      <h3 className="text-h-4-sm font-semibold text-sierra-night-100">
        {t('properties.boost.form.unavailable.title')}
      </h3>
      <p>{t('properties.boost.form.unavailable.description')}</p>
      <fieldset className="mt-4 flex flex-col gap-4">
        {slots.map(({ location, priceFormatted }: PrimeBoostSlot) => (
          <UnavailableLocation
            location={location}
            priceFormatted={priceFormatted}
            key={location.id}
          />
        ))}
      </fieldset>
    </div>
  );
};
