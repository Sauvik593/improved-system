import cn from 'classnames';
import { useEffect, useState } from 'react';

export interface CheckboxProps {
  label: string | React.ReactNode;
  name: string;
  value: string;
  defaultChecked: boolean;
  disabled?: boolean;
  className?: string;
  theme?: 'default' | 'wide';
  onCheck?: (checked: boolean) => void;
  checkboxBgClassName?: string;
}

const STYLES = [
  'relative flex border-sierra-night-40 relative inline-block h-6 w-6 appearance-none overflow-hidden rounded-md border-1 bg-white shadow-sm transition-all',
  `after:content[''] after:top-0 after:left-0 after:-right-0 after:bottom-0`,
  `after:bg-no-repeat after:bg-cover after:w-[80%] after:h-[80%]`,
  `after:m-auto after:rounded-full after:block`,
  `after:scale-0 after:transition-all`,
  'checked:bg-ocean-150 checked:after:scale-100',
];

const THEME = {
  default: {
    label: {
      base: '',
      disabled: '',
      checked: '',
      unchecked: '',
    },
  },
  wide: {
    label: {
      base: 'border-1 transition-all rounded-md bg-sierra-night-5 p-4',
      disabled: 'border-transparent',
      checked: 'border-ocean-100',
      unchecked: 'border-transparent',
      error: 'border-orange-120',
    },
  },
};

export const Checkbox = ({ theme = 'default', onCheck, ...props }: CheckboxProps) => {
  const [checked, setChecked] = useState(props.defaultChecked);
  const themeStyles = THEME[theme];

  useEffect(() => {
    setChecked(props.defaultChecked);
  }, [props.defaultChecked]);

  const handleChange = () => {
    setChecked(!checked);

    if (onCheck) {
      onCheck(!checked);
    }
  };

  return (
    <label
      className={cn(
        'flex',
        props.className,
        themeStyles.label.base,
        {
          [themeStyles.label.disabled]: !!props.disabled,
        },
        {
          [themeStyles.label.unchecked]: !checked && !props.disabled,
          [themeStyles.label.checked]: checked && !props.disabled,
        },
      )}
    >
      <input
        className={cn(STYLES, props.checkboxBgClassName || `after:bg-[url('/images/check.svg')]`, {
          ['checked:bg-sierra-night-40']: props.disabled,
        })}
        type="checkbox"
        name={props.name}
        value={props.value}
        onChange={handleChange}
        checked={checked}
        disabled={props.disabled || false}
      />
      <span className="text-p-2 ml-3 block w-full">{props.label}</span>
    </label>
  );
};
