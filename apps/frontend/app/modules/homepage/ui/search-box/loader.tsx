import { Kyero } from '@kyero/icons';
import { Trans } from 'react-i18next';

export const Loader = () => (
  <div
    className="flex h-[180px] w-full items-center justify-center gap-2"
    data-testid="searchbox.loader"
  >
    <Kyero />
    <Trans i18nKey={'common.homepage.searchbox.loading'} as="h3" />
  </div>
);

Loader.displayName = 'Loader';
