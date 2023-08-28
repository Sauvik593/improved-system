import { useTranslation } from 'react-i18next';

import { BoostCheckbox } from './boost-checkbox';

import { type PrimeBoostSlot } from '~/modules/properties/types';
import { SlotStatus } from './slot-status';

interface Props {
  locations: PrimeBoostSlot[];
}

export const BoostedLocations = ({ locations }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <header className="mb-3">
        <h3 className="mb-1 text-h-4-sm font-semibold text-sierra-night-100">
          {t('properties.boost.form.active.title')}
        </h3>
        <p>{t('properties.boost.form.active.description')}</p>
      </header>
      <fieldset className="mt-4 flex flex-col gap-4" disabled>
        {locations.map(renderBoostCheckbox)}
      </fieldset>
    </div>
  );
};

const renderBoostCheckbox = ({ location, priceFormatted, primeBoost }: PrimeBoostSlot) => (
  <BoostCheckbox location={location} priceFormatted={priceFormatted} key={location.id} readonly>
    {primeBoost && <SlotStatus status={primeBoost?.status} />}
  </BoostCheckbox>
);
