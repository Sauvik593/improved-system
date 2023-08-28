import {
  useRecentSearchLabel,
  usePaymentScheme,
  usePropertyGroup,
} from './use-recent-search-label';
import { vitest } from 'vitest';
import { type TFunction } from 'i18next';
import { type RecentSearch } from './helpers';

describe('useRecentSearchLabel', () => {
  // @ts-ignore
  const tMock: TFunction = vitest.fn((key) => key);

  const paramsMock: RecentSearch['params'] = {
    minPrice: 100000,
    maxPrice: 200000,
    paymentSchema: 0,
    propertyGroup: ['1'],
  };

  it('should return the formatted recent search label', () => {
    const result = useRecentSearchLabel({
      t: tMock,
      params: paramsMock,
      mainFeature: 'with_pool',
      locale: 'en',
    });

    expect(result).toBe(
      'Common.recent_searches.payment_scheme.for_sale, common.recent_searches.property_group.apartment, common.recent_searches.filter_ranges.price.min_max, common.recent_searches.features.with_pool',
    );
  });
});

describe('usePaymentScheme', () => {
  // @ts-ignore
  const tMock = vitest.fn((key) => 'translation') as Vitest.Mock<TFunction>;

  afterEach(() => {
    tMock.mockClear();
  });

  it('should return the capitalized payment scheme translation', () => {
    const result = usePaymentScheme({ paymentSchema: 1 }, tMock);

    expect(tMock).toHaveBeenCalledWith('common.recent_searches.payment_scheme.to_rent');
    expect(result).toEqual('Translation');
  });

  it('should return the capitalized payment scheme translation', () => {
    const result = usePaymentScheme({ paymentSchema: 0 }, tMock);

    expect(result).toEqual('Translation');
    expect(tMock).toHaveBeenCalledWith('common.recent_searches.payment_scheme.for_sale');
  });

  it('should return an empty string if the translation key is not found', () => {
    const paramsMock: RecentSearch['params'] = {
      paymentSchema: 111,
    };

    // Call the function and expect an empty string as the output
    const result = usePaymentScheme(paramsMock, tMock);
    expect(tMock).not.toHaveBeenCalled();
    expect(result).toEqual('');
  });
});

describe('usePropertyGroup', () => {
  const paramsMock: RecentSearch['params'] = {
    paymentSchema: 0,
    propertyGroup: ['3'],
  };

  it('should return the property group translation', () => {
    const result = usePropertyGroup(paramsMock);
    expect(result).toEqual('common.recent_searches.property_group.town_house');
  });

  it('should return the "unknown" property group translation if the propertyGroup is not found in KEYS_MAP', () => {
    // Mock the params with an unknown property group
    const paramsMock: RecentSearch['params'] = {
      paymentSchema: 0,
      propertyGroup: ['10'],
    };

    const result = usePropertyGroup(paramsMock);
    expect(result).toEqual('common.recent_searches.property_group.unknown');
  });

  it('should return the "unknown" property group translation if the propertyGroup is empty', () => {
    const paramsMock: RecentSearch['params'] = {
      paymentSchema: 0,
      propertyGroup: [],
    };

    const result = usePropertyGroup(paramsMock);
    expect(result).toEqual('common.recent_searches.property_group.unknown');
  });
});
