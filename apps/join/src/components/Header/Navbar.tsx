import Link from 'next/link';
import { JoinLogo } from '@kyero/icons';

import { NavLinks } from './NavLinks';
import { useTranslation } from 'next-i18next';
import { Country } from '@lib/types';

interface Props {
  country: Country | null;
}

export const Navbar = ({ country }: Props) => {
  const { t } = useTranslation('common');
  return (
    <nav className="flex items-center justify-between gap-6" aria-label={t('header.menu.label')}>
      <Link href="/">
        <a>
          <JoinLogo />
        </a>
      </Link>
      {!!country && <NavLinks />}
    </nav>
  );
};
