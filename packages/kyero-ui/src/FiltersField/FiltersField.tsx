import cn from 'classnames';

export interface FiltersFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const FiltersField = (props: FiltersFieldProps) => {
  return (
    <fieldset className={cn(props.className)}>
      <label className="text-h-6 font-bold">{props.label}</label>
      <div className="mt-2">{props.children}</div>
    </fieldset>
  );
};

FiltersField.displayName = 'FiltersField';
