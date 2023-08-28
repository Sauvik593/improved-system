export interface Agent {
  name: string;
  figure: string;
}

export type AgentsSeed = {
  [country: string]: Agent[];
};

export const AGENTS_SEED = {
  spain: [
    {
      name: 'Lucas Fox',
      figure: 'lucas-fox',
    },
    {
      name: 'Affinity Spain',
      figure: 'affinity-spain',
    },
    {
      name: 'Re/Max',
      figure: 'remax',
    },
    {
      name: 'Century 21',
      figure: 'century-21',
    },
    {
      name: 'Engel & Völkers',
      figure: 'engel-volkers',
    },
    {
      name: 'Taylor Wimpey',
      figure: 'taylor-wimpey',
    },
  ],
  portugal: [
    {
      name: 'Propriété Générale International Real Estate',
      figure: 'propriete-generale',
    },
    {
      name: 'JLL - Jones Lang LaSalle',
      figure: 'jll',
    },
    {
      name: 'IMOJOY',
      figure: 'imojoy',
    },
    {
      name: 'ERA',
      figure: 'era',
    },
    {
      name: 'Coldwell Banker',
      figure: 'coldwell-banker',
    },
    {
      name: 'Infante & Riu',
      figure: 'infante-riu',
    },
  ],
  france: [
    {
      name: 'IAD France',
      figure: 'iad-france',
    },
    {
      name: 'Home Hunts SARL',
      figure: 'home-hunts-sarl',
    },
    {
      name: 'Beaux Villages Immobilier',
      figure: 'beaux-villages',
    },
    {
      name: 'Barnes',
      figure: 'barnes',
    },
    {
      name: 'TIC IMMOBILIER',
      figure: 'tic-immobilier',
    },
    {
      name: 'La Résidence - The French Property People',
      figure: 'la-residence',
    },
  ],
  italy: [
    {
      name: 'IMMOBILIARE RAPPUOLI S.R.L.',
      figure: 'immobiliare-rappuoli',
    },
    {
      name: 'ASIP sas di Maurizio Bolognini e C',
      figure: 'asip',
    },
    {
      name: 'Aquamarina Real Estate',
      figure: 'aquamarina',
    },
    {
      name: 'Alfano Real Estate',
      figure: 'alfano',
    },
    {
      name: 'Immobiliare Botto',
      figure: 'immobiliare-botto',
    },
    {
      name: 'Coldwell Banker',
      figure: 'coldwell-banker',
    },
  ],
};
