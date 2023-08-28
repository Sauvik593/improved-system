import { useTranslation } from 'next-i18next';

export const FooterAdvertise = () => {
  const { t } = useTranslation('common');
  return (
    <article className="w-full lg:max-w-[180px]">
      <div className="text-xl">
        <h5 className="text-h-4-sm mb-3 font-bold">{t('footer.for_agents.title')}</h5>
        <p className="text-h-5-sm mb-3 lg:w-[165px]">{t('footer.for_agents.description')}</p>
      </div>
    </article>
  );
};
