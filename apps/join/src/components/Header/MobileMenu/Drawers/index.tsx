import React, { useState, useEffect, useContext } from 'react';

import NextImage from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { Button } from '@kyero/ui';

import { Close } from '@kyero/icons';
import { LanguageContext } from '@contexts/LanguageContext';
import { CountryContext } from '@contexts/CountryContext';
import { Globe } from '@images/icons/Globe';

import { NavLinks } from '../../NavLinks';
import { DrawerContainer } from './DrawerContainer';
import { LanguageDrawer } from './LanguageDrawer';
import { CountryDrawer } from './CountryDrawer';
import { CountryLinks } from '../CountryLinks';
import { CountryImages } from '@components/common/HeaderImages';

import { useInternalLinks } from '@hooks/useInternalLinks';

export interface Props {
  isActive: boolean;
  onClose: () => void;
  openElement: string | undefined;
}

export const Drawer: React.FunctionComponent<Props> = (props) => {
  const { t } = useTranslation('common');
  const { locale } = useContext(LanguageContext);
  const { country } = useContext(CountryContext);
  const countryTranslationKey = country?.translation_key;

  const { pricingPath, contactPath } = useInternalLinks();

  const [activeNav, setActiveNav] = useState(false);
  const [activeCountryList, setActiveCountryList] = useState(false);

  const { events } = useRouter();

  const openNav = (): void => {
    setActiveNav(true);
  };

  const closeNav = (): void => {
    setActiveNav(false);
  };

  const openCountryList = (): void => {
    setActiveCountryList(true);
  };

  const closeCountryList = (): void => {
    setActiveCountryList(false);
  };

  useEffect(() => {
    const handleClose = () => {
      props.onClose();
      setActiveCountryList(false);
    };
    events.on('routeChangeStart', handleClose);
    return () => {
      events.off('routeChangeStart', handleClose);
    };
  }, [props, events]);

  return (
    <DrawerContainer
      isActive={props.isActive}
      theme="white"
      direction="right"
      headerVariant="multi"
      headerButton={
        <>
          <button
            onClick={props.onClose}
            className="absolute right-0 mr-2 h-[30px] w-[30px] py-2"
            data-testid="drawer-right-button"
            aria-label={t('header.menu.close.label')}
          >
            <Close ariaHidden />
          </button>
        </>
      }
    >
      <div className="flex h-full w-full flex-col pt-12 pb-8">
        <div className="flex h-full flex-col">{country ? <NavLinks /> : <CountryLinks />}</div>
        <ul className="block px-5 md:flex md:items-center lg:h-[60px] lg:overflow-hidden">
          <li className="mb-5 md:mb-0 md:mr-5">
            <Link href={pricingPath}>
              <Button
                buttonType="blue"
                variant="full"
                fullWidth
                message={t('ui.buttons.pricing_and_packages')}
                linkProps={{ to: pricingPath }}
              />
            </Link>
          </li>
          <li>
            <Link href={contactPath}>
              <Button
                buttonType="blue"
                variant="outline"
                fullWidth
                message={t('ui.buttons.get_in_touch')}
                linkProps={{ to: contactPath }}
              />
            </Link>
          </li>
        </ul>
        <ul className="border-sierra-night-10 mt-3 border-t border-solid pt-2">
          <li className="px-5 py-2">
            <button
              onClick={openNav}
              className="flex h-full items-center gap-2 font-bold"
              aria-label={t('menu.language_switcher.label')}
            >
              <Globe />
              <span className="text-h-5-sm text-sierra-night-100">
                {t(`menu.language_switcher.${locale}`)}
              </span>
            </button>
          </li>
          {country && (
            <li className="px-5 py-2">
              <button
                onClick={openCountryList}
                className="flex h-full items-center gap-2 font-bold"
                aria-label={t('menu.country_select.label')}
              >
                <NextImage
                  src={CountryImages[countryTranslationKey as string]}
                  width={24}
                  height={24}
                  alt={t(`general.countries.${countryTranslationKey}.alt`)}
                />
                <span className="text-h-5-sm text-sierra-night-100">
                  {t(`general.countries.${countryTranslationKey}.title`)}
                </span>
              </button>
            </li>
          )}
        </ul>
      </div>
      {country && <CountryDrawer isActive={activeCountryList} onClose={closeCountryList} />}
      <LanguageDrawer isActive={activeNav} onClose={closeNav} />
    </DrawerContainer>
  );
};
