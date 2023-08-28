import NextImage from 'next/image';
import { useTranslation } from 'next-i18next';

import { Button } from '@kyero/ui';

export const ErrorView = ({ onRetry }: { onRetry: () => void }) => {
  const { t } = useTranslation('common');
  return (
    <div className="px-4" data-testid="error-view">
      <div className="flex flex-col items-center justify-center text-center">
        <NextImage
          src={'/images/newsletter/error.svg'}
          alt={t('general.icons.error')}
          width={110}
          height={80}
          objectFit="cover"
        />

        <p className="text-p-1-sm lg:text-p-1 pt-1">{t('newsletter.error.message')}</p>
        <Button
          onClick={onRetry}
          buttonType="orange"
          variant="full"
          className="mt-4 lg:ml-2 lg:mt-2"
          message={t('ui.buttons.try_again')}
        />
      </div>
    </div>
  );
};
