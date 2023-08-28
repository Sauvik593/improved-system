import cn from 'classnames';
import { Listbox } from '@headlessui/react';

import { Checked } from '@kyero/icons';

import type { OptionType as Props } from './Select';

export const Option = ({ value, label }: Props) => {
  return (
    <Listbox.Option
      key={value}
      value={value}
      className={({ active }) =>
        cn(`relative cursor-default select-none`, {
          'bg-sierra-night-10': active,
          'hover:bg-sierra-night-10': !active,
        })
      }
    >
      {({ selected }) => (
        <div
          className={cn('py-4 pl-12', {
            'bg-sierra-night-10': selected,
            'hover:bg-sierra-night-10': !selected,
          })}
        >
          <span className={`block truncate`}>{label}</span>
          {selected && (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
              <Checked />
            </span>
          )}
        </div>
      )}
    </Listbox.Option>
  );
};
