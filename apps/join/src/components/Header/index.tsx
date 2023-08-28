import React, { useContext } from 'react';

import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import { CountryContext } from '@contexts/CountryContext';
import { useHeaderScroll } from '@hooks/useHeaderScroll';

import { Navbar } from './Navbar';
import { CountrySelectDropdown } from '@components/CountrySelectDropdown';
import { LanguageSwitcher } from '@components/LanguageSwitcher';

export const Header = () => {
  const { countries, country } = useContext(CountryContext);
  const { isAboveThreshold } = useHeaderScroll({ type: 'DESKTOP' });
  const active = isAboveThreshold;
  return (
    <header
      className={cn('sticky top-0 z-[99] hidden w-full overflow-hidden bg-white lg:block', {
        ['shadow-lg']: active,
      })}
    >
      <section className="container m-auto flex w-full items-center justify-between py-5">
        <Navbar country={country} />
        <nav className="hidden md:items-center lg:flex">
          <ul className="flex items-center gap-6">
            {!!country && (
              <li>
                <CountrySelectDropdown countries={countries} country={country} />
              </li>
            )}
            <li>
              <LanguageSwitcher countries={countries} />
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
};
