import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'classnames';

import { useNavLinks } from '@hooks/useNavLinks';

export const NavLinks = () => {
  const { t } = useTranslation('common');
  const links = useNavLinks();
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <nav>
      <ul className="items-center justify-center lg:flex lg:space-x-3 lg:space-y-0">
        {links.map((items, index) => (
          <li key={index}>
            <Link href={items.path}>
              <a
                className={cn(
                  'text-h-5 lg:text-h-5-sm  hover:bg-sierra-night-10 block rounded-none  border-l-4 border-solid border-transparent p-5 py-3 font-bold lg:flex lg:rounded lg:border-0 lg:py-1',
                  {
                    'bg-sierra-night-10 border-ocean-100 ': pathname == items.path,
                  },
                )}
              >
                {t(items.key)}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
