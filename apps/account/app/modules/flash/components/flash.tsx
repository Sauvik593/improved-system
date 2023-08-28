import cn from 'classnames';
import { Transition } from '@headlessui/react';

import { FlashMessage } from '~/modules/flash/components/flash-message';
import { useFlashes } from '~/modules/flash/components/use-flashes';
import { useNavigationContext } from '~/components/base-layout/navigation.context';

export const Flash = () => {
  const { flashes, fireRemoveFlash, fireHideFlash } = useFlashes();
  const { layoutExpanded } = useNavigationContext();

  return (
    <div
      className={cn('fixed top-4 z-10 w-[calc(100%-2rem)] max-w-[1360px] md:w-[calc(100%-5rem)]', {
        ['lg:w-[calc(100%-18rem)]']: layoutExpanded,
        ['lg:w-[calc(100%-5rem)]']: !layoutExpanded,
      })}
    >
      {flashes.map((flash) => {
        return (
          <Transition key={flash.id} appear={true} show={flash.state !== 'hidden'}>
            <Transition.Child
              enter="transition ease-in-out duration-300 transform"
              enterFrom="opacity-0 -translate-y-full"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-full"
              afterLeave={() => fireRemoveFlash(flash.id)}
            >
              <FlashMessage flash={flash} onClose={fireHideFlash} key={flash.id} />
            </Transition.Child>
          </Transition>
        );
      })}
    </div>
  );
};
