import { useRef, useEffect, useState, useMemo } from 'react';

import { Listbox, Transition } from '@headlessui/react';

import { Button } from './Button';
import { Option } from './Option';

import type { OptionType } from './Select';

interface Props {
  selectedOption: OptionType;
  options: OptionType[];
  prependedMessage?: string;
  id: string;
  name: string;
  defaultValue: string | undefined;
  onChange: (value: string) => void;
  value: string;
  ref: React.Ref<HTMLInputElement>;
}

export const ListboxMarkup = ({
  value,
  onChange,
  prependedMessage,
  selectedOption,
  options,
}: Props) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<DOMRect | null>(null);

  function getOptionPosition() {
    const { current } = divRef;
    if (current) {
      setDimensions(current.getBoundingClientRect());
    }
  }

  useEffect(() => {
    getOptionPosition();
  }, [divRef]);

  useEffect(() => {
    window.addEventListener('resize', getOptionPosition);
    window.addEventListener('scroll', getOptionPosition);

    return () => {
      window.removeEventListener('resize', getOptionPosition);
      window.removeEventListener('scroll', getOptionPosition);
    };
  }, []);

  const position = useMemo(() => {
    if (dimensions) {
      return {
        top: dimensions.top + dimensions.height + 10,
        left: dimensions.left,
        width: Math.max(dimensions.width, 320),
      };
    }
    return {
      top: 0,
      left: 0,
      width: 0,
    };
  }, [dimensions]);

  return (
    <>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <div className="relative flex h-full w-full" ref={divRef}>
            <Button label={selectedOption.label} prependedMessage={prependedMessage} open={open} />
            <Transition
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 "
            >
              <Listbox.Options
                className="fixed z-20 max-h-60 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                style={position}
              >
                {options.map((option) => {
                  return (
                    <Option
                      label={option.label}
                      value={option.value}
                      key={`${option.value}_${option.label}`}
                    />
                  );
                })}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </>
  );
};

ListboxMarkup.displayName = 'ListboxMarkup';
