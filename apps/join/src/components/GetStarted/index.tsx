import React from 'react';

import NextImage from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { Button } from '@kyero/ui';
import { useInternalLinks } from '@hooks/useInternalLinks';
import Dashboard from '../../../public/static/get-started/dashboard.png';

export const GetStarted = () => {
  const { t } = useTranslation('common');
  const { pricingPath, contactPath } = useInternalLinks();
  return (
    <section
      className="bg-ocean-100 relative bg-[url('/new-join-assets/images/get-satrted-wave.svg')] bg-center bg-bottom bg-no-repeat sm:pt-16"
      style={{ backgroundSize: '100%' }}
    >
      <div className="bg-ocean-100 curved-top absolute left-0 right-0 top-[-80px] z-0 mx-auto h-20 w-full pt-16 lg:top-[-200px] lg:h-52" />
      <div className="container mx-auto overflow-hidden">
        <h2 className="text-h-2-sm md:text-h-2 mx-auto mb-4 w-2/3 text-center font-bold text-white md:w-full">
          {t('general.get_started.title')}
        </h2>
        <ul className="mb-10 block md:flex md:items-center md:justify-center lg:h-[60px] lg:overflow-hidden">
          <li className="text-h-5-sm lg:text-h-5 mb-5 md:mb-0 md:mr-5">
            <Link href={pricingPath}>
              <Button
                buttonType="sunshine"
                variant="full"
                fullWidth
                size="big"
                message={t('ui.buttons.pricing_and_packages')}
                linkProps={{ to: pricingPath }}
              />
            </Link>
          </li>
          <li>
            <Link href={contactPath}>
              <Button
                className="text-white"
                buttonType="sunshine"
                variant="outline"
                fullWidth
                size="big"
                message={t('ui.buttons.call_back')}
                linkProps={{ to: contactPath }}
              />
            </Link>
          </li>
        </ul>
        <NextImage src={Dashboard} placeholder="blur" alt={t('general.properties_dashboard.alt')} />
      </div>
    </section>
  );
};
