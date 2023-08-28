import cn from 'classnames';
import { Search } from '@kyero/icons';
import { Button, ButtonProps } from '../Button';
import { useEffect, useState } from 'react';

export interface SearchInputProps {
  id: string;
  name: string;
  placeholder: string;
  className?: string;
  defaultValue: string | null;
  button?: ButtonProps | null;
}

export const SearchInput = (props: SearchInputProps) => {
  const [value, setValue] = useState(props.defaultValue || '');

  useEffect(() => {
    setValue(props.defaultValue || '');
  }, [props.defaultValue]);

  const { button } = props;

  return (
    <div className="relative flex h-full items-center justify-between">
      <Search className="pointer-events-none absolute left-3 bottom-0 top-0 m-auto" />
      <input
        type="text"
        id={props.id}
        name={props.name}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
        className={cn(
          'text-sierra-night-100 rounded-md bg-white p-4',
          'placeholder:text-sierra-night-100 w-full pl-12',
          'hover:bg-sierra-night-10 focus:bg-sierra-night-10 focus:outline-0',
          props.className,
          {
            ['pr-28']: !!props.button,
          },
        )}
        placeholder={props.placeholder}
      />
      {button && (
        <div className="absolute right-2">
          <Button {...button} />
        </div>
      )}
    </div>
  );
};

SearchInput.displayName = 'SearchInput';
