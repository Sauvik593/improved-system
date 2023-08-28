import { createContext } from 'react';
import type { Country } from '@lib/types';

export interface CountryContextParams {
  countries: Country[];
  country: Country | null;
}

export const CountryContext = createContext<CountryContextParams>({
  countries: [],
  country: null,
});
