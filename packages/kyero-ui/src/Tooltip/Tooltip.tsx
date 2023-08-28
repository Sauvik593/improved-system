import { useContext } from 'react';
import { useTooltip } from './useTooltip';
import { TooltipContext } from './TooltipContext';

import type { TooltipOptions } from './types';

export const useTooltipState = () => {
  const context = useContext(TooltipContext);

  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />');
  }

  return context;
};

export function Tooltip({ children, ...options }: { children: React.ReactNode } & TooltipOptions) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options);
  return <TooltipContext.Provider value={tooltip}>{children}</TooltipContext.Provider>;
}
