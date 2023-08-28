import cn from 'classnames';
import { forwardRef } from 'react';
import { useField } from 'remix-validated-form';

interface Props {
  defaultValue?: string;
  options: { value: string; label: string }[];
  name: string;
  placeholder?: string;
  label: string;
  className?: string;
  formId?: string;
  disabled?: boolean;
  // disabled fields are set to empty while sending formData
  visuallyDisabled?: boolean;
  testId?: string;
}

export const SelectField = forwardRef<HTMLInputElement, Props>(
  (
    {
      options,
      defaultValue,
      name,
      className,
      label,
      placeholder,
      formId,
      testId,
      disabled = false,
      visuallyDisabled = false,
    },
    ref,
  ) => {
    const { error, getInputProps } = useField(name, { formId });
    const props = getInputProps({ id: name });
    return (
      <div className={cn('relative flex flex-col gap-2', className)}>
        <label htmlFor={name} className="text-tile-100 text-h-6 font-bold">
          {label}
        </label>
        <select
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={cn('border-1 border-sierra-night-40 w-full flex-1 rounded-md p-2 px-4', {
            'border-terracotta-100 text-terracotta-100 outline-terracotta-100 outline': error,
            'bg-sierra-night-10 text-sierra-night-60 cursor-not-allowed':
              disabled || visuallyDisabled,
          })}
          {...props}
          disabled={disabled}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <div
            className="border-terracotta-100 text-terracotta-100 text-p-3 rounded-md"
            data-testid={testId ? `${testId}.field-error` : `${name}.field-error`}
          >
            {error}
          </div>
        )}
      </div>
    );
  },
);

SelectField.displayName = 'SelectField';
