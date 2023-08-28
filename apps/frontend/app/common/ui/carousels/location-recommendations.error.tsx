import { Button } from '@kyero/ui';
import { Trans, useTranslation } from 'react-i18next';
import { useAppContext } from '~/common/contexts/app.context';

export const Error = () => {
  const { t } = useTranslation();
  const { locale, country } = useAppContext();

  const route = country?.localizedForSaleRoutes?.[locale] || '/';

  return (
    <article
      className="shadow-home-card flex h-full w-full flex-col items-center gap-1 overflow-hidden rounded-md bg-white p-10 py-16"
      data-testid="location-recommendation.error"
    >
      <Trans
        className="test-sierra-night-100"
        i18nKey="common.homepage.recommended_locations.error.title"
        as="h3"
      />
      <Trans
        className="test-sierra-night-100"
        i18nKey="common.homepage.recommended_locations.error.message"
        as="p"
      />
      <Button
        variant="full"
        buttonType="blue"
        message={t('common.homepage.recommended_locations.error.cta')}
        linkProps={{ to: route }}
      />
    </article>
  );
};
