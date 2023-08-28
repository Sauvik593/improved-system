import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

export const EmptyRow = () => {
  const { t } = useTranslation();
  return (
    <tr className="flex bg-white lg:table-row">
      <td className="w-full px-20 py-40" colSpan={6}>
        <div className="flex justify-center">
          <div className="text-center">
            <img
              src="/images/not-found.svg"
              width="164"
              height="324"
              alt="not found"
              className="m-auto mb-12 "
            />
            <h2 className="text-h-3 font-semibold">{t('properties.list.empty.title')}</h2>
            <p className="my-2">{t('properties.list.empty.message')}</p>
            <Link
              to="/properties"
              className="mt-4 block rounded-full bg-ocean-100 p-2 px-4 text-white hover:bg-ocean-150 focus:bg-ocean-150"
            >
              {t('properties.list.empty.cta')}
            </Link>
          </div>
        </div>
      </td>
    </tr>
  );
};
