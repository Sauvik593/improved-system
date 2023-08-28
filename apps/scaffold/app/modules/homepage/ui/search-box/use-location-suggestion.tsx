import { useState, useRef } from 'react';
import { useMachine } from '@xstate/react';

import { searchMachine } from './search-combobox.state';

import { type ChangeEvent } from 'react';

import { type LocationSuggestion } from '.';
import { useNavigation } from '@remix-run/react';

interface Props {
  selected: LocationSuggestion | null;
  onSelect: (value: LocationSuggestion | null) => void;
}

export const useLocationSuggestion = ({ selected, onSelect }: Props) => {
  const [inputQuery, setQuery] = useState('');
  const [state, sendEvent] = useMachine(searchMachine);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigation = useNavigation();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    sendEvent({ type: 'SEARCH', query: event?.target.value });
  };

  const shouldRenderClear = !!selected || inputQuery.length > 0;

  const handleClear = () => {
    setQuery('');
    onSelect(null);
    inputRef.current?.focus();
  };

  const handleSelect = (location: LocationSuggestion) => {
    setQuery(location.name);
    onSelect(location);

    inputRef.current?.focus();
  };

  return {
    handleClear,
    shouldRenderClear,
    inputRef,
    handleInput,
    handleSelect,
    state,
    inputQuery,
    results: state.context.results,
    isSubmitting: navigation.state === 'submitting',
  };
};
