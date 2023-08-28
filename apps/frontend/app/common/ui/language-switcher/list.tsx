import cn from 'classnames';
import { Link, useNavigate } from '@remix-run/react';
import { type MouseEvent } from 'react';
import { useAppContext } from '~/common/contexts/app.context';

import { TRANSLATIONS } from './constants';
import { assetsPathTo } from '~/common/client-router/helpers';
import { sendInstrument } from '~/modules/tracking/instrument';

export const LanguageSwitcherList = () => {
  const { locale, localizedRoutes } = useAppContext();
  const navigate = useNavigate();

  return (
    <ul className="mt-3 grid grid-cols-2 gap-2">
      {localizedRoutes.map((route) => {
        const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          sendInstrument('languageSwitcher.click');

          navigate(route.path);
        };

        const isActive = locale === route.locale;
        return (
          <li className="relative mb-1" key={`${route.locale}_${locale}`}>
            <Link
              to={route.path}
              prefetch="intent"
              className={cn('border-1 flex gap-4 rounded-md p-2', {
                'border-ocean-100 bg-sierra-night-10': isActive,
                'bg-sierra-night-5 hover:bg-sierra-night-10 border-transparent': !isActive,
              })}
              data-testid={`menu.language-switcher.${route.locale}`}
              data-active={isActive}
              onClick={handleClick}
            >
              <img
                width={24}
                height={24}
                src={assetsPathTo(`/images/locales/${route.locale}.png`)}
                srcSet={assetsPathTo(`/images/locales/${route.locale}@2x.png 2x`)}
                role="presentation"
                className="bg-sierra-night-10 rounded-full"
                alt=""
              />
              <span className="text-sierra-night-100 font-bold">
                {TRANSLATIONS[route.locale as keyof typeof TRANSLATIONS]}
              </span>
              <div
                className={cn(
                  'bg-ocean-100 bg- absolute -top-2 -right-2 h-4 w-4 overflow-hidden rounded-full bg-[length:80%_80%] bg-center bg-no-repeat',
                  ` bg-[url('/new-frontend-assets/images/check.svg')]`,
                  {
                    invisible: !isActive,
                  },
                )}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
