export const CURRENCY_DISPLAY = '€';
export const CURRENT_NAME = 'EUR';

interface PriceRangeArguments {
  minPrice?: number;
  maxPrice?: number;
  locale: string;
}

export const usePriceRangeTranslationKey = (props: PriceRangeArguments) => {
  const { minPrice: min, maxPrice: max, locale } = props;

  switch (true) {
    case !!min && !!max:
      return {
        id: 'common.recent_searches.filter_ranges.price.min_max',
        values: {
          min: getPriceLabel(min as number, locale),
          max: getPriceLabel(max as number, locale),
        },
      };
    case !min && !!max:
      return {
        id: 'common.recent_searches.filter_ranges.price.max',
        values: {
          max: getPriceLabel(max as number, locale),
        },
      };
    case !!min && !max:
      return {
        id: 'common.recent_searches.filter_ranges.price.min',
        values: {
          min: getPriceLabel(min as number, locale),
        },
      };
    default:
      return {
        id: 'common.recent_searches.filter_ranges.price.no_range',
        values: undefined,
      };
  }
};

export const getPriceLabel = (value: number, locale: string) => {
  try {
    const formatted = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: CURRENT_NAME,
      // @ts-ignore
      notation: 'compact',
      compactDisplay: 'short',
    }).format(value);

    return formatted;
  } catch (error) {
    console.error(error);

    return `${CURRENCY_DISPLAY}${value}`;
  }
};
