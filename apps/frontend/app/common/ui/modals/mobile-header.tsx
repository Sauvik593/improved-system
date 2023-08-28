import { Close } from '@kyero/icons';
import { Button } from '@kyero/ui';

import { type User } from '~/modules/auth/types';
import { InitialsCirle } from '../initials-circle';
import { HomepageLogoLink } from '../homepage-logo-link';
import { useTranslation } from 'react-i18next';

interface Props {
  onSignup: () => void;
  onClose: () => void;
  user: User | null;
}

export const MobileHeader = ({ onSignup, onClose, user }: Props) => {
  const { t } = useTranslation();

  return (
    <header className="p-4">
      <div className="mx-auto flex w-full max-w-[1176px] items-center">
        <HomepageLogoLink />
        <nav className="md:gap-4lg:ml-16 flex-1 items-center gap-2 md:flex md:justify-end lg:justify-between">
          <ul className="flex items-center gap-2 md:gap-4 lg:ml-auto  lg:gap-6">
            <li className="ml-auto whitespace-nowrap lg:ml-0">
              {user ? (
                <InitialsCirle initials={user.initials} />
              ) : (
                <Button buttonType="blue" message="Sign in" variant="full" onClick={onSignup} />
              )}
            </li>
            <li className="md:hidden">
              <button
                className="flex items-center justify-center p-1 md:hidden"
                aria-label={t('common.ui.close_menu') as string}
                onClick={onClose}
              >
                <Close className="text-ocean-100" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
