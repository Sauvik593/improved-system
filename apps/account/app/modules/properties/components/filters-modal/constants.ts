import { ListingTypeField, NAME as listingTypeName } from './listing-type-field';
import { PropertyStatusField, NAME as propertyStatusName } from './property-status-field';
import { BoostedField, NAME as boostedName } from './boosted-field';
import { PropertyTypesField, NAME as propertyTypesName } from './property-types-field';
import { BedroomsField, NAME as bedroomsName } from './bedrooms-field';

export const PROPERTIES_FIELDS_CONFIG = [
  {
    fieldName: listingTypeName,
    type: 'single' as const,
    Component: ListingTypeField,
  },
  {
    fieldName: propertyStatusName,
    type: 'single' as const,
    Component: PropertyStatusField,
  },
  {
    fieldName: boostedName,
    type: 'single' as const,
    Component: BoostedField,
  },
  {
    fieldName: propertyTypesName,
    type: 'multiple' as const,
    Component: PropertyTypesField,
  },
  {
    fieldName: bedroomsName,
    type: 'multiple' as const,
    Component: BedroomsField,
  },
];
