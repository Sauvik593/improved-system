import { createContext } from 'react';

import type { Localization } from '@lib/types';

export interface LocalizationContextParams {
  localizations: Localization[];
}

export const LocalizationContext = createContext<LocalizationContextParams>({
  localizations: [],
});
