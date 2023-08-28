import { Listbox } from '@headlessui/react';

import { LanguageSwitcherButton } from './LanguageSwitcherButton';
import { LanguageSwitcherOption } from './LanguageSwitcherOption';

import type { LinkComponentProps } from '../types';

type LanguageLocale = string;

export interface LanguageOption {
  title: string;
  locale: LanguageLocale;
}

export interface LanguageSwitcherProps {
  languages: LanguageOption[];
  currentLocale: LanguageLocale;
  currentUrl: string;
  changeUrlPath: string;
  name?: string;
  LinkComponent: (props: LinkComponentProps) => React.ReactElement;
}

export const LanguageSwitcher = ({
  languages,
  currentLocale,
  currentUrl,
  LinkComponent,
  changeUrlPath,
  name = 'language',
}: LanguageSwitcherProps) => {
  const currentLanguageOption = languages.find(
    (language) => language.locale === currentLocale,
  ) as LanguageOption;

  return (
    <Listbox name={name} value={currentLanguageOption}>
      {({ open, value }) => (
        <>
          <LanguageSwitcherButton open={open} currentLanguage={value} />
          <Listbox.Options className="absolute mb-10 w-full bg-white md:min-w-[190px]">
            {languages.map((language) => (
              <LanguageSwitcherOption
                key={language.locale}
                language={language}
                currentLanguage={currentLanguageOption}
                LinkComponent={LinkComponent}
                currentUrl={currentUrl}
                changeUrlPath={changeUrlPath}
              />
            ))}
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
};
