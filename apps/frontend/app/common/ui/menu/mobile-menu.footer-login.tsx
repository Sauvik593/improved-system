import { Account } from '@kyero/icons';
import { Trans } from 'react-i18next';

interface Props {
  onLogin: () => void;
}

export const MobileMenuFooterLogin = ({ onLogin }: Props) => (
  <button
    className="bg-sierra-night-5 flex h-full w-full items-center justify-center gap-2 p-2 text-center md:px-0"
    onClick={onLogin}
    data-testid="mobile-menu.footer-login"
  >
    <Account />
    <span className="hover:text-ocean-100 focus:text-ocean-100 font-semibold">
      <Trans i18nKey="common.auth.login_button" defaults="Login" />
    </span>
  </button>
);
