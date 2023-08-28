import cn from 'classnames';
import { useTranslation } from 'react-i18next';

const INFO_CONFIG = [
  { value: '€2,325,000', title: 'properties.show.propertyInfo.price' },
  { value: '4', title: 'properties.show.propertyInfo.bedrooms' },
  { value: '4', title: 'properties.show.propertyInfo.bathrooms' },
  { value: '556', title: 'properties.show.propertyInfo.buildSize' },
  { value: '2,650m²', title: 'properties.show.propertyInfo.plotSize' },
];

export const PropertyInfo = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="pb-3 text-h-4 font-bold text-tile-100">
        {t('properties.show.propertyInfo.title')}
      </h2>
      <section className="border-t border-sierra-night-10 py-4">
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {INFO_CONFIG.map(({ value, title }, index) => (
            <li className={cn({ ['col-span-2 sm:col-auto']: index === 0 })} key={title}>
              <span className="text-h-5 font-bold text-tile-100">{value}</span>
              <p className="truncate">{t(title)}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
