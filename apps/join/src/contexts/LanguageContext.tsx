import { createContext } from 'react';

export interface LanguageContextParams {
  locale: string;
  locales: string[];
}

export const LanguageContext = createContext<LanguageContextParams>({
  locale: '',
  locales: [],
});
