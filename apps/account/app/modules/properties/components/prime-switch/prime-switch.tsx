import { DisabledPrimeSwitch } from './disabled-prime-switch';
import { RegularPrimeSwitch } from './regular-prime-switch';

import type { Props } from './types';

export const PrimeSwitch = (props: Props) =>
  props.disabled ? <DisabledPrimeSwitch {...props} /> : <RegularPrimeSwitch {...props} />;
