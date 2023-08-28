import { useContext } from 'react';
import { useTranslation } from 'next-i18next';

import { LanguageContext } from '@contexts/LanguageContext';
import { PLANS_SEED, type PlansSeed, type PlanKey, type Plan } from '@components/Pricing/PlansSeed';

import { formattedPrice } from '@helpers/priceFormatter';

const filterPlans = (listings: string, duration: PlanKey, plansSeed: PlansSeed) => {
  const plans = plansSeed[duration];
  if (plans) {
    const filteredPlan = plans.find((plan) => plan.primeListings.toString() === listings);
    return filteredPlan;
  }

  return {
    cost: 200,
    costPerListing: 1,
    primeListings: 200,
    type: '1_month',
  };
};

export const YourPackage = ({ listings, duration }: { listings: string; duration: PlanKey }) => {
  const { t } = useTranslation('common');
  const { locale } = useContext(LanguageContext);

  const data = filterPlans(listings, duration, PLANS_SEED);
  const { primeListings, cost, costPerListing, type } = data as Plan;

  const formattedCost = formattedPrice({ locale, value: cost });
  const formattedCostPerListing = formattedPrice({
    locale: locale,
    value: costPerListing,
    decimal: 2,
  });

  return (
    <div className="w-100 text-tile-100 mx-auto mb-5 sm:mb-0 sm:w-80 sm:pl-6">
      <div className="rounded-lg bg-white">
        <div className="border-sierra-night-10 border-b p-4">
          <h3 className="text-h-4 mb-2 font-bold">{t('tell_us_about.package.title')}</h3>
          <p className="text-h-6 mb-1 font-bold">
            {t('tell_us_about.package.cost_per_listing', { cost: formattedCostPerListing })}
          </p>
          <p className="text-p-3 w-48">
            {t(`tell_us_about.package.plan.${type}`, { listings: primeListings })}
          </p>
        </div>
        <div className="p-4">
          <div className="flex justify-between">
            <p className="text-h-5 font-bold">{t('tell_us_about.package.total')}</p>
            <p className="text-h-5 font-bold">{formattedCost}</p>
          </div>
          <p className="text-p-3 pt-2">{t('tell_us_about.package.vat_disclaimer')}</p>
        </div>
      </div>
    </div>
  );
};
