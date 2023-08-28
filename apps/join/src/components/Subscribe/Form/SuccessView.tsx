import NextImage from 'next/image';
import { useTranslation } from 'next-i18next';

import { getAssetsUrl } from '@helpers/assetsUrl';

export const SuccessView = ({ email }: { email: string }) => {
  const { t } = useTranslation('common');
  return (
    <div className="mx-auto px-4 text-center lg:px-0" data-testid="success-view">
      <NextImage
        src={getAssetsUrl('/images/newsletter/newsletter-success.png')}
        width={110}
        height={80}
        alt={t('general.icons.success')}
      />
      <h3 className="text-h-4-sm lg:text-h-4 py-2 font-bold">
        {t('newsletter.success.property_alerts', { email })}
      </h3>
      <p>{t('newsletter.success.weekly_email')}</p>
      <p>{t('newsletter.success.first_email')}</p>
    </div>
  );
};
