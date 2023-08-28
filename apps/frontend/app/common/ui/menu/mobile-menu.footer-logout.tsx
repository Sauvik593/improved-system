import { Logout } from '@kyero/icons';
import { Trans } from 'react-i18next';
import { useNavLinks } from '~/common/hooks/use-nav-links';

export const MobileMenuFooterLogout = () => {
  const { logout } = useNavLinks();
  return (
    <a
      className="bg-sierra-night-5 flex h-full w-full items-center justify-center gap-2 p-2 text-center md:px-0"
      data-testid="mobile-menu.footer-logout"
      href={logout}
    >
      <Logout className="text-ocean-100" />
      <span className="hover:text-ocean-100 focus:text-ocean-100 font-semibold">
        <Trans i18nKey="common.user_menu.links.logout" defaults="Logout" />
      </span>
    </a>
  );
};
