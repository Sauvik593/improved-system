import { useTranslation } from 'react-i18next';
import { useNavLinks } from '../hooks/use-nav-links';
import { useAppContext } from '../contexts/app.context';

import LogoWide from '~/../public/images/logo-wide.svg';

export const HomepageLogoLink = () => {
  const { t } = useTranslation();
  const { countryKey } = useAppContext();
  const { homepage } = useNavLinks();

  const title = `Kyero - ${t(`common.homepage.${countryKey}.meta.title`)}`;

  return (
    <a href={homepage}>
      <img
        src={LogoWide}
        alt="Kyero logo"
        title={title}
        className="w-[120px] lg:w-[125px]"
        width="125px"
        height="32px"
      />
    </a>
  );
};
