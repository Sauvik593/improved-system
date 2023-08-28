import cn from 'classnames';
import { forwardRef } from 'react';
import { useField } from 'remix-validated-form';

interface Props {
  defaultValue?: string;
  name: string;
  type: string;
  placeholder?: string;
  label: string;
  className?: string;
  formId?: string;
  disabled?: boolean;
  // disabled fields are set to empty while sending formData
  visuallyDisabled?: boolean;
  testId?: string;
  children?: React.ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, Props>(
  (
    {
      defaultValue,
      name,
      className,
      label,
      type,
      placeholder,
      formId,
      testId,
      children,
      disabled = false,
      visuallyDisabled = false,
    },
    ref,
  ) => {
    const { error, getInputProps } = useField(name, { formId });
    const props = getInputProps({ id: name });
    return (
      <div className={cn('relative flex flex-col gap-2', className)}>
        <div className="flex items-center justify-between">
          <label htmlFor={name} className="text-tile-100 text-h-6 font-bold">
            {label}
          </label>
          {children && children}
        </div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          ref={ref}
          className={cn('border-1 w-full flex-1 rounded-md p-2 px-4', {
            'border-terracotta-100 text-terracotta-100': error,
            'border-sierra-night-40': !error,
            'bg-sierra-night-10 text-sierra-night-60 cursor-not-allowed':
              disabled || visuallyDisabled,
          })}
          {...props}
          {...(testId ? { 'data-testid': testId } : {})}
          disabled={disabled}
          {...(visuallyDisabled
            ? {
                onChange: (ev) => {
                  ev.preventDefault();
                },
                onKeyUp: (ev) => {
                  ev.preventDefault();
                },
                onFocus: (ev) => {
                  ev.target.blur();
                  ev.preventDefault();
                },
              }
            : {})}
        />
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

InputField.displayName = 'InputField';
