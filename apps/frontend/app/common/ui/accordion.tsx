import cn from 'classnames';
import { Disclosure, Transition } from '@headlessui/react';
import { Plus } from '@kyero/icons';

interface Props {
  title: string;
  content: string;
}

export const Accordion = ({ title, content }: Props) => (
  <Disclosure>
    {({ open }) => (
      <div>
        <Disclosure.Button className="text-sierra-night-100 text-h-5-sm md:text-h-5 border-t-1 border-sierra-night-5 flex w-full justify-between py-4 px-4 text-left font-bold md:px-0">
          {title}
          <Plus
            className={cn('transition-transform duration-100', {
              'rotate-45': open,
            })}
            aria-hidden="true"
          />
        </Disclosure.Button>
        <Transition
          unmount={false}
          show={open}
          className="overflow-hidden"
          enter="transition transition-[max-height] duration-200 ease-in"
          enterFrom="transform max-h-0"
          enterTo="transform max-h-screen"
          leave="transition transition-[max-height] duration-400 ease-out"
          leaveFrom="transform max-h-screen"
          leaveTo="transform max-h-0"
        >
          <Disclosure.Panel unmount={false} className="px-4 pb-4 md:px-0">
            {content}
          </Disclosure.Panel>
        </Transition>
      </div>
    )}
  </Disclosure>
);
