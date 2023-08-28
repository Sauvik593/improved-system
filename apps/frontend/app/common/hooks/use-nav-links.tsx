import { useTranslation } from 'react-i18next';
import { type AppContextProps, useAppContext } from '../contexts/app.context';

export const useNavLinks = (appContextGetter: () => AppContextProps = useAppContext) => {
  const { t } = useTranslation();

  const {
    routeLinks: { internal, external, social },
    adviceLink,
    countryName,
    countryKey,
  } = useAppContext();

  const stickyFooterLinks = [
    [t('common.footer.links.terms'), external.terms],
    [t('common.footer.links.privacy'), external.privacy],
    [t('common.footer.links.cookies'), external.cookies],
    [t('common.footer.links.cookie_preferences'), internal.cookie_preferences],
    [t('common.footer.links.sitemap'), internal.sitemap],
  ];

  const footerLinks = [
    {
      title: t('common.footer.sections.find_property_title'),
      links: [
        [t('common.footer.links.spain_search'), internal.properties_for_sale.spain],
        [t('common.footer.links.portugal_search'), internal.properties_for_sale.portugal],
        [t('common.footer.links.france_search'), internal.properties_for_sale.france],
        [t('common.footer.links.italy_search'), internal.properties_for_sale.italy],
      ],
    },
    {
      title: t('common.footer.sections.resources_title'),
      links: [
        [t('common.footer.links.market_data'), external.marketData],
        [t('common.footer.links.podcasts'), external.podcasts],
        [t('common.footer.links.advice'), external.spainGuide],
        [t('common.footer.links.agent_directory'), internal.agents_search[countryKey]],
      ],
    },

    {
      title: t('common.footer.sections.help_info_title'),
      links: [
        [t('common.footer.links.faq'), external.generalFAQ],
        [t('common.footer.links.contact_us'), external.joinContact],
        [t('common.footer.links.advertise'), external.join],
        [t('common.footer.links.work_with_us'), external.jobs],
        [t('common.footer.links.about_us'), internal.aboutUs],
      ],
    },
  ];

  const mainMenuLinks = [
    [t('common.main_menu.buy'), internal.properties_for_sale[countryKey]],
    [t('common.main_menu.rent'), internal.properties_to_rent[countryKey]],
    [t('common.main_menu.agents'), internal.agents_search[countryKey]],
    [t('common.main_menu.advice'), adviceLink],
  ].filter((link) => !!link[1]) as [string, string][];

  const mainMenuMobileLinks = [
    [t('common.main_menu.home'), internal.countryHomepage],
    [
      t('common.main_menu.buy_in_country', { countryName }),
      internal.properties_for_sale[countryKey],
    ],
    [t('common.main_menu.rent_in', { countryName }), internal.properties_to_rent[countryKey]],
    [t('common.main_menu.agents_in', { countryName }), internal.agents_search[countryKey]],
    [t('common.main_menu.advice'), adviceLink],
  ].filter((link) => !!link[1]) as [string, string][];

  return {
    stickyFooterLinks,
    footerLinks,
    mainMenuLinks,
    mainMenuMobileLinks,
    aboutUs: internal.aboutUs,
    advertiseLink: external.join,
    homepage: internal.countryHomepage,
    favourites: internal.favourites,
    enquiries: internal.enquiries,
    savedSearches: internal.savedSearches,
    logout: internal.logout,
    agents_search: internal.agents_search[countryKey],
    social,
    ...external,
  };
};
