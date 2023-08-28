import cn from 'classnames';
import { Popover, Transition } from '@headlessui/react';
import { Globe } from '@kyero/icons';
import { Fragment } from 'react';

import { useAppContext } from '~/common/contexts/app.context';
import { LanguageSwitcherList } from './list';
import { TRANSLATIONS } from './constants';
import { Trans } from 'react-i18next';

export const LanguageSwitcherPopover = () => {
  const { locale } = useAppContext();
  const currentTranslation = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] as string;

  return (
    <Popover className="relative">
      <Popover.Button
        className="flex items-center gap-2 p-2 lg:px-0"
        data-testid="menu.language-switcher"
      >
        {({ open }) => (
          <>
            <Globe className="text-ocean-100" />
            <span
              className={cn(
                'hover:text-ocean-100 focus:text-ocean-100 hidden font-semibold lg:block',
                {
                  'text-ocean-100': open,
                },
              )}
            >
              {currentTranslation}
            </span>
          </>
        )}
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel
          className="absolute left-full z-10 mt-3 w-screen max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-lg"
          unmount={false}
        >
          <div className="shadow-home-card rounded-md bg-white p-4">
            <h3 className="text-h-5 text-tile-100 font-bold">
              <Trans i18nKey={'common.language_switcher.title'} />
            </h3>
            <LanguageSwitcherList />
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
