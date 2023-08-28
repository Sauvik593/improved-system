import cn from 'classnames';
import { FieldValues, UseFormRegister, Path, FieldError } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  label?: string;
  className?: string;
  error?: FieldError;
  labelText?: string;
}

export const TextAreaInput = <T extends FieldValues>({
  name,
  label,
  register,
  className,
  labelText = 'text-tile-100',
  error,
}: FormInputProps<T>) => {
  return (
    <>
      <label htmlFor={name} className={cn('text-p-2 md:text-h-6 font-bold', labelText)}>
        {label}
      </label>
      <textarea
        className={cn(
          `border-sierra-night-40 text-sierra-night-60 w-full rounded-md border p-2 pl-4`,
          className,
          {
            'mt-2': label,
          },
        )}
        {...register(name)}
      />
      {error && <p className="text-terracotta-100 mt-2 px-2">{error.message}</p>}
    </>
  );
};
