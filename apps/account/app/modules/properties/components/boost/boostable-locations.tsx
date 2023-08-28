import { useTranslation } from 'react-i18next';
import { useActionData } from '@remix-run/react';
import { Alert } from '@kyero/ui';

import { BoostCheckbox } from './boost-checkbox';

import { type PrimeBoostSlot } from '~/modules/properties/types';
import { PopularityBadge } from '../popularity-badge';

interface Props {
  locations: PrimeBoostSlot[];
}

export const BoostableLocations = ({ locations }: Props) => {
  const { t } = useTranslation();
  const data = useActionData();

  const primeBoostError = data?.fieldErrors?.prime_boosts;

  return (
    <div className="p-4">
      <h3 className="text-h-4-sm font-semibold text-sierra-night-100">
        {t('properties.boost.form.available')}
      </h3>
      <fieldset className="mt-4 flex flex-col gap-4">
        {primeBoostError && <Alert type="error">{primeBoostError}</Alert>}
        {locations.map(renderBoostCheckbox)}
      </fieldset>
    </div>
  );
};

const renderBoostCheckbox = ({ location, priceFormatted }: PrimeBoostSlot) => (
  <BoostCheckbox location={location} priceFormatted={priceFormatted} key={location.id}>
    <PopularityBadge popularity={location.popularity} />
  </BoostCheckbox>
);
