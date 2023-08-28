import { assetsPathTo } from '~/common/client-router/helpers';
import { COUNTRIES } from '../country-specific/helpers';
import { type Guide } from './get-guides.server';

export interface GuidesTranslation {
  [locale: string]: Guide[];
}

export const SPAIN: GuidesTranslation = {
  ca: [],
  da: [],
  de: [
    {
      name: 'Mallorca',
      description: 'Die belebteste Insel der Balearen, es gibt viel zu entdecken auf Mallorca!',
      type: 'location',
      url: 'https://www.kyero.com/de/advice/spanien/orte-zum-leben/mallorca-0l55563',
      img: assetsPathTo('/images/advice-images/0l55563.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/0l55563@2x.jpg'),
    },
    {
      name: 'Provinz Alicante',
      description:
        'Alicante ist berühmt für die langen Sandstrände und versteckten Buchten der Costa Blanca.',
      type: 'location',
      url: 'https://www.kyero.com/de/advice/spanien/orte-zum-leben/provinz-alicante-0l3',
      img: assetsPathTo('/images/advice-images/0l3.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/0l3@2x.jpg'),
    },
    {
      name: 'Andalusien',
      description:
        'Atemberaubende Naturlandschaften und mittelalterliche arabische Einflüsse füllen dieses historische und sinnliche Land.',
      type: 'location',
      url: 'https://www.kyero.com/de/advice/spanien/orte-zum-leben/andalusien-0l55531',
      img: assetsPathTo('/images/advice-images/0l55531.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/0l55531@2x.jpg'),
    },
  ],
  en: [
    {
      title: 'Exploring the advantages of living in Spain',
      category: 'Why move to Spain',
      type: 'article',
      url: 'https://www.kyero.com/en/advice/spain/moving-to-spain/why-move-to-spain/pros-and-cons-of-living-abroad',
      img: assetsPathTo('/images/advice-images/pros-and-cons-of-living-abroad.png'),
      imgRetina: assetsPathTo('/images/advice-images/pros-and-cons-of-living-abroad@2x.png'),
    },
    {
      title: 'Our favourite Spanish properties with a pool',
      category: 'Best properties in Spain',
      type: 'article',
      url: 'https://www.kyero.com/en/advice/spain/best-properties-in-spain/properties/spanish-properties-with-pool',
      img: assetsPathTo('/images/advice-images/spanish-properties-with-pool.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/spanish-properties-with-pool@2x.jpg'),
    },
    {
      title: '101 Reasons to move to Spain',
      category: 'Moving to Spain',
      type: 'article',
      url: 'https://www.kyero.com/en/advice/spain/moving-to-spain/why-move-to-spain/101-reasons-to-move-to-spain',
      img: assetsPathTo('/images/advice-images/101-reasons-to-move-to-spain.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/101-reasons-to-move-to-spain@2x.jpg'),
    },
  ],
  es: [],
  fi: [],
  fr: [
    {
      title: 'Les 11 meilleures destinations pour les nomades numériques',
      category: 'Destinations',
      type: 'article',
      url: 'https://www.kyero.com/fr/advice/espagne/meilleures-proprietes-en-espagne/destinations/les-11-meilleures-destinations-pour-les-nomades-numeriques',
      img: assetsPathTo(
        '/images/advice-images/les-11-meilleures-destinations-pour-les-nomades-numeriques.jpg',
      ),
      imgRetina: assetsPathTo(
        '/images/advice-images/les-11-meilleures-destinations-pour-les-nomades-numeriques@2x.jpg',
      ),
    },
    {
      title: 'Guide pour créer une entreprise en Espagne',
      category: 'S’installer en Espagne',
      type: 'article',
      url: 'https://www.kyero.com/fr/advice/espagne/installer-en-espagne/travail-et-emplois-en-espagne/guide-pour-creer-une-entreprise',
      img: assetsPathTo('/images/advice-images/guide-pour-creer-une-entreprise.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/guide-pour-creer-une-entreprise@2x.jpg'),
    },
    {
      title: 'Acheter une propriété en Espagne : 7 conseils importants',
      category: 'Processus d’achat',
      type: 'article',
      url: 'https://www.kyero.com/fr/advice/espagne/acheter-en-espagne/processus-dachat-en-espagne/acheter-une-propriete-en-Espagne-7-conseils-importants',
      img: assetsPathTo(
        '/images/advice-images/acheter-une-propriete-en-espagne-7-conseils-importants.png',
      ),
      imgRetina: assetsPathTo(
        '/images/advice-images/acheter-une-propriete-en-espagne-7-conseils-importants@2x.png',
      ),
    },
  ],
  it: [
    {
      name: 'Andalusia',
      description:
        'Paesaggi naturali mozzafiato e retaggio culturale arabo riempiono questa terra storica e sensuale.',
      type: 'location',
      url: 'https://www.kyero.com/it/advice/spagna/luoghi-in-cui-vivere/andalusia-0l55531',
      img: assetsPathTo('/images/advice-images/0l55531.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/0l55531@2x.jpg'),
    },
    {
      name: 'Isole Baleari',
      description: 'Le Baleari, un arcipelago a largo della costa orientale spagnola.',
      type: 'location',
      url: 'https://www.kyero.com/it/advice/spagna/luoghi-in-cui-vivere/isole-baleari-0l55534',
      img: assetsPathTo('/images/advice-images/0l55534.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/0l55534@2x.jpg'),
    },
    {
      name: 'Maiorca',
      description: 'La città più affollata delle Baleari in cui c’è tanto da scoprire.',
      type: 'location',
      url: 'https://www.kyero.com/it/advice/spagna/luoghi-in-cui-vivere/maiorca-0l55563',
      img: assetsPathTo('/images/advice-images/0l55563.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/0l55563@2x.jpg'),
    },
  ],
  nl: [
    {
      name: 'Andalusië',
      description:
        'Dit historische en sensuele land van flamenco, troubadours en Moorse architectuur bestaat uit adembenemende natuurlijke landschappen',
      type: 'location',
      url: 'https://www.kyero.com/nl/advice/spanje/plaatsen-om-te-wonen/andalusie-0l55531',
      img: assetsPathTo('/images/advice-images/0l55531.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/0l55531@2x.jpg'),
    },
    {
      name: 'De provincie Alicante',
      description:
        'Beroemd om de lange zandstranden en de verborgen ruige baaien van de Costa Blanca.',
      type: 'location',
      url: 'https://www.kyero.com/nl/advice/spanje/plaatsen-om-te-wonen/de-provincie-alicante-0l3',
      img: assetsPathTo('/images/advice-images/0l3.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/0l3@2x.jpg'),
    },
    {
      name: 'Costa de Almería',
      description:
        'De Costa de Almería in de autonome regio Andalusië is een kustlijn van 220 kilometer.',
      type: 'location',
      url: 'https://www.kyero.com/nl/advice/spanje/plaatsen-om-te-wonen/costa-de-almeria-0l55614',
      img: assetsPathTo('/images/advice-images/0l55614.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/0l55614@2x.jpg'),
    },
  ],
  no: [],
  pt: [],
  ru: [],
  sv: [],
};

export const PORTUGAL: GuidesTranslation = {
  ca: [],
  da: [],
  de: [
    {
      title: 'Die besten Orte zum Leben in Portugal',
      category: 'Ziele"',
      type: 'article',
      url: 'https://www.kyero.com/de/advice/portugal/besten-immobilien-in-portugal/ziele/12-beste-umzugsziele-in-portugal',
      img: assetsPathTo('/images/advice-images/12-beste-umzugsziele-in-portugal.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/12-beste-umzugsziele-in-portugal@2x.jpg'),
    },
    {
      title: 'Arbeiten in Portugal',
      category: 'Arbeit und Beschäftigung',
      type: 'article',
      url: 'https://www.kyero.com/de/advice/portugal/umzug-nach-portugal/arbeit-und-beschaftigung/arbeiten-in-portugal',
      img: assetsPathTo('/images/advice-images/arbeiten-in-portugal.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/arbeiten-in-portugal@2x.jpg'),
    },
    {
      title: 'Ferienhaus in Portugal kaufen',
      category: 'Der Kaufprozess',
      type: 'article',
      url: 'https://www.kyero.com/de/advice/portugal/umzug-nach-portugal/der-kaufprozess/ferienhaus-in-portugal-kaufen',
      img: assetsPathTo('/images/advice-images/ferienhaus-in-portugal-kaufen.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/ferienhaus-in-portugal-kaufen@2x.jpg'),
    },
  ],
  en: [
    {
      title: 'Portugal weather guide',
      category: 'Living in Portugal',
      type: 'article',
      url: 'https://www.kyero.com/en/advice/portugal/living-in-portugal/weather/portugal-weather-guide',
      img: assetsPathTo('/images/advice-images/portugal-weather-guide.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/portugal-weather-guide@2x.jpg'),
    },
    {
      title: 'Act quickly: Portugal Golden Visa is changing',
      category: 'Visas',
      type: 'article',
      url: 'https://www.kyero.com/en/advice/portugal/moving-to-portugal/visas/portugal-golden-visa-requirements-and-how-to-get-it',
      img: assetsPathTo(
        '/images/advice-images/portugal-golden-visa-requirements-and-how-to-get-it.png',
      ),
      imgRetina: assetsPathTo(
        '/images/advice-images/portugal-golden-visa-requirements-and-how-to-get-it@2x.png',
      ),
    },
    {
      title: 'Retiring in Portugal',
      category: 'Moving to Portugal',
      type: 'article',
      url: 'https://www.kyero.com/en/advice/portugal/moving-to-portugal/retirement/retiring-to-portugal',
      img: assetsPathTo('/images/advice-images/retiring-to-portugal.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/retiring-to-portugal@2x.jpg'),
    },
  ],
  es: [],
  fi: [],
  fr: [
    {
      title: 'Les meilleurs endroits où s’installer au Portugal',
      category: 'Destinations',
      type: 'article',
      url: 'https://www.kyero.com/fr/advice/portugal/meilleures-proprietes-au-portugal/destinations/les-12-meilleures-destinations-pour-s-installer-au-portugal',
      img: assetsPathTo(
        '/images/advice-images/les-12-meilleures-destinations-pour-s-installer-au-portugal.jpg',
      ),
      imgRetina: assetsPathTo(
        '/images/advice-images/les-12-meilleures-destinations-pour-s-installer-au-portugal@2x.jpg',
      ),
    },
    {
      title: 'Travailler au Portugal',
      type: 'article',
      category: 'S’installer au Portugal',
      url: 'https://www.kyero.com/fr/advice/portugal/installer-au-portugal/travail-et-emplois/travailler-au-portugal',
      img: assetsPathTo('/images/advice-images/travailler-au-portugal.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/travailler-au-portugal@2x.jpg'),
    },
    {
      title: 'Acheter une résidence secondaire au Portugal',
      type: 'article',
      category: 'Processus d’achat',
      url: 'https://www.kyero.com/fr/advice/portugal/acheter-au-portugal/processus-d-achat/acheter-une-residence-secondaire-au-portugal',
      img: assetsPathTo('/images/advice-images/acheter-une-residence-secondaire-au-portugal.jpg'),
      imgRetina: assetsPathTo(
        '/images/advice-images/acheter-une-residence-secondaire-au-portugal@2x.jpg',
      ),
    },
  ],
  it: [],
  nl: [
    {
      title: 'Werken in Portugal',
      type: 'article',
      category: 'Verhuizen naar Portugal',
      url: 'https://www.kyero.com/nl/advice/portugal/verhuizen-naar-portugal/werken-en-banen/werken-in-portugal',
      img: assetsPathTo('/images/advice-images/werken-in-portugal.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/werken-in-portugal@2x.jpg'),
    },
    {
      title: 'Pensioneren in Portugal',
      type: 'article',
      category: 'Pensioen',
      url: 'https://www.kyero.com/nl/advice/portugal/verhuizen-naar-portugal/pensioen/pensioneren-in-portugal',
      img: assetsPathTo('/images/advice-images/retiring-to-portugal.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/retiring-to-portugal@2x.jpg'),
    },
    {
      title: 'Alles over je huisdier meenemen naar Portugal',
      type: 'article',
      category: 'Huisdieren',
      url: 'https://www.kyero.com/nl/advice/portugal/verhuizen-naar-portugal/huisdieren/je-huisdier-meenemen-naar-portugal',
      img: assetsPathTo('/images/advice-images/je-huisdier-meenemen-naar-portugal.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/je-huisdier-meenemen-naar-portugal@2x.jpg'),
    },
  ],
  no: [],
  pt: [],
  ru: [],
  sv: [],
};

export const FRANCE: GuidesTranslation = {
  ca: [],
  da: [],
  de: [
    {
      title: 'Steuern in Frankreich: Das System als Expat verstehen',
      type: 'article',
      category: 'Kaufen in Frankreich',
      url: 'https://www.kyero.com/de/advice/frankreich/kaufen-in-frankreich/steuern/steuern-in-frankreich',
      img: assetsPathTo('/images/advice-images/steuern-in-frankreich.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/steuern-in-frankreich@2x.jpg'),
    },
    {
      title: 'Arbeiten in Frankreich',
      type: 'article',
      category: 'Umzug nach Frankreich',
      url: 'https://www.kyero.com/de/advice/frankreich/umzug-nach-frankreich/arbeit-und-beschaftigung/arbeiten-in-frankreich',
      img: assetsPathTo('/images/advice-images/arbeiten-in-frankreich.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/arbeiten-in-frankreich@2x.jpg'),
    },
    {
      title: "11 beste Umzugsziele an der Côte d'Azur",
      type: 'article',
      category: '"Ziele',
      url: 'https://www.kyero.com/de/advice/frankreich/besten-immobilien-in-frankreich/ziele/die-besten-umzugsziele-zum-leben-an-der-dote-d-azur',
      img: assetsPathTo(
        '/images/advice-images/die-besten-umzugsziele-zum-leben-an-der-dote-d-azur.jpg',
      ),
      imgRetina: assetsPathTo(
        '/images/advice-images/die-besten-umzugsziele-zum-leben-an-der-dote-d-azur@2x.jpg',
      ),
    },
  ],
  en: [
    {
      title: 'Step by step guide to buying property in France',
      category: 'The Buying Process',
      type: 'article',
      url: 'https://www.kyero.com/en/advice/france/buying-in-france/the-buying-process/buying-house-france',
      img: assetsPathTo('/images/advice-images/buying-house-france.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/buying-house-france  @2x.jpg'),
    },
    {
      title: 'Top 5 cheapest destinations to fly to in France',
      type: 'article',
      category: 'Living in France',
      url: 'https://www.kyero.com/en/advice/france/living-in-france/expats/top-5-cheapest-destinations-to-fly-to-in-france',
      img: assetsPathTo(
        '/images/advice-images/top-5-cheapest-destinations-to-fly-to-in-france.jpg',
      ),
      imgRetina: assetsPathTo(
        '/images/advice-images/top-5-cheapest-destinations-to-fly-to-in-france@2x.jpg',
      ),
    },
    {
      title: 'Retiring to France - A Guide',
      type: 'article',
      category: 'Moving to France',
      url: 'https://www.kyero.com/en/advice/france/moving-to-france/retirement/retiring-to-france-a-guide',
      img: assetsPathTo('/images/advice-images/retiring-to-france-a-guide.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/retiring-to-france-a-guide@2x.jpg'),
    },
  ],
  es: [],
  fi: [],
  fr: [],
  it: [],
  nl: [
    {
      title:
        'Juridische vereisten wanneer je vanuit het Verenigd Koninkrijk naar Frankrijk verhuist',
      category: '"Verblijf"',
      type: 'article',
      url: 'https://www.kyero.com/nl/advice/frankrijk/verhuizen-naar-frankrijk/verblijf/verhuizen-naar-frankrijk-vanuit-het-vk',
      img: assetsPathTo('/images/advice-images/verhuizen-naar-frankrijk-vanuit-het-vk.jpg'),
      imgRetina: assetsPathTo(
        '/images/advice-images/verhuizen-naar-frankrijk-vanuit-het-vk@2x.jpg',
      ),
    },
    {
      title: 'Stappenplan voor het kopen van een huis in Frankrijk',
      type: 'article',
      category: 'Het koopproces',
      url: 'https://www.kyero.com/nl/advice/frankrijk/kopen-in-frankrijk/het-koopproces/huis-kopen-frankrijk',
      img: assetsPathTo('/images/advice-images/huis-kopen-frankrijk.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/huis-kopen-frankrijk@2x.jpg'),
    },
    {
      title: 'Een hypotheek op een Franse woning: alles wat je als buitenlander moet weten',
      type: 'article',
      category: 'Hypotheek',
      url: 'https://www.kyero.com/nl/advice/frankrijk/kopen-in-frankrijk/hypotheek/gids-hypotheek-voor-een-woning-in-frankrijk',
      img: assetsPathTo('/images/advice-images/gids-hypotheek-voor-een-woning-in-frankrijk.jpg'),
      imgRetina: assetsPathTo(
        '/images/advice-images/gids-hypotheek-voor-een-woning-in-frankrijk@2x.jpg',
      ),
    },
  ],
  no: [],
  pt: [],
  ru: [],
  sv: [],
};

export const ITALY: GuidesTranslation = {
  ca: [],
  da: [],
  de: [
    {
      title: 'Die 11 besten Orte zum Leben in Italien',
      category: '"Ziele',
      type: 'article',
      url: 'https://www.kyero.com/de/advice/italien/die-besten-immobilien-in-italien/ziele/die-11-besten-orte-zum-leben-in-italien',
      img: assetsPathTo('/images/advice-images/die-11-besten-orte-zum-leben-in-italien.jpg'),
      imgRetina: assetsPathTo(
        '/images/advice-images/die-11-besten-orte-zum-leben-in-italien@2x.jpg',
      ),
    },
    {
      title: 'Kauf einer Immobilie in Italien: Ablauf beim Immobilienkauf: Die einzelnen Schritte',
      category: 'Kaufabwicklung',
      type: 'article',
      url: 'https://www.kyero.com/de/advice/italien/kaufen-in-italien/kaufabwicklung/immobilienkauf-in-italien',
      img: assetsPathTo('/images/advice-images/je-huisdier-meenemen-naar-portugal.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/je-huisdier-meenemen-naar-portugal@2x.jpg'),
    },
    {
      title: 'Aufnahme einer Hypothek in Italien: Voraussetzungen und nützliche Tipps',
      type: 'article',
      category: 'Hypothek',
      url: 'https://www.kyero.com/de/advice/italien/kaufen-in-italien/hypothek/hypothek-in-italien',
      img: assetsPathTo('/images/advice-images/immobilienkauf-in-italien.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/immobilienkauf-in-italien@2x.jpg'),
    },
  ],
  en: [
    {
      title: '11 best destinations to live in Italy',
      type: 'article',
      category: 'Destinations',
      url: 'https://www.kyero.com/en/advice/italy/best-properties-in-italy/destinations/11-best-destinations-to-move-to-italy',
      img: assetsPathTo('/images/advice-images/11-best-destinations-to-move-to-italy.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/11-best-destinations-to-move-to-italy@2x.jpg'),
    },
    {
      title: '2023 Cost of living in Italy: A guide to how much it costs to live in Italy',
      type: 'article',
      category: 'Living in Italy',
      url: 'https://www.kyero.com/en/advice/italy/living-in-italy/expats/cost-of-living-in-italy',
      img: assetsPathTo('/images/advice-images/cost-of-living-in-italy.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/cost-of-living-in-italy@2x.jpg'),
    },
    {
      title: 'Retiring to Italy: Everything you need to know',
      type: 'article',
      category: 'Retirement',
      url: 'https://www.kyero.com/en/advice/italy/moving-to-italy/retirement/retiring-to-italy',
      img: assetsPathTo('/images/advice-images/retiring-to-italy.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/retiring-to-italy@2x.jpg'),
    },
  ],
  es: [],
  fi: [],
  fr: [],
  it: [],
  nl: [
    {
      title: 'Alles wat je moet weten over de Italiaanse gezondheidszorg',
      category: 'Gezondheidszorg',
      type: 'article',
      url: 'https://www.kyero.com/nl/advice/italie/wonen-in-italie/gezondheidszorg/gezondheidszorg-in-italie',
      img: assetsPathTo('/images/advice-images/gezondheidszorg-in-italie.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/gezondheidszorg-in-italie@2x.jpg'),
    },
    {
      title: 'Een huis kopen in Italië: zo werkt het',
      category: 'Het koopproces',
      type: 'article',
      url: 'https://www.kyero.com/nl/advice/italie/kopen-in-italie/het-koopproces/een-huis-kopen-in-italie-zo-werkt-het',
      img: assetsPathTo('/images/advice-images/een-huis-kopen-in-italie-zo-werkt-het.jpg'),
      imgRetina: assetsPathTo('/images/advice-images/een-huis-kopen-in-italie-zo-werkt-het@2x.jpg'),
    },
  ],
  no: [],
  pt: [],
  ru: [],
  sv: [],
};

export const GUIDES_DATA = {
  [COUNTRIES.SPAIN.id]: SPAIN,
  [COUNTRIES.PORTUGAL.id]: PORTUGAL,
  [COUNTRIES.ITALY.id]: ITALY,
  [COUNTRIES.FRANCE.id]: FRANCE,
};
