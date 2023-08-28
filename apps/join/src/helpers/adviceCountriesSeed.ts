export interface AdviceCountry {
  en: string;
  fr: string;
  it: string;
  pt: string;
  es: string;
}

interface AdviceCountries {
  [country: string]: AdviceCountry;
}

export const adviceCountries: AdviceCountries = {
  spain: {
    en: 'en/advice/spain',
    fr: 'fr/advice/espagne',
    it: 'it/advice/spagna',
    pt: 'en/advice',
    es: 'en/advice',
  },
  portugal: {
    en: 'en/advice/portugal',
    fr: 'fr/advice/portugal',
    it: 'it/advice',
    pt: 'en/advice',
    es: 'en/advice',
  },
  france: {
    en: 'en/advice/france',
    fr: 'en/advice',
    it: 'it/advice',
    pt: 'en/advice',
    es: 'en/advice',
  },
  italy: {
    en: 'en/advice/italy',
    fr: 'en/advice',
    it: 'it/advice',
    pt: 'en/advice',
    es: 'en/advice',
  },
  default: {
    en: 'en/advice',
    fr: 'fr/advice',
    it: 'it/advice',
    pt: 'en/advice',
    es: 'en/advice',
  },
};
