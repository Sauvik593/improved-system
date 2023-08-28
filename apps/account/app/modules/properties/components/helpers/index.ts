import { and, any, pipe, length, filter, ifElse } from 'ramda';
import { PrimeBoostSlot, Property } from '../../types';

const INVALID_PROPERTY_STATES = ['hidden', 'incomplete'];

const isSlotBoosted = (slot: PrimeBoostSlot | null) => !!slot && !!slot.primeBoost;
const isSlotBoostable = (slot: PrimeBoostSlot | null) => !!slot && slot.boostable;
const isSlotUnavailable = (slot: PrimeBoostSlot | null) => !!slot && !slot.boostable;
const isSlotProcessing = (slot: PrimeBoostSlot) =>
  ifElse(
    isSlotBoosted,
    () => (slot.primeBoost?.status || '') === 'pending',
    () => false,
  )(slot);

const isSlotInCart = (slot: PrimeBoostSlot) =>
  ifElse(
    isSlotBoosted,
    () => (slot.primeBoost?.status || '') === 'in_cart',
    () => false,
  )(slot);

export const isPropertyPrime = (property: Property) => property.prime;
export const isPropertyFree = (property: Property) => !isPropertyPrime(property);

export const getPrimeBoostSlots = (property: Property) => property.primeBoostSlots;
export const getPropertySlotsAsArray = pipe(getPrimeBoostSlots, Object.values);
export const getBoostedSlots = pipe(getPropertySlotsAsArray, filter(isSlotBoosted));
export const getBoostedSlotsCount = pipe(getBoostedSlots, length);

export const propertyHasBoostableSlots = pipe(getPropertySlotsAsArray, any(isSlotBoostable));
export const propertyHasBoostedSlots = pipe(getPropertySlotsAsArray, any(isSlotBoosted));
export const propertyHasProcessingSlots = pipe(getPropertySlotsAsArray, any(isSlotProcessing));
export const propertyHasInCartSlots = pipe(getPropertySlotsAsArray, any(isSlotInCart));
export const propertyHasUnavailableSlots = pipe(getPropertySlotsAsArray, any(isSlotUnavailable));

export const propertyHasInvalidState = (property: Property) =>
  INVALID_PROPERTY_STATES.includes(property.status);

export const isPropertyBoostable = and(isPropertyPrime, propertyHasBoostableSlots);
