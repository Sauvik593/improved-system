export const SPAIN_KEY = 'spain';
export const COUNTRY_KEYS = ['spain', 'france', 'italy', 'portugal'] as const;

export type CountryKey = typeof COUNTRY_KEYS[number];
