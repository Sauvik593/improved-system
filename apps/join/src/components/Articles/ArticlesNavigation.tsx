import NextLink from 'next/link';
import { useTranslation } from 'next-i18next';

import cn from 'classnames';

interface Props {
  activeName: string;
  links: { name: string; url: string }[];
}

export const ArticlesNavigation = ({ activeName, links }: Props) => {
  const { t } = useTranslation('common');
  return (
    <section className="flex overflow-auto py-3">
      <ul className="flex gap-3 whitespace-nowrap">
        <li className="text-h-5 font-bold text-white">
          <p>{t('articles.navigation.label')}</p>
        </li>
        {links.map((link) => {
          return (
            <li key={link.name}>
              <NextLink href={link.url}>
                <a
                  className={cn('rounded-full border-2 border-white px-3 py-2 font-bold', {
                    'text-sierra-night-100 bg-white': activeName === link.name,
                    'bg-ocean-100 text-white': activeName !== link.name,
                  })}
                >
                  {link.name}
                </a>
              </NextLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
