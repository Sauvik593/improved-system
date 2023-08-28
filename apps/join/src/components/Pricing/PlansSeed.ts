export type PlanKey = '1_month' | '3_months' | '6_months' | '1_year';

export const tabPanelKeys: PlanKey[] = ['1_month', '3_months', '6_months', '1_year'];

export const listingsNumber = ['25', '50', '100', '200', '500', '1000'];

export type Plan = {
  primeListings: number;
  costPerListing: number;
  cost: number;
  variant: string;
  type: string;
};

export type PlansSeed = {
  [duration: string]: Plan[];
};

export type PlanTile = {
  title: string;
  description: string;
  link: string;
  path: string;
};

export const PLANS_SEED: PlansSeed = {
  '1_month': [
    {
      primeListings: 25,
      costPerListing: 6,
      cost: 150,
      variant: 'base',
      type: '1_month',
    },
    {
      primeListings: 50,
      costPerListing: 4,
      cost: 200,
      variant: 'base',
      type: '1_month',
    },
    {
      primeListings: 100,
      costPerListing: 3,
      cost: 300,
      variant: 'base',
      type: '1_month',
    },
    {
      primeListings: 200,
      costPerListing: 2,
      cost: 400,
      variant: 'recommended',
      type: '1_month',
    },
    {
      primeListings: 500,
      costPerListing: 1.1,
      cost: 550,
      variant: 'base',
      type: '1_month',
    },
    {
      primeListings: 1000,
      costPerListing: 0.8,
      cost: 800,
      variant: 'base',
      type: '1_month',
    },
  ],
  '3_months': [
    {
      primeListings: 25,
      costPerListing: 6,
      cost: 450,
      variant: 'base',
      type: '3_months',
    },
    {
      primeListings: 50,
      costPerListing: 4,
      cost: 600,
      variant: 'base',
      type: '3_months',
    },
    {
      primeListings: 100,
      costPerListing: 3,
      cost: 900,
      variant: 'base',
      type: '3_months',
    },
    {
      primeListings: 200,
      costPerListing: 2,
      cost: 1200,
      variant: 'recommended',
      type: '3_months',
    },
    {
      primeListings: 500,
      costPerListing: 1.1,
      cost: 1650,
      variant: 'base',
      type: '3_months',
    },
    {
      primeListings: 1000,
      costPerListing: 0.8,
      cost: 2400,
      variant: 'base',
      type: '3_months',
    },
  ],
  '6_months': [
    {
      primeListings: 25,
      costPerListing: 5.67,
      cost: 850,
      variant: 'base',
      type: '6_months',
    },
    {
      primeListings: 50,
      costPerListing: 3.67,
      cost: 1100,
      variant: 'base',
      type: '6_months',
    },
    {
      primeListings: 100,
      costPerListing: 2.83,
      cost: 1700,
      variant: 'base',
      type: '6_months',
    },
    {
      primeListings: 200,
      costPerListing: 1.88,
      cost: 2250,
      variant: 'recommended',
      type: '6_months',
    },
    {
      primeListings: 500,
      costPerListing: 1.03,
      cost: 3100,
      variant: 'base',
      type: '6_months',
    },
    {
      primeListings: 1000,
      costPerListing: 0.76,
      cost: 4550,
      variant: 'base',
      type: '6_months',
    },
  ],
  '1_year': [
    {
      primeListings: 25,
      costPerListing: 5.33,
      cost: 1600,
      variant: 'base',
      type: '1_year',
    },
    {
      primeListings: 50,
      costPerListing: 3.58,
      cost: 2150,
      variant: 'base',
      type: '1_year',
    },
    {
      primeListings: 100,
      costPerListing: 2.67,
      cost: 3200,
      variant: 'base',
      type: '1_year',
    },
    {
      primeListings: 200,
      costPerListing: 1.79,
      cost: 4300,
      variant: 'recommended',
      type: '1_year',
    },
    {
      primeListings: 500,
      costPerListing: 0.98,
      cost: 5900,
      variant: 'base',
      type: '1_year',
    },
    {
      primeListings: 1000,
      costPerListing: 0.72,
      cost: 8600,
      variant: 'base',
      type: '1_year',
    },
  ],
};

export const PLAN_TILES = [
  {
    title: 'pricing.all_plans.agent_portal.title',
    description: 'pricing.all_plans.agent_portal.description',
    link: 'pricing.all_plans.agent_portal.link.title',
    path: 'features',
  },
  {
    title: 'pricing.all_plans.prime_boost.title',
    description: 'pricing.all_plans.prime_boost.description',
    link: 'pricing.all_plans.prime_boost.link.title',
    path: 'contact',
  },
  {
    title: 'pricing.all_plans.integration.title',
    description: 'pricing.all_plans.integration.description',
    link: 'pricing.all_plans.integration.link.title',
    path: 'integrations',
  },
];
