import React from 'react';

import cn from 'classnames';

import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { MobileMenu } from '@components/Header/MobileMenu';

import { LanguageContext } from '@contexts/LanguageContext';
import { CountryContext } from '@contexts/CountryContext';

import { BaseLayoutProps as Props } from '@lib/types/general';

import { ContentUrlContext } from '@contexts/ContentUrlContext';
import { LocalizationContext } from '@contexts/LocalizationsContext';

import { Head } from '@components/Head';
import { CookieBar } from '@components/CookieModal/CookieBar';
import { NonEssentialScripts } from '@components/NonEssentialScripts';
import { CookieProvider } from '@contexts/CookieContext';
import { LocalizationsLinksProvider } from '@contexts/LocalizationsLinksContext';

export const BasePageLayout = ({
  title,
  seo,
  applicationSettings,
  description,
  className,
  locale,
  locales,
  country,
  countries,
  url,
  suffixPath,
  localizations,
  children,
}: Props) => {
  return (
    <>
      <main className={cn(className)}>
        <LanguageContext.Provider value={{ locale: locale, locales: locales }}>
          <CountryContext.Provider value={{ country: country, countries: countries }}>
            <ContentUrlContext.Provider value={{ url: url || '', suffixPath }}>
              <LocalizationContext.Provider value={{ localizations }}>
                <LocalizationsLinksProvider>
                  <CookieProvider>
                    <Head
                      title={title}
                      seoConfig={seo || null}
                      generalConfig={applicationSettings}
                      description={description}
                    />
                    <MobileMenu />
                    <Header />
                    {children}
                    <Footer />
                    <CookieBar />
                    <NonEssentialScripts />
                  </CookieProvider>
                </LocalizationsLinksProvider>
              </LocalizationContext.Provider>
            </ContentUrlContext.Provider>
          </CountryContext.Provider>
        </LanguageContext.Provider>
      </main>

      <svg
        height={0}
        width={0}
        viewBox="0 0 1440 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="curve" clipPathUnits="objectBoundingBox">
            <path d="M1,0 H0 V0.952 C0.041,0.98,0.496,1,1,0.919 V0" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};
