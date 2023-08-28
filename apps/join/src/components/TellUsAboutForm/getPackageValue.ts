import { tabPanelKeys, listingsNumber, type PlanKey } from '@components/Pricing/PlansSeed';

export const getPackageValue = (listings: string, duration: PlanKey) => {
  if (!tabPanelKeys.includes(duration as PlanKey) || !listingsNumber.includes(listings)) {
    return '200_prime_listings_1_month';
  }
  return `${listings}_prime_listings_${duration}`;
};
