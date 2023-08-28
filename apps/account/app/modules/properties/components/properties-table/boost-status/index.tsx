import {
  propertyHasBoostableSlots,
  propertyHasBoostedSlots,
  propertyHasProcessingSlots,
  propertyHasUnavailableSlots,
  propertyHasInCartSlots,
  propertyHasInvalidState,
} from '~/modules/properties/components/helpers';
import { Property } from '@properties/types';

import { Pending } from './pending';
import { InCart } from './in-cart';
import { Boosted } from './boosted';
import { Boost } from './boost';
import { Unavailable } from './unavailable';
import { InvalidStatus } from './invalid-status';

interface Props {
  property: Property;
}

export const BoostStatus = ({ property }: Props) => {
  switch (true) {
    case propertyHasInCartSlots(property):
      return <InCart property={property} />;
    case propertyHasProcessingSlots(property):
      return <Pending property={property} />;
    case propertyHasBoostedSlots(property):
      return <Boosted property={property} />;
    case propertyHasBoostableSlots(property):
      return <Boost id={property.id} />;
    case propertyHasInvalidState(property):
      return <InvalidStatus />;
    case propertyHasUnavailableSlots(property):
      return <Unavailable />;
    default:
      return null;
  }
};
