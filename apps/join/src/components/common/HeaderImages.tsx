import { StaticImageData } from 'next/image';
import Spain from '../../../public/images/country-list/spain.png';
import Portugal from '../../../public/images/country-list/portugal.png';
import France from '../../../public/images/country-list/france.png';
import Italy from '../../../public/images/country-list/italy.png';
import UnitedKingdom from '../../../public/images/country-list/united-kingdom.png';

interface HeaderImages {
  [key: string]: StaticImageData;
}

export const CountryImages: HeaderImages = {
  spain: Spain,
  portugal: Portugal,
  france: France,
  italy: Italy,
};

export const LocaleImages: HeaderImages = {
  en: UnitedKingdom,
  es: Spain,
  pt: Portugal,
  fr: France,
  it: Italy,
};
