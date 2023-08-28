import { useTranslation } from 'react-i18next';
import { PopularityBadge } from '../popularity-badge';

import { type PrimeBoostSlotLocation } from '~/modules/properties/types';
interface Props {
  location: PrimeBoostSlotLocation;
  priceFormatted: string;
}

export const UnavailableLocation = ({ location, priceFormatted }: Props) => {
  const { t } = useTranslation();
  return (
    <div
      key={location.id}
      className="flex items-center justify-between rounded-md bg-sierra-night-5 p-4"
    >
      <article className="relative flex w-full">
        <header className=" flex w-full flex-col gap-1">
          <p className="text-p-2 text-sierra-night-100">
            {location.name} {location.type}
          </p>
          <p className="text-sierra-night-60">
            {t('primeBoosts.priceForMonth', { priceFormatted })}
          </p>
        </header>
        <div className="ml-auto md:absolute md:right-0 md:top-0">
          <PopularityBadge popularity={location.popularity} />
        </div>
      </article>
    </div>
  );
};
