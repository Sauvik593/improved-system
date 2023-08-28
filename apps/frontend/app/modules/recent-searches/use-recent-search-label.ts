import compact from 'lodash/compact';
import capitalize from 'lodash/capitalize';

import { usePriceRangeTranslationKey } from './use-recent-search-price-range';
import { type TFunction } from 'i18next';
import { type RecentSearch } from './helpers';

interface Props {
  t: TFunction;
  mainFeature: RecentSearch['mainFeature'];
  params: RecentSearch['params'];
  locale: string;
}

const KEYS_MAP = {
  paymentScheme: {
    0: 'common.recent_searches.payment_scheme.for_sale',
    1: 'common.recent_searches.payment_scheme.to_rent',
  },
  propertyGroup: {
    1: 'common.recent_searches.property_group.apartment',
    2: 'common.recent_searches.property_group.villa',
    3: 'common.recent_searches.property_group.town_house',
    4: 'common.recent_searches.property_group.country_house',
    5: 'common.recent_searches.property_group.land',
    6: 'common.recent_searches.property_group.cave_house',
    7: 'common.recent_searches.property_group.garage',
    8: 'common.recent_searches.property_group.commercial_property',
    9: 'common.recent_searches.property_group.wooden_home',
    unknown: 'common.recent_searches.property_group.unknown',
  },
};

export const useRecentSearchLabel = ({ t, params, mainFeature, locale }: Props) => {
  const paymentScheme = usePaymentScheme(params, t);
  const propertyGroupKey = usePropertyGroup(params);
  const { id, values } = usePriceRangeTranslationKey({
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    locale,
  });

  return compact([
    paymentScheme,
    t(propertyGroupKey),
    t(id, values),
    mainFeature ? t(`common.recent_searches.features.${mainFeature}`) : undefined,
  ]).join(', ');
};

export const usePaymentScheme = (params: RecentSearch['params'], t: TFunction) => {
  const paymentSchemaNumber = Number(params['paymentSchema']) as 0 | 1;
  const TRANSLATION_KEY = KEYS_MAP.paymentScheme[paymentSchemaNumber];
  const translationKey = TRANSLATION_KEY ? TRANSLATION_KEY : undefined;

  if (!translationKey) {
    return '';
  }

  return capitalize(t(translationKey as string) as string);
};

export const usePropertyGroup = (params: RecentSearch['params']) => {
  if (params.propertyGroup && params.propertyGroup?.length > 0) {
    const PROPERTY_GROUP_KEY = params.propertyGroup[0] as unknown as any;

    return PROPERTY_GROUP_KEY in KEYS_MAP.propertyGroup
      ? KEYS_MAP.propertyGroup[PROPERTY_GROUP_KEY as keyof typeof KEYS_MAP.propertyGroup]
      : KEYS_MAP.propertyGroup['unknown'];
  }

  return KEYS_MAP.propertyGroup['unknown'];
};
