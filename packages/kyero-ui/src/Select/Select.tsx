import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ListboxMarkup } from './ListboxMarkup';

export interface OptionType {
  label: string;
  value: string;
  subPart?: string;
}

interface Props {
  name: string;
  id: string;
  defaultValue: string | undefined;
  options: OptionType[];
  onChange: (option: string) => void;
  prependedMessage?: string;
}

export const Select = ({ onChange, options, prependedMessage, id, defaultValue, name }: Props) => {
  const [value, setValue] = useState<string>(defaultValue || '');
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(defaultValue || '');
  }, [defaultValue]);

  const selectedOption = useMemo(() => {
    const el = options.find((option) => option.value === value);

    if (!el) {
      return { label: 'Default message', value: '' };
    }

    return el;
  }, [options, value]);

  const handleChange = useCallback(
    (value: string) => {
      setValue(value);
      onChange(value);
    },
    [ref, onChange],
  );

  return (
    <ListboxMarkup
      id={id}
      defaultValue={defaultValue}
      prependedMessage={prependedMessage}
      options={options}
      onChange={handleChange}
      selectedOption={selectedOption}
      name={name}
      ref={ref}
      value={value}
    />
  );
};

Select.displayName = 'Select';
