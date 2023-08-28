export interface CountryCarouselItem {
  figure: string;
  key: string;
  population: string;
}

export const COUNTRY_CAROUSEL_SEED: CountryCarouselItem[] = [
  {
    figure: '/static/get-access/united-kingdom.jpg',
    key: 'general.countries.united_kingdom',
    population: '2,300,000',
  },
  {
    figure: '/static/get-access/spain.jpg',
    key: 'general.countries.spain',
    population: '1,790,000',
  },
  {
    figure: '/static/get-access/germany.jpg',
    key: 'general.countries.germany',
    population: '1,010,000',
  },
  {
    figure: '/static/get-access/france.jpg',
    key: 'general.countries.france',
    population: '1,000,000',
  },
  {
    figure: '/static/get-access/netherland.jpg',
    key: 'general.countries.netherlands',
    population: '970,000',
  },
  {
    figure: '/static/get-access/united-states.jpg',
    key: 'general.countries.united_states',
    population: '850,000',
  },
];
