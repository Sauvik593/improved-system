import cn from 'classnames';
import { Combobox } from '@headlessui/react';
import { Fragment } from 'react';

import { type LocationSuggestion } from '.';

const NATION_LIST = [
  {
    id: 55529,
    name: 'Spain',
    flag: 'images/homepage/es-flag.jpg',
  },
];

export const Result = ({
  suggestion,
  country,
  index,
}: {
  suggestion: LocationSuggestion;
  country: typeof NATION_LIST[number];
  index: number;
}) => (
  <Combobox.Option value={suggestion} as={Fragment}>
    {({ active, selected }) => (
      <li
        className={cn('flex items-center gap-4 p-2', {
          'bg-sierra-night-10': active,
          'bg-sierra-night-20': selected,
        })}
        data-testid={`searchbox.result.${index}`}
      >
        <img src={country?.flag || '.jpg'} alt="Flag" className="h-8 w-8 rounded-full" />
        <div>
          <p className="text-p-2 text-sierra-night-100">{suggestion.name}</p>
          <span className="text-p-3 text-sierra-night-60">{suggestion.parent}</span>
        </div>
      </li>
    )}
  </Combobox.Option>
);

interface Props {
  results: LocationSuggestion[];
  type: 'desktop' | 'mobile';
}

const RESULTS_CLASSNAMES = {
  desktop:
    'max-h-[280px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
  mobile: 'sm:text-s overflow-auto  bg-white text-base focus-within:ring',
};

export const Results = ({ results, type }: Props) => (
  <Combobox.Options className={RESULTS_CLASSNAMES[type]} static data-testid="searchbox.results">
    {results.map((data: LocationSuggestion, index) => {
      const country = NATION_LIST.find((nation) => nation.id === data.nation_id) || NATION_LIST[0];
      return <Result key={data.id} suggestion={data} country={country} index={index} />;
    })}
  </Combobox.Options>
);

Results.displayName = 'Results';
