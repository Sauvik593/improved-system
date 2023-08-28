import { useContext } from 'react';
import { CountryContext } from '@contexts/CountryContext';
import { LanguageContext } from '@contexts/LanguageContext';
import { createRelativeJoinPath } from '@helpers/links';
import { LocalizationsLinksContext } from '@contexts/LocalizationsLinksContext';

export const useInternalLinks = () => {
  const { country } = useContext(CountryContext);
  const { locale } = useContext(LanguageContext);
  const links = useContext(LocalizationsLinksContext);

  const pricingPath = createRelativeJoinPath({
    locale,
    country,
    paths: [links['pricing'][locale as keyof typeof links['pricing']]],
  });
  const contactPath = createRelativeJoinPath({
    locale,
    country,
    paths: [links['contact'][locale as keyof typeof links['contact']]],
  });
  const tellUsAboutPath = createRelativeJoinPath({
    locale,
    country,
    paths: [links['tell-us-about'][locale as keyof typeof links['tell-us-about']]],
  });
  const featuresPath = createRelativeJoinPath({
    locale,
    country,
    paths: [links['features'][locale as keyof typeof links['features']]],
  });
  const integrationsPath = createRelativeJoinPath({
    locale,
    country,
    paths: [links['integrations'][locale as keyof typeof links['integrations']]],
  });

  return {
    pricingPath,
    contactPath,
    tellUsAboutPath,
    featuresPath,
    integrationsPath,
  };
};
