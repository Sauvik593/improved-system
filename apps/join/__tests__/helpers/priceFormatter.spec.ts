import { formattedPrice } from '@helpers/priceFormatter';

describe('formatPrice', () => {
  it('should format price correctly for each locale', () => {
    const price = 123456.789;
    const expectedPrices: Record<string, string> = {
      en: '€123,456.79',
      fr: '123 456,79 €',
      it: '123.456,79 €',
      es: '123.456,79 €',
      pt: '123 456,79 €',
    };

    Object.keys(expectedPrices).forEach((locale) => {
      const expectedPrice = expectedPrices[locale];
      const result = formattedPrice({ locale, value: price, decimal: 2 });
      expect(result).toEqual(expectedPrice);
    });
  });
});
