import { Trans } from 'react-i18next';
import { AuthFbButton } from './auth-fb-button';
import { assetsPathTo } from '~/common/client-router/helpers';

interface Props {
  text: string;
}

export const AuthModalTopText = ({ text }: Props) => {
  return (
    <div className="text-center">
      <img
        src={assetsPathTo('/images/logo-wide.svg')}
        alt="Kyero"
        width={120}
        height={32}
        className="mx-auto"
      />
      <h3 className="text-h-4-sm text-tile-100 md:text-h-4 my-4 mb-2 font-bold">{text}</h3>
      <AuthFbButton />
      <p
        className={`z-1 text-sierra-night-40 relative my-4 flex items-center justify-center bg-white`}
      >
        <span className="bg-sierra-night-40 absolute left-0 h-[1px] w-full" />
        <span className="z-1 block bg-white p-2 px-4">
          <Trans i18nKey="common.auth.common.or_email" />
        </span>
      </p>
    </div>
  );
};
