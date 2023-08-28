import cn from 'classnames';
import { FieldValues, UseFormRegister, Path, FieldError } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  testId?: string;
  label?: string;
  description?: string;
  defaultValue?: string | null;
  className?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  labelText?: string;
  placeholder?: string;
  showTooltip?: boolean;
  type?: 'text' | 'date' | 'password' | 'email';
}

export const BaseInput = <T extends FieldValues>({
  name,
  label,
  description,
  error,
  register,
  className,
  placeholder,
  labelText = 'text-tile-100',
  type = 'text',
  showTooltip = false,
  testId,
}: FormInputProps<T>) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className={cn('text-p-2 md:text-h-6 font-bold', labelText)}>
          {label}
        </label>
      )}
      {description && (
        <p className="text-p-3-sm lg:text-p-3 text-sierra-night-60 w-full">{description}</p>
      )}
      <input
        data-testid={testId}
        className={cn(
          `border-sierra-night-40 text-sierra-night-60 w-full rounded-md border p-2 pl-4`,
          className,
          {
            'mt-2': label,
          },
        )}
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && (
        <p
          className={cn('px-2', {
            ['error-tooltip']: showTooltip,
            ['text-terracotta-100 mt-2']: !showTooltip,
          })}
          data-testid={`${testId}-error`}
        >
          {error.message}
        </p>
      )}
    </div>
  );
};
