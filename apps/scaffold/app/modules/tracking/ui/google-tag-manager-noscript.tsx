import { useHydrated } from 'remix-utils';

import ENV from '~/common/env';
import { useNonEssentialCookies } from '../hooks/use-non-essential-cookies';

export const GoogleTagManagerNoScript = () => {
  const { activeNonEssentialCookies } = useNonEssentialCookies();
  const isHydrated = useHydrated();
  const url = `https://www.googletagmanager.com/ns.html?id=${ENV.GTM_ID}`;

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
