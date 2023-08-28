import { forwardRef, useMemo, cloneElement, isValidElement } from 'react';

import { mergeRefs } from './helpers';
import { useTooltipState } from './Tooltip';

export const TooltipTrigger = forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & { asChild?: boolean }
  // eslint-disable-next-line
>(function TooltipTrigger({ children, asChild = false, ...props }, propRef) {
  const state = useTooltipState();

  // eslint-disable-next-line
  const childrenRef = (children as any).ref;
  const ref = useMemo(
    () => mergeRefs([state.reference, propRef, childrenRef]),
    [state.reference, propRef, childrenRef],
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      state.getReferenceProps({
        ref,
        ...props,
        // eslint-disable-next-line
        ...children.props,
      }),
    );
  }

  return (
    <div
      ref={ref}
      // The user can style the trigger based on the state
      {...state.getReferenceProps(props)}
    >
      {children}
    </div>
  );
});
