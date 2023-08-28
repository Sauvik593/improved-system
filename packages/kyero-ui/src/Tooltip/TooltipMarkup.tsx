import cn from 'classnames';
import { forwardRef } from 'react';
import { Transition } from '@headlessui/react';

import type { Placement } from '@floating-ui/react';

interface TooltipMarkupProps {
  active: boolean;
  placement: Placement;
  message: string | React.ReactNode;
}

const popperStyles = {
  top: 'after:top-[100%]  after:border-b-transparent',
  bottom: 'after:bottom-[100%] after:border-t-transparent',
};

export const TooltipMarkup = forwardRef<HTMLDivElement, TooltipMarkupProps>(
  ({ placement, active, message }, ref) => {
    return (
      <div ref={ref}>
        <Transition show={active} appear={true}>
          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-y-2 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-2 opacity-0"
          >
            <div
              className="bg-sierra-night-80 relative max-w-[140px] rounded-md p-4 text-left text-white after:border-t-gray-700"
              role="tooltip"
            >
              {message}
              <span
                className={cn(
                  "text-sierra-night-80 after:absolute after:content-['']",
                  'after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-x-transparent',
                  // eslint-disable-next-line
                  // @ts-ignore
                  popperStyles[placement || 'top'],
                )}
              />
            </div>
          </Transition.Child>
        </Transition>
      </div>
    );
  },
);

TooltipMarkup.displayName = 'TooltipMarkup';
