import React from 'react';
import cn from 'classnames';
import { PlanCard } from './PlanCard';
import { useTranslation } from 'next-i18next';
import { PlansSeed, type PlanKey } from './PlansSeed';

const tabPanelKeys: PlanKey[] = ['1_month', '3_months', '6_months', '1_year'];

interface Props {
  onClick: (option: PlanKey) => void;
  active: PlanKey;
  plansSeed: PlansSeed;
}

export const CardsLayout = ({ onClick, active, plansSeed }: Props) => {
  const { t } = useTranslation('common');
  return (
    <section className="-mt-64">
      <section className="mt-4 mb-10 flex items-center justify-center gap-4">
        <p className="text-h-5 font-bold text-white">{t('pricing.kyero_prime.show_prices')}</p>
        {tabPanelKeys.map((key) => (
          <button
            key={key}
            className={cn('rounded-full border-2 border-white px-3 py-2 font-bold', {
              ['text-sierra-night-100 bg-white']: active === key,
              ['bg-ocean-100 text-white']: active !== key,
            })}
            onClick={() => onClick(key as PlanKey)}
          >
            {t(`pricing.kyero_prime.filters.${key}`)}
          </button>
        ))}
      </section>
      <section className="grid grid-cols-3 gap-6 lg:gap-x-10 lg:gap-y-8">
        {plansSeed[active].map((plan) => (
          <PlanCard {...plan} key={`${plan.type}_${plan.primeListings}`} />
        ))}
      </section>
    </section>
  );
};
