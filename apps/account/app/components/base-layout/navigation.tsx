import { useTranslation } from 'react-i18next';
import { Link, useMatches } from '@remix-run/react';
import { Navbar, NavElement } from '@kyero/ui';

import { useMe } from '~/client/use-me';
import { useNavigationContext } from './navigation.context';
import { NAV_LINKS } from './constants';

import type { RouteMatch } from '@remix-run/react';

const activeRoute = (matches: RouteMatch[], passedId: string): boolean =>
  !!matches.find((route) => route.id.includes(passedId));

export const Navigation = () => {
  const matches = useMatches();
  const { closeMobile } = useNavigationContext();
  const { me } = useMe();
  const { t } = useTranslation();

  const bottomProps = me ? { title: me.name, imgSrc: me.logoUrl, subtitle: me.email } : undefined;

  return (
    <Navbar onClose={closeMobile} bottomProps={bottomProps}>
      {NAV_LINKS.map((route) => (
        <NavElement
          key={route.id}
          active={activeRoute(matches, route.id)}
          component={Link}
          icon={<route.Icon />}
          linkProps={{ to: route.to }}
          title={t(route.title)}
        />
      ))}
    </Navbar>
  );
};
