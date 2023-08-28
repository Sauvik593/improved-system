import React from 'react';

import { useTranslation } from 'next-i18next';
import {
  ArrowUp,
  Tick,
  Email,
  Camera,
  Star,
  WavyArrow,
  List,
  ShareIcon,
  Photo,
  VirtualTour,
  Floorplans,
  Imports,
  RemoteViewing,
  Eye,
} from '@kyero/icons';

const Content = [
  {
    id: 1,
    figure: <ArrowUp />,
    heading: 'features.features_list.priority_results.title',
    description: 'features.features_list.priority_results.subtitle',
  },
  {
    id: 2,
    figure: <Tick />,
    heading: 'features.features_list.recommended_properties.title',
    description: 'features.features_list.recommended_properties.subtitle',
  },
  {
    id: 3,
    figure: <Email />,
    heading: 'features.features_list.email_alerts.title',
    description: 'features.features_list.email_alerts.subtitle',
  },
  {
    id: 4,
    figure: <Photo />,
    heading: 'features.features_list.bigger_photos.title',
    description: 'features.features_list.bigger_photos.subtitle',
  },
  {
    id: 5,
    figure: <Star />,
    heading: 'features.features_list.agent_branding.title',
    description: 'features.features_list.agent_branding.subtitle',
  },
  {
    id: 6,
    figure: <List />,
    heading: 'features.features_list.agent_directory.title',
    description: 'features.features_list.agent_directory.subtitle',
  },
  {
    id: 7,
    figure: <WavyArrow />,
    heading: 'features.features_list.enhanced_analytics.title',
    description: 'features.features_list.enhanced_analytics.subtitle',
  },
  {
    id: 8,
    figure: <ShareIcon className="text-sierra-night-100 h-7 w-7" />,
    heading: 'features.features_list.full_export.title',
    description: 'features.features_list.full_export.subtitle',
  },
  {
    id: 9,
    figure: <VirtualTour />,
    heading: 'features.features_list.virtual_tours.title',
    description: 'features.features_list.virtual_tours.subtitle',
  },
  {
    id: 10,
    figure: <Camera />,
    heading: 'features.features_list.property_videos.title',
    description: 'features.features_list.property_videos.subtitle',
  },
  {
    id: 11,
    figure: <Floorplans />,
    heading: 'features.features_list.floorplans.title',
    description: 'features.features_list.floorplans.subtitle',
  },
  {
    id: 12,
    figure: <RemoteViewing />,
    heading: 'features.features_list.remote_viewing.title',
    description: 'features.features_list.remote_viewing.subtitle',
  },
  {
    id: 13,
    figure: <Imports />,
    heading: 'features.features_list.daily_imports.title',
    description: 'features.features_list.daily_imports.subtitle',
  },
  {
    id: 14,
    figure: <Eye className="h-7 w-7" />,
    heading: 'features.features_list.media_visibility.title',
    description: 'features.features_list.media_visibility.subtitle',
  },
];

export const FeaturesList = () => {
  const { t } = useTranslation('common');
  return (
    <section>
      <ul className="gap-8 md:grid lg:grid-cols-2">
        {Content.map((data, index) => (
          <li key={index} className="mb-5 md:mb-0">
            <div className="flex h-40 w-full items-center gap-6 rounded-lg bg-white py-7 px-5 md:h-32">
              <figure className="bg-sunshine-100 flex h-16 w-16 flex-[0_0_64px] items-center justify-center rounded-full">
                {data.figure}
              </figure>
              <article className="w-4/5">
                <h3 className="text-sierra-night-100 text-h-4-sm md:text-h-4 py-1 font-bold">
                  {t(data.heading)}
                </h3>
                <p className="text-sierra-night-100 md:text-p-2 text-p-3">{t(data.description)}</p>
              </article>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
