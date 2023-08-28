import { useTranslation } from 'react-i18next';
import { Alert } from '@kyero/ui';

export const PhotoGrid = () => {
  const { t } = useTranslation();
  return (
    <section className="-mx-4 mb-6 bg-white p-4 md:mx-0 md:rounded-md">
      <h2 className="pb-3 text-h-4 font-bold text-tile-100">
        {t('properties.show.photos', { photos: '6' })}
      </h2>
      <section className="border-t border-sierra-night-10">
        <div className="py-4">
          <Alert type="info" fullWidth>
            <p>{t('properties.show.photosAlert')}</p>
          </Alert>
        </div>
        <div>
          <ul className="md:grid-rows-auto grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 6 }).map((_, index) => {
              return (
                <li key={index} className="mx-auto">
                  <img src="https://loremflickr.com/177/122/city" className="rounded-md" />
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </section>
  );
};
