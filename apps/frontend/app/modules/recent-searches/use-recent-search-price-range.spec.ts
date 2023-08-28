import {
  usePriceRangeTranslationKey,
  CURRENCY_DISPLAY,
  getPriceLabel,
} from './use-recent-search-price-range';

describe('usePriceRangeTranslationKey', () => {
  it('should return the correct translation key and values for min and max prices', () => {
    const props = { minPrice: 100000, maxPrice: 200000, locale: 'en' };
    const result = usePriceRangeTranslationKey(props);

    expect(result).toEqual({
      id: 'common.recent_searches.filter_ranges.price.min_max',
      values: {
        min: '€100K',
        max: '€200K',
      },
    });
  });

  it('should return the correct translation key and values for only max price', () => {
    const props = { maxPrice: 200000, locale: 'en' };
    const result = usePriceRangeTranslationKey(props);

    expect(result).toEqual({
      id: 'common.recent_searches.filter_ranges.price.max',
      values: {
        max: '€200K',
      },
    });
  });

  it('should return the correct translation key and values for only min price', () => {
    const props = { minPrice: 100000, locale: 'en' };
    const result = usePriceRangeTranslationKey(props);

    expect(result).toEqual({
      id: 'common.recent_searches.filter_ranges.price.min',
      values: {
        min: '€100K',
      },
    });
  });

  it('should return the correct translation key and no values for no min and max prices', () => {
    const props = { locale: 'en-US' };
    const result = usePriceRangeTranslationKey(props);

    expect(result).toEqual({
      id: 'common.recent_searches.filter_ranges.price.no_range',
      values: undefined,
    });
  });
});

describe('getPriceLabel', () => {
  it('should return the formatted price with the given locale', () => {
    const value = 100000;
    const locale = 'en';

    // We don't need to test the exact output format as it depends on the Intl.NumberFormat implementation.
    // Instead, we check whether the returned value is a string and contains the currency display symbol.
    const result = getPriceLabel(value, locale);

    expect(typeof result).toBe('string');
    expect(result).toContain(CURRENCY_DISPLAY);
  });

  it('should return a fallback price label when Intl.NumberFormat throws an error', () => {
    const value = 100000;
    const locale = 'INVALID_LOCALE';
    // We expect the function to catch the error and return a fallback value.
    const result = getPriceLabel(value, locale);

    // The fallback value should contain the currency display symbol and the original value.
    expect(result).toBe(`${CURRENCY_DISPLAY}${value}`);
  });
});
