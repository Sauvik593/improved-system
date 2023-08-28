import cn from 'classnames';
import { FieldValues, UseFormRegister, Path, FieldError } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  className?: string;
  error?: FieldError;
  register: UseFormRegister<T>;
}

const STYLES = [
  'relative flex border-sierra-night-40 relative inline-block h-6 w-6 appearance-none overflow-hidden rounded-md border-1 bg-white shadow-sm transition-all',
  `after:content[''] after:top-0 after:left-0 after:-right-0 after:bottom-0`,
  `after:bg-[url('/static/checkbox/icon-done.svg')] after:bg-no-repeat after:bg-cover after:w-[80%] after:h-[80%]`,
  `after:m-auto after:rounded-full after:block`,
  `after:scale-0 after:transition-all`,
  'checked:bg-ocean-150 checked:after:scale-100',
];

export const CheckboxInput = <T extends FieldValues>({
  name,
  register,
  label,
  className,
  error,
}: FormInputProps<T>) => {
  return (
    <div>
      <span className={cn(`flex`, className)}>
        <input className={cn(STYLES)} type="checkbox" {...register(name, { required: true })} />
        {label && (
          <label htmlFor={name} className="px-2">
            {label}
          </label>
        )}
      </span>
      {error && <p className="text-terracotta-100 mt-2 px-2">{error.message}</p>}
    </div>
  );
};
