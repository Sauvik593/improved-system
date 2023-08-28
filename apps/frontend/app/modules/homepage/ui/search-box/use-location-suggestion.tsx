import { useState, useRef } from 'react';
import { useMachine } from '@xstate/react';

import { searchMachine } from './search-combobox.state';

import { type ChangeEvent } from 'react';

import { type LocationSuggestion } from './';
import { useNavigation } from '@remix-run/react';
import { useAppContext } from '~/common/contexts/app.context';

export interface RecentSearchSuggestion {
  name: 'recent-search';
  url: string;
}

interface Props {
  selected: LocationSuggestion | RecentSearchSuggestion | null;
  onSelect: (value: LocationSuggestion | RecentSearchSuggestion | null) => void;
}

export const useLocationSuggestion = ({ selected, onSelect }: Props) => {
  const { country, locale } = useAppContext();
  const [inputQuery, setQuery] = useState('');
  const [state, sendEvent] = useMachine(searchMachine);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigation = useNavigation();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    sendEvent({ type: 'SEARCH', query: event?.target.value, nationId: country?.id || '', locale });
  };

  const shouldRenderClear = !!selected || inputQuery.length > 0;

  const handleClear = () => {
    setQuery('');
    onSelect(null);
    inputRef.current?.focus();
  };

  const handleSelect = (location: LocationSuggestion | RecentSearchSuggestion) => {
    if (location.name === 'recent-search') {
      const savedSearch = location as RecentSearchSuggestion;

      inputRef.current?.focus();
      setQuery('');
      onSelect(null);
      window.location.href = savedSearch.url;
      return;
    }

    setQuery(location.name);
    onSelect(location);

    inputRef.current?.focus();
  };

  const hasEnoughChars = inputQuery.length >= 3;

  const openSuggestionsOnFocus = () => {
    if (!hasEnoughChars && inputRef.current && selected?.name !== 'recent-search') {
      const arrowUpEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true,
      });

      inputRef.current.dispatchEvent(arrowUpEvent);
    }
  };

  return {
    handleClear,
    shouldRenderClear,
    inputRef,
    handleInput,
    handleSelect,
    state,
    inputQuery,
    hasEnoughChars,
    results: state.context.results,
    openSuggestionsOnFocus,
    isSubmitting: navigation.state === 'submitting',
  };
};
