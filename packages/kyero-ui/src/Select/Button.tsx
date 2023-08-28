import cn from 'classnames';
import { Listbox } from '@headlessui/react';

import { ArrowDown } from '@kyero/icons';

interface Props {
  label: string;
  prependedMessage?: string;
  open: boolean;
}

export const Button = ({ label, open, prependedMessage = 'Sort by:' }: Props) => (
  <Listbox.Button className="relative flex w-full cursor-default items-center  overflow-hidden rounded-lg bg-white py-2 px-3 text-left">
    <span className="truncate">{prependedMessage}:</span>
    <span className="ml-1 truncate">
      <strong>{label}</strong>
    </span>
    <span
      className={cn('ml-auto transition-all', {
        ['rotate-180']: open,
      })}
    >
      <ArrowDown />
    </span>
  </Listbox.Button>
);
