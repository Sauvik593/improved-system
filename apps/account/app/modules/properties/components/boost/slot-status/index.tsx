import { type PrimeBoostStatus } from '@properties/types';

import { Pending } from './pending';
import { Boosted } from './boosted';
import { InCart } from './in-cart';

interface Props {
  status: PrimeBoostStatus;
}

export const SlotStatus = ({ status }: Props) => {
  switch (status) {
    case 'boosted':
      return <Boosted />;
    case 'in_cart':
      return <InCart />;
    case 'pending':
      return <Pending />;
    default:
      return null;
  }
};
