import React, { useContext } from 'react';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { Button } from '@kyero/ui';

import { useInternalLinks } from '@hooks/useInternalLinks';
import { useFooterLinks } from '@hooks/useFooterLinks';
import { CountryContext } from '@contexts/CountryContext';

interface Props {
  borderClassName?: string;
}

export const SiteLinks = ({ borderClassName }: Props) => {
  const { t } = useTranslation('common');
  const { country } = useContext(CountryContext);
  const { stickyFooterLinks } = useFooterLinks(t);
  const { pricingPath } = useInternalLinks();

  return (
    <nav className={`container mx-auto py-4 ${borderClassName}`}>
      <section className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <ul className="text-p-3 grid w-full grid-cols-3 gap-2 md:flex md:items-center md:gap-4">
          <li className=" text-sierra-night-80 col-span-3 w-full whitespace-nowrap font-bold md:w-auto">
            © Portal47 Ltd
          </li>
          {stickyFooterLinks.map((items, index) => (
            <li key={index}>
              <Link href={items.path}>
                <a className="text-sierra-night-100 block max-w-[100px] truncate hover:text-orange-100 focus:text-orange-100 lg:max-w-none lg:max-w-[200px]">
                  {items.key}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        {country && (
          <Link href={pricingPath}>
            <Button
              className="hidden md:block md:w-auto md:whitespace-nowrap"
              buttonType="blue"
              variant="full"
              message={t('ui.buttons.pricing_and_packages')}
              linkProps={{
                to: pricingPath,
              }}
            />
          </Link>
        )}
      </section>
    </nav>
  );
};
