import { createContext } from 'react';

import type { UseTooltip } from './useTooltip';

type ContextType = ReturnType<UseTooltip> | null;

export const TooltipContext = createContext<ContextType>(null);
