import { useTranslation } from 'react-i18next';
import {
  Pool,
  Gate,
  Parking,
  Views,
  Temperature,
  Golf,
  Furniture,
  Town,
  Outside,
  School,
} from '@kyero/icons';

const FEATURES = [
  {
    icon: <Pool />,
    title: 'properties.show.keyFeatures.pool',
  },
  {
    icon: <Gate />,
    title: 'properties.show.keyFeatures.gate',
  },
  {
    icon: <Parking />,
    title: 'properties.show.keyFeatures.parking',
  },
  {
    icon: <Views />,
    title: 'properties.show.keyFeatures.views',
  },
  {
    icon: <Temperature />,
    title: 'properties.show.keyFeatures.airConditioning',
  },
  {
    icon: <Golf />,
    title: 'properties.show.keyFeatures.golf',
  },
  {
    icon: <Furniture />,
    title: 'properties.show.keyFeatures.furnished',
  },
  {
    icon: <Town />,
    title: 'properties.show.keyFeatures.town',
  },
  {
    icon: <Outside />,
    title: 'properties.show.keyFeatures.gardens',
  },
  {
    icon: <School />,
    title: 'properties.show.keyFeatures.schools',
  },
];

export const FeaturesSection = () => {
  const { t } = useTranslation();
  return (
    <section className="border-t border-sierra-night-10 py-2">
      <p className="text-h-5 font-bold text-tile-100">{t('properties.show.keyFeatures.title')}</p>
      <ul className="mt-2 grid grid-cols-1 gap-2 pt-2 sm:grid-cols-2">
        {FEATURES.map((feature) => {
          return (
            <li className="font-bold text-tile-100" key={feature.title}>
              <span className="flex">
                <div>{feature.icon}</div>
                <p className="ml-2">{t(feature.title)}</p>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
