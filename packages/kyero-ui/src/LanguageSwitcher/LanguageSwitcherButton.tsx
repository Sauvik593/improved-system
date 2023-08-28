import cn from 'classnames';
import { Listbox } from '@headlessui/react';
import { Globe, ChevronDown } from '@kyero/icons';

import type { LanguageOption } from './LanguageSwitcher';

interface LanguageSwitcherButtonProps {
  currentLanguage: LanguageOption;
  open: boolean;
}

export const LanguageSwitcherButton = ({ currentLanguage, open }: LanguageSwitcherButtonProps) => (
  <Listbox.Button className="bg-ocean-100 inline-flex w-full gap-2 p-2 text-white md:min-w-[190px]">
    <div className="flex w-full gap-2">
      <Globe />
      <span>{currentLanguage.title}</span>
      <span
        className={cn('ml-auto transition-transform duration-200 ease-out', {
          'rotate-180': open,
        })}
      >
        <ChevronDown />
      </span>
    </div>
  </Listbox.Button>
);
