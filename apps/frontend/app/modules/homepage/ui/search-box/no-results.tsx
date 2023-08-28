import { Trans } from 'react-i18next';
import { assetsPathTo } from '~/common/client-router/helpers';

interface Props {
  search: string;
}

export const NoResults = ({ search }: Props) => (
  <div
    className="flex h-[180px] w-full items-center justify-center gap-2"
    data-testid="searchbox.no-results"
  >
    <img
      src={assetsPathTo('/images/error.svg')}
      alt="Error"
      className="h-8 w-8 rounded-full"
      role="presentation"
    />
    <Trans i18nKey={'common.homepage.searchbox.no_results'} as="h3" values={{ search }} />
  </div>
);

NoResults.displayName = 'NoResults';
