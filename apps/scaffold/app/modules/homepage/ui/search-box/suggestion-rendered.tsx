import { Loader } from './loader';
import { MinCharsMessage } from './min-chars-message';
import { NoResults } from './no-results';

import { type ReactElement, type ReactNode } from 'react';
import { type SearchComboboxStates } from './search-combobox.state';

interface Props {
  state: SearchComboboxStates;
  children: ReactNode;
  inputQuery: string;
}

export const SuggestionRenderer = ({ state, inputQuery, children }: Props): ReactElement | null => {
  switch (true) {
    case inputQuery.length < 3:
      return <MinCharsMessage />;
    case state.matches('fetching'):
      return <Loader />;
    case state.matches('idle') && state.context.results.length === 0:
      return <NoResults search={state.context.search} />;
    case state.matches('idle') && state.context.results.length > 0:
      return <>{children}</>;
    default:
      return null;
  }
};
