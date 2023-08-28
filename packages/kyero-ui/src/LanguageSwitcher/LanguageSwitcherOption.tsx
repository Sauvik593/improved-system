import cn from 'classnames';
import { Listbox } from '@headlessui/react';

import type { LinkComponentProps } from '../types';
import type { LanguageOption } from './LanguageSwitcher';

interface LanguageSwitcherOptionProps {
  language: LanguageOption;
  currentLanguage: LanguageOption;
  changeUrlPath: string;
  currentUrl: string;
  LinkComponent: (props: LinkComponentProps) => React.ReactElement;
}

export const buildChangeLocaleUrl = (changePath: string, locale: string, redirect: string) =>
  `${changePath}?locale=${locale}&redirect=${redirect}`;

const CLASSNAMES = {
  BASE: 'hover:bg-sierra-night-10 block w-full p-2 pl-10',
  ACTIVE: 'bg-ocean-100 hover:bg-ocean-150 text-white',
};

export const LanguageSwitcherOption = ({
  language: { locale, title },
  currentLanguage,
  changeUrlPath,
  currentUrl,
  LinkComponent,
}: LanguageSwitcherOptionProps) => {
  const url = buildChangeLocaleUrl(changeUrlPath, locale, currentUrl);
  const active = currentLanguage.locale === locale;

  return (
    <Listbox.Option value={locale} className="w-full">
      <LinkComponent to={url} className={cn(CLASSNAMES.BASE, { [CLASSNAMES.ACTIVE]: active })}>
        {title}
      </LinkComponent>
    </Listbox.Option>
  );
};
