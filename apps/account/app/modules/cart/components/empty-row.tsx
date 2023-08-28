import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

export const EmptyRow = () => {
  const { t } = useTranslation();
  return (
    <tr className="bg-white">
      <td className="w-full py-20 px-10" colSpan={4}>
        <div className="flex justify-center">
          <div className="text-center">
            <img
              src="/images/not-found.svg"
              width="82"
              height="162"
              alt="not found"
              className="m-auto mb-12 "
            />
            <h2 className="text-h-4 font-semibold">{t('cart.list.empty.title')}</h2>
            <p className="my-2">{t('cart.list.empty.message')}</p>
            <Link
              to="/properties"
              className="mt-4 block rounded-full bg-ocean-100 p-2 px-4 text-white hover:bg-ocean-150 focus:bg-ocean-150"
            >
              {t('cart.list.empty.cta')}
            </Link>
          </div>
        </div>
      </td>
    </tr>
  );
};
