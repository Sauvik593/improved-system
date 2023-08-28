import { LINKS_SEED } from '@components/Header/NavlinksSeed';
import { createContext } from 'react';

interface Props {
  children: React.ReactNode;
}

export const LocalizationsLinksContext = createContext({
  features: {
    en: 'features',
    es: 'caracteristicas',
    it: 'caratteristiche',
    fr: 'caracteristiques',
    pt: 'funcionalidades',
  },
  pricing: {
    en: 'pricing',
    es: 'precios',
    it: 'prezzi',
    fr: 'tarification',
    pt: 'precos',
  },
  'tell-us-about': {
    en: 'tell-us-about',
    es: 'cuentanos-sobre',
    it: 'raccontaci-di-te',
    fr: 'parlez-nou',
    pt: 'fale-nos-sobre',
  },
  integrations: {
    en: 'features/integrations',
    es: 'caracteristicas/integraciones',
    it: 'caratteristiche/integrazioni',
    fr: 'caracteristiques/integrations',
    pt: 'funcionalidades/integracoes',
  },
  contact: {
    en: 'contact',
    es: 'contactar',
    pt: 'contactar',
    it: 'contatta',
    fr: 'contacter',
  },
});

export const LocalizationsLinksProvider = ({ children }: Props) => {
  return (
    <LocalizationsLinksContext.Provider value={LINKS_SEED}>
      {children}
    </LocalizationsLinksContext.Provider>
  );
};
