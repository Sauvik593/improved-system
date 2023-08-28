import React, { useContext } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { formattedPrice } from '@helpers/priceFormatter';

import { Button } from '@kyero/ui';
import { LanguageContext } from '@contexts/LanguageContext';
import { CountryContext } from '@contexts/CountryContext';
import { LocalizationsLinksContext } from '@contexts/LocalizationsLinksContext';
import { createRelativeJoinPath } from '@helpers/links';

interface Props {
  variant: string;
  primeListings: number;
  cost: number;
  costPerListing: number;
  type: string;
}

export const PlanCard = ({ cost, primeListings, variant, type, costPerListing }: Props) => {
  const { t } = useTranslation('common');
  const { locale } = useContext(LanguageContext);
  const { country } = useContext(CountryContext);
  const links = useContext(LocalizationsLinksContext);
  const buttonUrl = createRelativeJoinPath({
    locale,
    country,
    paths: [
      `${[
        links['tell-us-about'][locale as keyof typeof links['tell-us-about']],
      ]}?listings=${primeListings}&duration=${type}`,
    ],
  });

  const formattedCost = formattedPrice({ locale, value: cost });
  const formattedCostPerListing = formattedPrice({
    locale: locale,
    value: costPerListing,
    decimal: 2,
  });

  const classes = cn('rounded-lg bg-white min-h-[320px] lg:min-h-[300px]', {
    ['relative overflow-hidden']: variant === 'recommended',
  });
  const bgClasses = cn('curved-bottom rounded-lg px-7 pt-9 pb-7 text-center lg:min-h-[148px]', {
    ['bg-sky-100']: variant === 'recommended',
    ['bg-sierra-night-10']: variant !== 'recommended',
  });
  return (
    <article className={classes}>
      <div className={bgClasses}>
        <h3 className="text-h-4-sm lg:text-h-4 mb-2 font-bold">
          {t('pricing.kyero_prime.plans.prime_listings', { listings: primeListings })}
        </h3>
        <p className="text-p-2 mx-auto text-center">
          {t(`pricing.kyero_prime.plans.cost_per_listing`, { cost: formattedCostPerListing })}
        </p>
      </div>
      <div className="p-7 text-center">
        <h6 className="text-h-4 lg:text-h-2-sm font-bold">
          {t(`pricing.kyero_prime.plans.cost.${type}`, { cost: formattedCost })}
        </h6>
        <p className="text-p-2 mb-4">{t(`pricing.kyero_prime.plans.billing.${type}`)}</p>
        <div className="text-h-5-sm lg:text-h-5">
          <Link href={buttonUrl}>
            <Button
              buttonType="blue"
              variant="outline"
              size="big"
              fullWidth
              message={t('pricing.kyero_prime.plans.cta.title')}
              linkProps={{
                to: buttonUrl,
              }}
            />
          </Link>
        </div>
      </div>
      {variant === 'recommended' && (
        <span className="text-p-3 text-sierra-night100 bg-sunshine-100 absolute top-0 mx-auto flex h-6 w-full items-center justify-center font-bold">
          {t('pricing.kyero_prime.plans.most_popular')}
        </span>
      )}
    </article>
  );
};
