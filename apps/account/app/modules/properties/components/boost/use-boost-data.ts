import { PrimeBoostSlot, Property } from '~/modules/properties/types';

const isBoostableLocations = (slot: PrimeBoostSlot) => slot.boostable && !slot.primeBoost;
const isBoostedLocations = (slot: PrimeBoostSlot) => !!slot.primeBoost;
const unavailableLocations = (slot: PrimeBoostSlot) => !slot.boostable && !slot.primeBoost;

export const useBoostData = (slots: Property['primeBoostSlots']) => {
  const slotsArray = Object.entries(slots);

  const boostableLocations = slotsArray.reduce(
    (acc: PrimeBoostSlot[], [, slot]) => (isBoostableLocations(slot) ? [...acc, slot] : acc),
    [],
  );

  const boostedLocations = slotsArray.reduce(
    (acc: PrimeBoostSlot[], [, slot]) => (isBoostedLocations(slot) ? [...acc, slot] : acc),
    [],
  );

  const notBoostableLocations = slotsArray.reduce(
    (acc: PrimeBoostSlot[], [, slot]) => (unavailableLocations(slot) ? [...acc, slot] : acc),
    [],
  );

  return { boostableLocations, boostedLocations, notBoostableLocations };
};
