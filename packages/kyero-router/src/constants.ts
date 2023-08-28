import type { TranslationRoute } from './types';

export const FRONTEND_URL = process.env['FRONTEND_URL'] || 'https://www.kyero.com';
export const ASSETS_URL = process.env['ASSETS_URL'] || 'https://data-assets.kyero.com';

export const GUIDES_LOCALES = ['de', 'fr', 'nl'];

export const GUIDES_ADVICE_ROUTES: TranslationRoute = {
  fr: '/fr/advice',
  nl: '/nl/advice',
  de: '/de/advice',
  it: '/it/advice',
  sv: '/sv/advice',
  default: '/en/advice',
};

export const GUIDES_SPAIN_ROUTES: TranslationRoute = {
  de: '/en/advice/spanien',
  fr: '/fr/advice/espagne',
  nl: '/nl/advice/spanje',
  it: '/it/advice/spagna',
  sv: '/sv/advice/spanien',
  default: '/en/advice',
};

export const GUIDES_PORTUGAL_ROUTES: TranslationRoute = {
  de: '/en/advice/spanien',
  fr: '/fr/advice/portugal',
  nl: '/nl/advice/spanje',
  default: '/en/advice/portugal',
};

export const GUIDES_ITALY_ROUTES: TranslationRoute = {
  de: '/en/advice/italien',
  nl: '/nl/advice/italie',
  default: '/en/advice/italy',
};

export const GUIDES_FRANCE_ROUTES: TranslationRoute = {
  de: '/de/advice/frankreich',
  nl: '/nl/advice/frankrijk',
  default: '/en/advice/france',
};

export const GUIDES_BUYERS_GUIDE_ROUTES: TranslationRoute = {
  de: '/guides/de/spain-guide',
  fr: '/guides/fr/spain-guide',
  nl: '/guides/nl/spain-guide',
  default: '/guides/en/spain-guide',
};

export const GUIDES_PDF_ROUTES: TranslationRoute = {
  de: '/guides/Kyero-Spanien-Handbuch.pdf',
  fr: '/guides/Kyero-Guide-Espagne.pdf',
  nl: '/guides/Kyero-spanje-handboek.pdf',
  default: '/guides/Kyero-Spain-Guide.pdf',
};

export const DOCS_URL = process.env['DOCS_URL'] || 'https://docs.kyero.com';
export const DOCS_LOCALES = [
  'ca',
  'da',
  'de',
  'en',
  'es',
  'fi',
  'fr',
  'it',
  'nl',
  'no',
  'pt',
  'ru',
  'sv',
];

export const DATA_URL = process.env['DATA_URL'] || 'https://data.kyero.com';
export const MARKET_DATA_ROUTES: TranslationRoute = {
  ca: '/dades/espanya',
  da: '/data/spanien',
  de: '/daten/spanien',
  en: '/data/spain',
  es: '/datos/espana',
  fr: '/donnees/espagne',
  it: '/dati/spagna',
  nl: '/gegevens/spanje',
  no: '/data/spania',
  fi: '/data/espanja',
  pt: '/dados/espanha',
  sv: '/data/spanien',
  ru: '/data/spain',
};
export const AFFORDABILITY_DATA_ROUTES: TranslationRoute = {
  ca: '/eines/espanya/assequibilitat-calculadora',
  da: '/redskaber/spanien/regn-ud-hvad-du-har-rad-til',
  de: '/werkzeuge/spanien/rechner-finanzierbarkeit',
  en: '/tools/spain/affordability-calculator',
  es: '/herramientas/espana/calculadora-asequibilidad',
  fr: '/outils/espagne/calculateur-de-capacite-financiere',
  it: '/strumenti/spagna/calcolatore-convenienza',
  nl: '/tools/spanje/betaalbaarheidscalculator',
  no: '/verktoy/spania/kalkulator-for-hva-du-har-rad-til',
  fi: '/tyokalut/espanja/kohtuuhintaisuuslaskuri',
  pt: '/ferramentas/espanha/calculadora-acessibilidade',
  sv: '/verktyg/spanien/overkomlighets-kalkylator',
  ru: '/tools/spain/affordability-calculator',
};

export const ID_BASE_URL = process.env['ID_BASE_URL'] || 'https://id.kyero.com';

export const JOIN_URL = process.env['JOIN_URL'] || 'https://www.kyero.com/join';
export const JOIN_LOCALES = ['it', 'fr', 'pt', 'es'];
export const JOIN_CONTACT_ROUTES: TranslationRoute = {
  it: '/mettiti-in-contatto',
  fr: '/contactez-nous',
  pt: '/contacte-nos',
  es: '/pongase-en-contacto',
  default: '/en/get-in-touch',
};

export const SUPPORT_URL = process.env['SUPPORT_URL'] || 'https://help.kyero.com';
export const SUPPORT_AGENT_FAQ_ROUTES: TranslationRoute = {
  es: '/inmobiliarias',
  default: '/estate-agents',
};
export const SUPPORT_BUYERS_FAQ_ROUTES: TranslationRoute = {
  es: '/visitantes',
  default: '/visitors',
};

export const SUPPORT_ROUTES: TranslationRoute = {
  ca: '/ca-es',
  da: '/da',
  de: '/de',
  en: '/',
  es: '/es',
  fi: '/fi',
  fr: '/fr',
  it: '/it',
  nl: '/nl',
  no: '/no-no',
  pt: '/pt-pt',
  ru: '/ru',
  sv: '/sv',
  default: '/',
};
