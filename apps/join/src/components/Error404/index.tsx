import { getAssetsUrl } from '@helpers/assetsUrl';
import { useTranslation } from 'next-i18next';

export const Error404 = () => {
  const { t } = useTranslation('common');
  return (
    <section className="container mx-auto py-12 md:py-64 xl:py-72">
      <article className="lg:flex">
        <img
          src={getAssetsUrl('/static/404-image.svg')}
          alt="error"
          className="w-[93px] lg:w-[164px]"
        />
        <aside className="mt-6 lg:mt-0 lg:ml-6 lg:w-2/3">
          <h1 className="text-h-1-sm lg:text-h-1 text-tile-100 mb-4 font-semibold">
            {t('error_404.header')}
          </h1>
          <p className="text-p-1-sm lg:text-p-1">{t('error_404.message')}</p>
        </aside>
      </article>
    </section>
  );
};
