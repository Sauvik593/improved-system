import cn from 'classnames';
import { Trans } from 'react-i18next';
import { assetsPathTo } from '~/common/client-router/helpers';

interface Props {
  className?: string;
}

export const AuthFbButton = ({ className }: Props) => {
  return (
    <a
      href="https://id.kyero.com/en/auth/facebook/localized_omniauth"
      className={cn(
        'bg-sierra-night-10 text-sierra-night-100 focus:bg-sierra-night-20 hover:bg-sierra-night-20 relative flex w-full items-center justify-center rounded-full p-2 px-8 font-bold',
        className,
      )}
      data-testid="auth-modal.facebook-button"
    >
      <img
        src={assetsPathTo(`/images/socials/facebook.svg`)}
        alt="Facebook"
        width={20}
        height={20}
        className="bg-sierra-night-10 absolute left-4 overflow-hidden rounded-full"
      />
      <Trans i18nKey="common.auth.oauth.facebook" />
    </a>
  );
};
