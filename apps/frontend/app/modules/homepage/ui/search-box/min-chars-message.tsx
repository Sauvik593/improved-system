import { Kyero } from '@kyero/icons';
import { Trans } from 'react-i18next';

export const MinCharsMessage = () => (
  <div
    className="flex h-[180px] w-full items-center justify-center gap-2"
    data-testid="min-chars-message"
  >
    <Kyero />
    <Trans i18nKey={'common.homepage.searchbox.min_chars'} as="h3" />
  </div>
);

MinCharsMessage.displayName = 'MinCharsMessage';
