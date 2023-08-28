export type ServerCountry = {
  id: number;
  key: string;
  code: string;
  translations: Record<string, string>;
  localizedForSaleRoutes: Record<string, string>;
  adviceLinks: Record<string, string>;
  buyersGuideLanguages: string[];
};

export const DEFAULT_COUNTRY_KEY = 'spain';

export const COUNTRIES = {
  SPAIN: {
    id: 55529,
    key: 'spain',
    code: 'es',
    translations: {
      ca: 'espanya',
      da: 'spanien',
      de: 'spanien',
      en: 'spain',
      es: 'españa',
      fi: 'espanjan',
      fr: 'espagne',
      it: 'spagna',
      nl: 'spanje',
      no: 'spania',
      pt: 'espanha',
      ru: 'испанию',
      sv: 'spanien',
    },
    localizedForSaleRoutes: {
      ca: '/ca/espanya-propietat-per-vendre-0l55529',
      da: '/da/spanien-ejendom-til-salg-0l55529',
      de: '/de/spanien-immobilien-kaufen-0l55529',
      es: '/es/españa-propiedad-en-venta-0l55529',
      en: '/en/spain-property-for-sale-0l55529',
      fi: '/fi/espanjan-kiinteistö-myytävänä-0l55529',
      fr: '/fr/espagne-immobilier-à-vendre-0l55529',
      it: '/it/spagna-proprietà-in-vendita-0l55529',
      nl: '/nl/spanje-vastgoed-te-koop-0l55529',
      no: '/no/spania-eiendom-til-salgs-0l55529',
      pt: '/pt/espanha-imóvel-para-vender-0l55529',
      ru: '/ru/испанию-недвижимость-на-продажу-0l55529',
      sv: '/sv/spanien-fastighet-till-salu-0l55529',
    },
    adviceLinks: {
      en: '/en/advice/spain',
      fr: '/fr/advice/espagne',
      nl: '/nl/advice/spanje',
      de: '/de/advice/spanien',
      it: '/it/advice/spagna',
      sv: '/sv/advice/spanien',
    },
    buyersGuideLanguages: ['de', 'en', 'fr', 'nl'],
  },
  PORTUGAL: {
    id: 55731,
    key: 'portugal',
    code: 'pt',
    translations: {
      ca: 'portugal',
      da: 'portugal',
      de: 'portugal',
      en: 'portugal',
      es: 'portugal',
      fi: 'portugali',
      fr: 'portugal',
      it: 'portogallo',
      nl: 'portugal',
      no: 'portugal',
      pt: 'portugal',
      ru: 'португалия',
      sv: 'portugal',
    },
    localizedForSaleRoutes: {
      ca: '/ca/portugal-propietat-per-vendre-0l55731',
      da: '/da/portugal-ejendom-til-salg-0l55731',
      de: '/de/portugal-immobilien-kaufen-0l55731',
      en: '/en/portugal-property-for-sale-0l55731',
      es: '/es/portugal-propiedad-en-venta-0l55731',
      fi: '/fi/portugali-kiinteistö-myytävänä-0l55731',
      fr: '/fr/portugal-immobilier-à-vendre-0l55731',
      it: '/it/portogallo-proprietà-in-vendita-0l55731',
      nl: '/nl/portugal-vastgoed-te-koop-0l55731',
      no: '/no/portugal-eiendom-til-salgs-0l55731',
      pt: '/pt/portugal-imóvel-para-vender-0l55731',
      ru: '/ru/португалия-недвижимость-на-продажу-0l55731',
      sv: '/sv/portugal-fastighet-till-salu-0l55731',
    },
    adviceLinks: {
      en: '/en/advice/portugal',
      fr: '/fr/advice/portugal',
      nl: '/nl/advice/portugal',
      de: '/de/advice/portugal',
      it: '/it/advice',
      sv: '/sv/advice',
    },
    buyersGuideLanguages: [],
  },
  FRANCE: {
    id: 55702,
    key: 'france',
    code: 'fr',
    translations: {
      ca: 'frança',
      da: 'frankrig',
      de: 'frankreich',
      en: 'france',
      es: 'francia',
      fi: 'ranska',
      fr: 'france',
      it: 'francia',
      nl: 'frankrijk',
      no: 'frankrike',
      pt: 'franca',
      ru: 'франция',
      sv: 'frankrike',
    },
    localizedForSaleRoutes: {
      ca: '/ca/frança-propietat-per-vendre-0l55702',
      da: '/da/frankrig-ejendom-til-salg-0l55702',
      de: '/de/frankreich-immobilien-kaufen-0l55702',
      en: '/en/france-property-for-sale-0l55702',
      es: '/es/francia-propiedad-en-venta-0l55702',
      fi: '/fi/ranska-kiinteistö-myytävänä-0l55702',
      fr: '/fr/france-immobilier-à-vendre-0l55702',
      it: '/it/francia-proprietà-in-vendita-0l55702',
      nl: '/nl/frankrijk-vastgoed-te-koop-0l55702',
      no: '/no/frankrike-eiendom-til-salgs-0l55702',
      pt: '/pt/frança-imóvel-para-vender-0l55702',
      ru: '/ru/франция-недвижимость-на-продажу-0l55702',
      sv: '/sv/frankrike-fastighet-till-salu-0l55702',
    },
    adviceLinks: {
      en: '/en/advice/france',
      fr: '/fr/advice',
      nl: '/nl/advice/frankrijk',
      de: '/de/advice/frankreich',
      it: '/it/advice',
      sv: '/sv/advice',
    },
    buyersGuideLanguages: [],
  },
  ITALY: {
    id: 55732,
    key: 'italy',
    code: 'it',
    translations: {
      ca: 'itàlia',
      da: 'italien',
      de: 'italien',
      en: 'italy',
      es: 'italia',
      fi: 'italia',
      fr: 'italie',
      it: 'italia',
      nl: 'italië',
      no: 'italia',
      pt: 'itália',
      ru: 'италия',
      sv: 'italien',
    },
    localizedForSaleRoutes: {
      ca: '/ca/itàlia-propietat-per-vendre-0l55732',
      da: '/da/italien-ejendom-til-salg-0l55732',
      de: '/de/italien-immobilien-kaufen-0l55732',
      en: '/en/italy-property-for-sale-0l55732',
      es: '/es/italia-propiedad-en-venta-0l55732',
      fi: '/fi/italia-kiinteistö-myytävänä-0l55732',
      fr: '/fr/italie-immobilier-à-vendre-0l55732',
      it: '/it/italia-proprietà-in-vendita-0l55732',
      nl: '/nl/italië-vastgoed-te-koop-0l55732',
      no: '/no/italia-eiendom-til-salgs-0l55732',
      pt: '/pt/itália-imóvel-para-vender-0l55732',
      ru: '/ru/италия-недвижимость-на-продажу-0l55732',
      sv: '/sv/italien-fastighet-till-salu-0l55732',
    },
    adviceLinks: {
      en: '/en/advice/italy',
      fr: '/fr/advice',
      nl: '/nl/advice/italie',
      de: '/de/advice/italien',
      it: '/it/advice',
      sv: '/sv/advice',
    },
    buyersGuideLanguages: [],
  },
};

const isCountryEqualTo =
  (locale: string, country: string) =>
  (route: { id: number; translations: Record<string, string> }) =>
    route['translations'][locale] === country;

export const getHomepageCountry = (locale: string, country: string) => {
  return Object.values(COUNTRIES).find(isCountryEqualTo(locale, country));
};
