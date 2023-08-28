import cn from 'classnames';
import { FieldError } from 'react-hook-form';

interface SelectInputProps {
  name: string;
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  label?: string;
  testId?: string;
  className?: string;
  error?: FieldError;
  labelText?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectInput = ({
  name,
  label,
  error,
  options,
  value,
  className,
  placeholder,
  testId,
  onChange,
  labelText = 'text-tile-100',
}: SelectInputProps) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className={cn('text-p-2 md:text-h-6 font-bold', labelText)}>
          {label}
        </label>
      )}
      <select
        data-testid={testId}
        className={cn(
          `border-sierra-night-40 text-sierra-night-60 w-full rounded-md border p-2 pl-4`,
          className,
          {
            'mt-2': label,
          },
        )}
        value={value}
        defaultValue={''}
        onChange={onChange}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder || ''}
          </option>
        )}
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-terracotta-100 mt-2 px-2" data-testid={`${testId}-error`}>
          {error.message}
        </p>
      )}
    </div>
  );
};
