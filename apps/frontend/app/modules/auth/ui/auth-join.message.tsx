import { twMerge } from 'tailwind-merge';
import { Button } from '@kyero/ui';
import { Trans, useTranslation } from 'react-i18next';

interface Props {
  onOpenSignup: () => void;
  className?: string;
}

export const AuthJoinMessage = ({ onOpenSignup, className = '' }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={twMerge('text-sierra-night-100 text-center', className)}>
      <p className="text-p-2">
        <Trans i18nKey="common.auth.login.aside.title" />
      </p>
      <h4 className="text-h-5 text- font-bold">
        <Trans i18nKey="common.auth.login.aside.subtitle" />
      </h4>
      <p className="text-p-2">
        <Trans i18nKey="common.auth.login.aside.copy" />
      </p>
      <Button
        message={t('common.auth.login.aside.cta') as string}
        variant="outline"
        type="button"
        buttonType="blue"
        fullWidth
        className="mt-4"
        onClick={onOpenSignup}
      />
    </div>
  );
};
