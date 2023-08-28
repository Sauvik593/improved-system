import NextImage from 'next/image';
import { useTranslation } from 'next-i18next';

import { Button } from '@kyero/ui';

export const ErrorView = ({ onRetry }: { onRetry: () => void }) => {
  const { t } = useTranslation('common');
  return (
    <section className="px-4">
      <div>
        <NextImage
          src={'/images/newsletter/error.svg'}
          alt={t('general.icons.error')}
          width={110}
          height={80}
          objectFit="cover"
        />
        <h3 className="text-h-4-sm lg:text-h-4 w-4/5">{t('insights_newsletter.error.title')}</h3>

        <p className="text-p-2-sm lg:text-p-2 pt-2">{t('newsletter.error.message')}</p>
        <Button
          onClick={onRetry}
          buttonType="sky"
          variant="full"
          fullWidth
          className="mt-6"
          message={t('ui.buttons.try_again')}
        />
      </div>
    </section>
  );
};
