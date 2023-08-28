import cn from 'classnames';

export interface RadioProps {
  label: string;
  name: string;
  value: string;
  defaultChecked: boolean;
  disabled?: boolean;
  className?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const STYLES = [
  'relative border-sierra-night-40 relative inline-block h-6 w-6 appearance-none overflow-hidden rounded-full border-1 bg-white p-1 shadow-sm transition-all',
  `after:content[''] after:w-full after:h-full after:top-0 after:left-0 after:-right-0 after:bottom-0`,
  `after:m-auto after:rounded-full after:block after:bg-ocean-100`,
  `after:scale-0 after:transition-all`,
  'checked:bg-white checked:after:scale-100',
];

export const Radio = (props: RadioProps) => (
  <label
    className={cn('flex', props.className, {
      disabled: props.disabled,
    })}
  >
    <input
      className={cn(STYLES)}
      type="radio"
      name={props.name}
      value={props.value}
      defaultChecked={props.defaultChecked}
      disabled={props.disabled || false}
      onChange={props.onChange}
      checked={props.checked}
    />
    <span className="text-p-2 ml-3">{props.label}</span>
  </label>
);
