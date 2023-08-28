import { useTranslation } from 'react-i18next';
import { Alert } from '@kyero/ui';

export const PropertyDescription = () => {
  const { t } = useTranslation();
  return (
    <section className="border-t border-sierra-night-10">
      <div className="py-4">
        <h3 className="pb-3 text-h-5 font-bold text-tile-100">
          {t('properties.show.description')}
        </h3>
        <Alert type="info" fullWidth>
          <p>{t('properties.show.descriptionAlert')}</p>
        </Alert>
        <div className="pt-2 pb-3">
          <p className="pb-3">Contemporary andalusian villa in monte mayor.</p>
          <p>
            Monte Mayor Alto offers an exclusive gated community in a fantastic natural environment
            with beautiful surroundings and excellent sea views. It is just a 15 minute drive to
            the...
          </p>
        </div>
      </div>
    </section>
  );
};
