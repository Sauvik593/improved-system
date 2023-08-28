import { useHydrated } from 'remix-utils';

import { useNonEssentialCookies } from '../hooks/use-non-essential-cookies';
import { useAppContext } from '~/common/contexts/app.context';

export const GoogleTagManagerNoScript = () => {
  const {
    env: { GTM_ID },
  } = useAppContext();
  const { activeNonEssentialCookies } = useNonEssentialCookies();
  const isHydrated = useHydrated();
  const url = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;

  if (isHydrated || !activeNonEssentialCookies) {
    return null;
  }

  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<iframe title="no-script gtm" src="${url}" height="0" width="0" style="display: 'none', visibility: 'hidden'"></iframe>`,
      }}
    />
  );
};
