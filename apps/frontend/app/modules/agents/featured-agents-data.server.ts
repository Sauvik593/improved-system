import { COUNTRIES } from '../homepage/country-specific/helpers';
import { assetsPathTo } from '~/common/client-router/helpers';

export type FeaturedAgent = {
  id: number;
  name: string;
  company: string;
  photo: string;
  photo_retina: string;
};

export const SPAIN = [
  {
    id: 1,
    name: 'Ben',
    company: 'Blue Square',
    photo: assetsPathTo('/images/agents/es-ben.png'),
    photo_retina: assetsPathTo('/images/agents/es-ben@2x.png'),
  },
  {
    id: 2,
    name: 'India',
    company: 'Blue Square',
    photo: assetsPathTo('/images/agents/es-india.png'),
    photo_retina: assetsPathTo('/images/agents/es-india@2x.png'),
  },
  {
    id: 3,
    name: 'Sebastian',
    company: 'Bromley Estates Marbella',
    photo: assetsPathTo('/images/agents/es-sebastian.png'),
    photo_retina: assetsPathTo('/images/agents/es-sebastian@2x.png'),
  },
  {
    id: 4,
    name: 'Mandy',
    company: 'Living Blue',
    photo: assetsPathTo('/images/agents/es-mandy.png'),
    photo_retina: assetsPathTo('/images/agents/es-mandy@2x.png'),
  },
  {
    id: 5,
    name: 'Rudd',
    company: 'CasaXero',
    photo: assetsPathTo('/images/agents/es-rudd.png'),
    photo_retina: assetsPathTo('/images/agents/es-rudd@2x.png'),
  },
];

export const PORTUGAL = [
  {
    id: 7,
    name: 'Victor',
    company: 'Portugal Best Invest',
    photo: assetsPathTo('/images/agents/pt-victor.png'),
    photo_retina: assetsPathTo('/images/agents/pt-victor@2x.png'),
  },
  {
    id: 8,
    name: 'Chantal',
    company: 'Divine Home',
    photo: assetsPathTo('/images/agents/pt-chantal.png'),
    photo_retina: assetsPathTo('/images/agents/pt-chantal@2x.png'),
  },
  {
    id: 9,
    name: 'Angela',
    company: 'Idea Homes',
    photo: assetsPathTo('/images/agents/pt-angela.png'),
    photo_retina: assetsPathTo('/images/agents/pt-angela@2x.png'),
  },
];

export const ITALY = [
  {
    id: 10,
    name: 'Chiara',
    company: 'Horus Re Agency',
    photo: assetsPathTo('/images/agents/it-chiara.png'),
    photo_retina: assetsPathTo('/images/agents/it-chiara@2x.png'),
  },
  {
    id: 11,
    name: 'Beverley',
    company: 'Lake Como Properties',
    photo: assetsPathTo('/images/agents/it-beverley.png'),
    photo_retina: assetsPathTo('/images/agents/it-beverley@2x.png'),
  },
  {
    id: 12,
    name: 'Madeleine',
    company: 'Dream Homes Srl',
    photo: assetsPathTo('/images/agents/it-madeleine.png'),
    photo_retina: assetsPathTo('/images/agents/it-madeleine@2x.png'),
  },
];

export const FRANCE = [
  {
    id: 13,
    name: 'Margot',
    company: 'Artaxa Immo Sarl',
    photo: assetsPathTo('/images/agents/fr-margot.png'),
    photo_retina: assetsPathTo('/images/agents/fr-margot@2x.png'),
  },
  {
    id: 14,
    name: 'Ludovic',
    company: 'Pleiades Estate',
    photo: assetsPathTo('/images/agents/fr-ludovic.png'),
    photo_retina: assetsPathTo('/images/agents/fr-ludovic@2x.png'),
  },
];

export const FEATURED_AGENTS_DATA = {
  [COUNTRIES.SPAIN.id]: SPAIN,
  [COUNTRIES.PORTUGAL.id]: PORTUGAL,
  [COUNTRIES.ITALY.id]: ITALY,
  [COUNTRIES.FRANCE.id]: FRANCE,
};
