import cn from 'classnames';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import { forwardRef, useState, type ForwardedRef } from 'react';
import { useRef } from 'react';

export interface SwitchProps {
  disabled?: boolean | null;
  defaultValue?: boolean;
  defaultChecked?: boolean;
  name: string;
  value: string;
  label: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (value: boolean) => void;
  labelVisible?: boolean;
  variant?: 'tick' | 'regular';
}

const VARIANT_STYLES = {
  tick: {
    button: {
      base: 'bg-sierra-night-10',
      checked: '',
      unchecked: '',
    },
    gauge: {
      base: [
        "after:content[''] after:top-0 after:left-0 after:-right-0 after:bottom-0 after:block after:h-[16px] after:w-[16px] after:bg-[url('/images/check.svg')] after:bg-cover after:bg-no-repeat",
        "after:transition-all'",
      ],
      checked: `after:scale-0'`,
      unchecked: `after:scale-100'`,
    },
    lozenge: {
      base: [],
      checked: `bg-ocean-100 translate-x-5`,
      unchecked: `bg-sierra-night-20 translate-x-1`,
    },
  },
  regular: {
    button: {
      base: 'transition-all',
      checked: 'bg-ocean-100',
      unchecked: 'bg-sierra-night-10',
    },
    gauge: {
      base: ['bg-white'],
      checked: ``,
      unchecked: ``,
    },
    lozenge: {
      base: ['overflow-hidden'],
      checked: `bg-ocean-100 translate-x-5`,
      unchecked: `bg-white translate-x-1`,
    },
  },
};

function SwitchBase(
  {
    disabled,
    name,
    onFocus,
    onBlur,
    onChange,
    label,
    value,
    defaultChecked = false,
    variant = 'tick' as const,
  }: SwitchProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const localRef = useRef<HTMLButtonElement>(null);
  const inputRef = ref || localRef;
  const [checked, setChecked] = useState(defaultChecked);
  const styles = VARIANT_STYLES[variant];

  const handleChange = (value: boolean) => {
    setChecked(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <HeadlessSwitch
      onChange={handleChange}
      checked={checked}
      value={value}
      name={name}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled as boolean}
      ref={inputRef}
      className={cn(
        'relative inline-flex h-7 w-11 items-center rounded-full',
        [styles.button.base],
        {
          ['focus-within:outline-terracotta-100 cursor-not-allowed opacity-60']: disabled,
          [styles.button.checked]: checked && !disabled,
          [styles.button.unchecked]: !checked && !disabled,
        },
      )}
    >
      <span className="sr-only">{label}</span>
      <span
        className={cn(
          'relative inline-block h-5 w-5 transform rounded-full transition',
          [styles.lozenge.base],
          {
            [styles.lozenge.checked]: checked,
            [styles.lozenge.unchecked]: !checked,
          },
        )}
      >
        <span className="sr-only">{label}</span>
        <span
          className={cn(
            'absolute left-0 flex h-full w-full items-center justify-center',
            ...styles.gauge.base,
            {
              [styles.gauge.checked]: checked,
              [styles.gauge.unchecked]: !checked,
            },
          )}
        ></span>
      </span>
    </HeadlessSwitch>
  );
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(SwitchBase);
Switch.displayName = 'Switch';
