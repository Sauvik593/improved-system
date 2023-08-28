import { SUPPORTED_LOCALES } from '../app/i18n';
import { generateHelperFunction } from './i18n.helpers-spec';

const fs = require('fs');
const path = require('path');

describe('Localization Files', () => {
  const enFilePath = path.join(__dirname, '../public/locales/en/common.json');
  const enData = JSON.parse(fs.readFileSync(enFilePath));

  const getAllKeys = generateHelperFunction(
    (value: Record<string, string>) => typeof value !== 'object',
  );
  const getNullTranslations = generateHelperFunction((value: string | null) => value === null);
  const getEmptyKeys = generateHelperFunction((key: string) => key === '');

  SUPPORTED_LOCALES.forEach((locale) => {
    const filePath = path.join(__dirname, `../public/locales/${locale}/common.json`);
    const data = JSON.parse(fs.readFileSync(filePath));

    describe(`Locale: ${locale}`, () => {
      it('should contain all keys from the English version', () => {
        const enKeys = getAllKeys(enData);
        const localeKeys = getAllKeys(data);

        const missingKeys = enKeys.filter((key) => !localeKeys.includes(key));

        if (missingKeys.length > 0) {
          throw new Error(`Missing keys in ${locale}: ${missingKeys.join(', ')}`);
        }

        expect(true).toBe(true);
      });

      it('should not have translation set to null', () => {
        const nullTranslations = getNullTranslations(data);

        if (nullTranslations.length > 0) {
          throw new Error(`Translations set to null in ${locale}: ${nullTranslations.join(', ')}`);
        }

        expect(true).toBe(true);
      });
    });
  });

  it('should not have empty keys in the English version', () => {
    const emptyKeys = getEmptyKeys(enData);

    if (emptyKeys.length > 0) {
      throw new Error(`Empty keys found in the English version: ${emptyKeys.join(', ')}`);
    }

    expect(true).toBe(true);
  });
});

describe('generateHelperFunction', () => {
  // Sample data for testing
  const testData = {
    key1: 'Value 1',
    key3: {
      nested1: 'Nested Value 1',
      nested2: '',
      nested3: {
        nested4: null,
      },
    },
  };
  // Test the case with an empty string value
  it('should throw an error for empty string values', () => {
    const emptyStringPredicate = (value: string | null) => value === '';
    const emptyStringKeysFn = generateHelperFunction(emptyStringPredicate);

    expect(() => emptyStringKeysFn(testData)).toThrowError(
      new Error('Empty translation found: key3.nested2'),
    );
  });

  // Test the case with null values
  it('should throw an error for null values', () => {
    const nullPredicate = (value: string | null) => value === null;
    const nullKeysFn = generateHelperFunction(nullPredicate);

    expect(() => nullKeysFn(testData)).toThrowError(
      new Error('Empty translation found: key3.nested3.nested4'),
    );
  });

  // Test the case with both empty string and null values
  it('should throw an error for both empty string and null values', () => {
    const emptyOrNullPredicate = (value: string | null) => value === '' || value === null;
    const emptyOrNullKeysFn = generateHelperFunction(emptyOrNullPredicate);

    expect(() => emptyOrNullKeysFn(testData)).toThrowError(
      new Error('Empty translation found: key3.nested2'),
    );
  });
});
