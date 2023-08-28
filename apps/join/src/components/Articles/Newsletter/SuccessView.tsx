import NextImage from 'next/image';
import { useTranslation } from 'next-i18next';

import { getAssetsUrl } from '@helpers/assetsUrl';

export const SuccessView = ({ email }: { email: string }) => {
  const { t } = useTranslation('common');
  return (
    <div className="mx-auto px-4 lg:px-0" data-testid="success-view">
      <NextImage
        src={getAssetsUrl('/images/newsletter/newsletter-success.png')}
        width={110}
        className="text-center"
        height={80}
        alt={t('general.icons.success')}
      />
      <h3 className="text-h-4-sm lg:text-h-4 py-2">
        {t('newsletter.success.property_alerts', { email })}
      </h3>
      <p className="text-p-3-sm lg:text-p-2">{t('newsletter.success.weekly_email')}</p>
      <p className="text-p-3-sm lg:text-p-2">{t('newsletter.success.first_email')}</p>
    </div>
  );
};
