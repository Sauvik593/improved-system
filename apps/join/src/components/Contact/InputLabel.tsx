import cn from 'classnames';

export interface InputProps {
  id: string;
  name: string;
  type: 'text' | 'date' | 'number' | 'password';
  value: string | number | readonly string[] | undefined;
  className?: string;
  defaultValue: string;
  placeholder?: string;
  label?: string;
  ariaLabel?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: JSX.Element;
}

export const InputLabel = (props: InputProps) => {
  return (
    <div>
      <label className="block font-semibold" htmlFor={props.id}>
        {props.label}
      </label>
      {props.children}
      <input
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        type={props.type}
        className={cn(props.className)}
        aria-label={props.ariaLabel}
        onChange={props.onChange}
      />
    </div>
  );
};
