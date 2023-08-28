import { LanguageSwitcherButton } from '../language-switcher/button';

import { type User } from '~/modules/auth/types';
import { MobileMenuFooterLogin } from './mobile-menu.footer-login';
import { MobileMenuFooterLogout } from './mobile-menu.footer-logout';

interface Props {
  user: User | null;
  onLogin: () => void;
}

export const MobileMenuFooter = ({ user, onLogin }: Props) => {
  return (
    <footer>
      <ul className="grid h-full grid-cols-2 gap-1 bg-white">
        <li>
          <LanguageSwitcherButton />
        </li>
        <li>{user ? <MobileMenuFooterLogout /> : <MobileMenuFooterLogin onLogin={onLogin} />}</li>
      </ul>
    </footer>
  );
};
