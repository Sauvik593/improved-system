import { useTranslation } from 'react-i18next';
import { SearchBox } from './search-box';

export const HomepageLayout = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-sierra-night-5 py-12">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-xl">
        <div className="bg-ocean-100 p-6 text-center text-white">
          <h1 className="text-h-2 font-semibold ">{t('common.homepage.meta.title.neutral')}</h1>
          <p>{t('common.homepage.spain.meta.description')}</p>
        </div>
        <SearchBox />
      </div>
    </section>
  );
};
