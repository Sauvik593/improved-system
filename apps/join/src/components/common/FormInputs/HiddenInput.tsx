import { FieldValues, UseFormRegister, Path } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  value?: string | number | readonly string[] | undefined;
  type?: 'text' | 'hidden' | 'email' | 'checkbox';
  testId?: string;
}

export const HiddenInput = <T extends FieldValues>({
  value,
  name,
  register,
  type = 'hidden',
  testId,
}: FormInputProps<T>) => {
  return <input type={type} {...register(name)} value={value} data-testid={testId} />;
};
