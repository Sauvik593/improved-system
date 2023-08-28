import { useContext, useMemo, forwardRef } from 'react';
import { FloatingPortal } from '@floating-ui/react';

import { TooltipMarkup } from './TooltipMarkup';
import { TooltipContext } from './TooltipContext';
import { mergeRefs } from './helpers';

export const useTooltipState = () => {
  const context = useContext(TooltipContext);

  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />');
  }

  return context;
};

export const TooltipContent = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  function TooltipContent(props, propRef) {
    const state = useTooltipState();

    const ref = useMemo(() => mergeRefs([state.floating, propRef]), [state.floating, propRef]);

    return (
      <FloatingPortal>
        {
          <div
            ref={ref}
            style={{
              position: state.strategy,
              top: state.y ?? 0,
              left: state.x ?? 0,
              // eslint-disable-next-line
              ...(props.style || {}),
            }}
          >
            <TooltipMarkup
              {...state.getFloatingProps(props)}
              placement={state.placement}
              active={state.open}
              // eslint-disable-next-line
              message={props.children}
            />
          </div>
        }
      </FloatingPortal>
    );
  },
);
