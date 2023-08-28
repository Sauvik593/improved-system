import { Close } from '@kyero/icons';
import { Button } from '@kyero/ui';
import { useModalsContext } from '~/common/contexts/modals.context';
import { useAppContext } from '~/common/contexts/app.context';
import { InitialsCirle } from '~/common/ui/initials-circle';
import { HomepageLogoLink } from '../homepage-logo-link';
import { useTranslation } from 'react-i18next';

interface Props {
  onClose: () => void;
}

export const MobileMenuHeader = ({ onClose }: Props) => {
  const { t } = useTranslation();
  const { openModal } = useModalsContext();
  const { user } = useAppContext();

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
                <Button
                  buttonType="blue"
                  message={t('common.auth.signup_button')}
                  variant="full"
                  onClick={() => openModal('auth-mobile', { type: 'signup' })}
                />
              )}
            </li>
            <li className="md:hidden">
              <button
                className="flex items-center justify-center p-1 md:hidden"
                aria-label={t('common.ui.close_menu') as string}
                onClick={onClose}
              >
                <Close className="text-ocean-100" ariaHidden />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
