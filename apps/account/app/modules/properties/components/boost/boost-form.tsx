import { Form } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@kyero/ui';

import { BoostableLocations } from './boostable-locations';
import { BoostedLocations } from './boosted-locations';
import { UnavailableLocations } from './unavailable-locations';
import { useBoostData } from './use-boost-data';

import { type PropertyBoostSlots } from '~/modules/properties/types';

interface Props {
  slots: PropertyBoostSlots;
}

export const BoostForm = ({ slots }: Props) => {
  const { t } = useTranslation();
  const { boostableLocations, boostedLocations, notBoostableLocations } = useBoostData(slots);

  const hasBoostable = boostableLocations.length > 0;
  const hasBoosted = boostedLocations.length > 0;
  const hasUnavailableLocations = notBoostableLocations.length > 0;

  return (
    <Form method="post">
      {hasBoostable && <BoostableLocations locations={boostableLocations} />}
      {hasBoosted && <BoostedLocations locations={boostedLocations} />}
      {hasUnavailableLocations && <UnavailableLocations slots={notBoostableLocations} />}

      {hasBoostable && (
        <footer className="border-t-1 border-sierra-night-10 p-4">
          <section className="justify-end gap-2 py-2 md:flex">
            <Button buttonType="blue" variant="full" message={t('ui.boost.add')} type="submit" />
          </section>
        </footer>
      )}
    </Form>
  );
};
