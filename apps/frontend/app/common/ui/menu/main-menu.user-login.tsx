import cn from 'classnames';
import { Account } from '@kyero/icons';
import { Trans } from 'react-i18next';

interface Props {
  onLogin: () => void;
}

export const MainMenuUserLogin = ({ onLogin }: Props) => {
  return (
    <button
      className="flex items-center gap-2 p-2 lg:px-0"
      onClick={onLogin}
      data-testid="desktop-menu.login"
    >
      <Account />
      <span
        className={cn('hover:text-ocean-100 focus:text-ocean-100 hidden font-semibold lg:block')}
      >
        <Trans i18nKey="common.auth.login_button" />
      </span>
    </button>
  );
};
