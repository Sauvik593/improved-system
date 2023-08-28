import cn from 'classnames';
import { ChevronDown } from '@kyero/icons';

import { Disclosure } from '@headlessui/react';

import AccountIcon from '~/../public/images/icons/account.svg';
import SearchIcon from '~/../public/images/icons/search.svg';
import FavouritesIcon from '~/../public/images/icons/favourites.svg';
import CommentsIcon from '~/../public/images/icons/comments.svg';
import { useNavLinks } from '~/common/hooks/use-nav-links';
import { Trans } from 'react-i18next';

export const MobileMenuUserAccordion = () => {
  const { enquiries, favourites, savedSearches, account } = useNavLinks();

  const ITEMS = [
    ['common.user_menu.links.enquiries', enquiries, CommentsIcon],
    ['common.user_menu.links.favourites', favourites, FavouritesIcon],
    ['common.user_menu.links.saved_searches', savedSearches, SearchIcon],
    ['common.user_menu.links.account', account, AccountIcon],
  ];

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="bg-sierra-night-10 text-sierra-night-100 flex w-full justify-between rounded-lg p-2 px-4 font-bold">
            <Trans i18nKey={'common.user_menu.mobile_title'} />{' '}
            <ChevronDown
              className={cn('transition-transform duration-100', {
                'rotate-180': open,
              })}
            />
          </Disclosure.Button>
          <Disclosure.Panel
            className="relative"
            unmount={false}
            data-testid="mobile-menu.user-accordion"
          >
            <ul
              className={`bg-sierra-night-10 before:bg-sierra-night-10 z-1 before:-z-1 overflow-hidden rounded-lg before:pointer-events-none before:absolute before:-top-2 before:h-5 before:w-full before:content-[""]`}
            >
              {ITEMS.map(([key, link, Icon]) => {
                return (
                  <li key={key}>
                    <a
                      href={link}
                      className="hover:bg-sierra-night-10 focus:bg-sierra-night-10 text-p-2 text-sierra-night-100 flex items-center gap-2 px-4 py-2 font-semibold"
                    >
                      <img
                        src={Icon}
                        alt=""
                        role="presentation"
                        className="inline-block"
                        width={16}
                        height={16}
                      />
                      <Trans i18nKey={key} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
