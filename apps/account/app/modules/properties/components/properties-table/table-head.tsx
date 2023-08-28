import { useTranslation } from 'react-i18next';

export const TableHead = () => {
  const { t } = useTranslation();

  return (
    <thead className="hidden lg:table-header-group">
      <tr className="bg-sierra-night-20">
        <th className="w-[100px] px-4 py-3 text-center">{t('properties.list.columns.prime')}</th>
        <th className="px-4 py-3 text-left">{t('properties.list.columns.info')}</th>
        <th className="hidden w-[120px] px-4 py-3 text-left xl:table-cell">
          {t('properties.list.columns.createdAt')}
        </th>
        <th className="hidden w-[100px] px-4 py-3 text-left xl:table-cell ">
          {t('properties.list.columns.views')}
        </th>
        <th className="hidden w-[100px] px-4 py-3 text-left xl:table-cell ">
          {t('properties.list.columns.enquiries')}
        </th>
        <th className="w-[200px] px-4 py-3 text-left">
          {t('properties.list.columns.boostStatus')}
        </th>
      </tr>
    </thead>
  );
};
