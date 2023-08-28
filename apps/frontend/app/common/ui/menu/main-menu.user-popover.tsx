import cn from 'classnames';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Trans } from 'react-i18next';

import AccountIcon from '~/../public/images/icons/account.svg';
import LogOutIcon from '~/../public/images/icons/log-out.svg';
import SearchIcon from '~/../public/images/icons/search.svg';
import FavouritesIcon from '~/../public/images/icons/favourites.svg';
import CommentsIcon from '~/../public/images/icons/comments.svg';

import { type User } from '~/modules/auth/types';
import { useNavLinks } from '~/common/hooks/use-nav-links';

export const MainMenuUserPopover = ({ user }: { user: User }) => {
  const { enquiries, favourites, savedSearches, account, logout } = useNavLinks();

  const ITEMS = [
    ['common.user_menu.links.enquiries', enquiries, CommentsIcon],
    ['common.user_menu.links.favourites', favourites, FavouritesIcon],
    ['common.user_menu.links.saved_searches', savedSearches, SearchIcon],
    ['common.user_menu.links.account', account, AccountIcon],
  ];
  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center p-2" data-testid="desktop-menu.user-popover">
        {() => (
          <>
            <i className="bg-sierra-night-5 -mr-9 flex h-full w-20 items-center rounded-full py-2 px-3">
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M3 18.0029H21"
                  stroke="#133250"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 12.0029H21"
                  stroke="#133250"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6.00293H21"
                  stroke="#133250"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </i>
            <span
              className={cn(
                'bg-tile-100 text-p-3 flex h-10 w-10 items-center justify-center rounded-full font-normal text-white',
              )}
            >
              {user.initials}
            </span>
          </>
        )}
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel
          className="absolute left-full z-10 mt-3 w-screen max-w-[220px] -translate-x-full transform px-4 sm:px-0"
          unmount={false}
        >
          <div className="shadow-home-card overflow-hidden rounded-md bg-white">
            <h3
              className="text-h-5 text-tile-100 truncate p-4 pb-3 font-bold"
              data-testid="user-popover.title"
            >
              <Trans i18nKey="common.user_menu.message" values={{ name: user.firstname }} />
            </h3>
            <nav>
              <ul>
                {ITEMS.map(([label, link, Icon]) => {
                  return (
                    <li key={label}>
                      <a
                        href={link}
                        className="hover:bg-sierra-night-10 focus:bg-sierra-night-10 flex items-center gap-2 px-4 py-3"
                      >
                        <img
                          src={Icon}
                          alt={''}
                          role="presentation"
                          className="inline-block"
                          width={16}
                          height={16}
                        />
                        <Trans i18nKey={label} />
                      </a>
                    </li>
                  );
                })}
                <li>
                  <a
                    href={logout}
                    className="bg-sierra-night-5 hover:bg-sierra-night-10 focus:bg-sierra-night-10 flex items-center gap-2 px-4 py-3"
                    data-testid="user-popover.logout"
                  >
                    <img
                      src={LogOutIcon}
                      alt={'Log out'}
                      className="inline-block"
                      width={16}
                      height={16}
                    />
                    <Trans i18nKey="common.user_menu.links.logout" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
