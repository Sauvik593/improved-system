import { Switch as KyeroSwitch } from '@kyero/ui';

import type { Props } from './types';

export const RegularPrimeSwitch = ({
  disabled = true,
  defaultValue = true,
  value,
  name,
}: Props) => (
  <KyeroSwitch
    defaultValue={defaultValue}
    disabled={disabled}
    name={name}
    value={value}
    label={'Switch prime'}
  />
);
