import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Button } from '@kyero/ui';
import { Hamburger } from '@kyero/icons';

import { LanguageSwitcherPopover } from '../language-switcher/popover';
import { useModalsContext } from '../../contexts/modals.context';
import { MainMenuUserLogin } from './main-menu.user-login';
import { useAppContext } from '../../contexts/app.context';
import { MainMenuUserPopover } from './main-menu.user-popover';
import { InitialsCirle } from '../initials-circle';

import { useNavLinks } from '~/common/hooks/use-nav-links';
import { HomepageLogoLink } from '../homepage-logo-link';

export const MainMenu = () => {
  const { t } = useTranslation();
  const { openModal } = useModalsContext();
  const { user } = useAppContext();
  const { mainMenuLinks } = useNavLinks();
  const openSignup = () => openModal('auth-desktop', { type: 'signup' });
  const openLogin = () => openModal('auth-desktop', { type: 'login' });
  const openMobileMenu = () => openModal('mobile-menu');

  return (
    <header className="border-b-sierra-night-10 sticky top-0 left-0 z-10 mx-auto flex h-[65px] w-full items-center border-b-2 bg-white md:h-[72px]">
      <div className="mx-auto flex w-full max-w-[1176px] items-center p-4">
        <HomepageLogoLink />
        <nav className="md:gap-4lg:ml-16 flex-1 items-center gap-2 md:flex md:justify-end lg:justify-between">
          <ul className="hidden items-center gap-2 md:flex lg:ml-16">
            {mainMenuLinks.map(([label, link]) => {
              return (
                <li className="max-w-[90px]  lg:max-w-[120px]" key={label}>
                  <a
                    href={link}
                    title={label}
                    className="text-sierra-night-100 hover:bg-sierra-night-10 focus:bg-sierra-night-10 block truncate rounded-full p-2 px-3 font-bold transition-colors duration-100 ease-in-out"
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
          <ul className="flex items-center gap-2 md:gap-4 lg:ml-auto  lg:gap-6">
            <li className="hidden items-center md:flex">
              <LanguageSwitcherPopover />
            </li>
            <li className="hidden items-center font-semibold md:flex">
              {user ? (
                <MainMenuUserPopover user={user} />
              ) : (
                <MainMenuUserLogin onLogin={openLogin} />
              )}
            </li>
            <li className="ml-auto whitespace-nowrap lg:ml-0">
              {user ? (
                <InitialsCirle initials={user.initials} />
              ) : (
                <Button
                  buttonType="blue"
                  message={t('common.auth.signup_button')}
                  variant="full"
                  onClick={openSignup}
                  data-testid="desktop-menu.signup"
                />
              )}
            </li>
            <li className={cn('md:hidden')}>
              <button
                className="flex items-center justify-center p-1 md:hidden"
                aria-label={t('common.ui.open_menu') as string}
                data-testid="desktop-menu.open-mobile-menu"
                onClick={openMobileMenu}
              >
                <Hamburger className="text-ocean-100" ariaHidden />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
