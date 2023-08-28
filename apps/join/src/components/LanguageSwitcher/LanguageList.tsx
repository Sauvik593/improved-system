import React, { useContext } from 'react';
import cn from 'classnames';

import NextImage from 'next/image';
import { useTranslation } from 'next-i18next';

import { LanguageContext } from '@contexts/LanguageContext';
import { LocaleImages } from '@components/common/HeaderImages';
import { useLanguageList } from '@hooks/useLanguageList';

export const LanguageList = () => {
  const { t } = useTranslation('common');
  const { locale } = useContext(LanguageContext);
  const links = useLanguageList();

  return (
    <ul
      role="listbox"
      className="lg:shadow-tooltip w-full bg-white lg:absolute lg:rounded-lg lg:p-2"
    >
      {links.map((link, index) => (
        <li key={index} className="w-full">
          <a
            href={link.url}
            className="text-sierra-night-60 hover:bg-sierra-night-10 focus:bg-sierra-night-10 inline-flex w-full items-center py-4 hover:rounded-md lg:px-4 lg:py-2"
          >
            <NextImage
              alt={t(`menu.language_switcher.${link.locale}.alt`)}
              src={LocaleImages[link.locale]}
              width={24}
              height={24}
            />
            <span
              className={cn('text-p-2 ml-2', {
                'text-sierra-night-100 font-bold': link.locale === locale,
              })}
            >
              {t(`menu.language_switcher.${link.locale}`)}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
};
