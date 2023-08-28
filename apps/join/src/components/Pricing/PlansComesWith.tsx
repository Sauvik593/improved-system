import React from 'react';

import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { Tick } from '@kyero/icons';
import { ArrowLink } from '@kyero/ui';
import { useInternalLinks } from '@hooks/useInternalLinks';

import type { PlanTile } from './PlansSeed';

export const PlansComesWith = ({ planTiles }: { planTiles: PlanTile[] }) => {
  const { t } = useTranslation('common');
  const { featuresPath, contactPath, integrationsPath } = useInternalLinks();
  const LINKS = {
    features: featuresPath,
    integrations: integrationsPath,
    contact: contactPath,
  };
  return (
    <div className="py-10">
      <h3 className="text-h-4 md:text-h-3 mb-7 font-bold md:text-center">
        {t('pricing.all_plans.title')}
      </h3>
      <div className="grid gap-8 lg:grid-cols-3">
        {planTiles.map((plan, index) => {
          const linkPath = LINKS[plan.path as keyof typeof LINKS];
          return (
            <article key={index} className="w-full rounded-lg bg-white py-3 px-8 lg:py-9">
              <Tick className="text-meadow-100 h-10 w-10" />
              <h4 className="text-h-4 text-sierra-night-100 mb-3 mt-2 font-bold">
                {t(plan.title)}
              </h4>
              <p className="text-sierra-night-100 line-clamp-4 mb-2">{t(plan.description)}</p>
              <Link href={linkPath}>
                <ArrowLink
                  message={t(plan.link)}
                  linkProps={{
                    to: linkPath,
                  }}
                  baseColorClassname="text-ocean-100"
                  activeClassName="hover:text-ocean-150 focus:text-ocean-150"
                />
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
};
