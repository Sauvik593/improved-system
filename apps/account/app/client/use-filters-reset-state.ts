import { useMemo } from 'react';

import { getDesiredParamsData, stringifyFromEntries } from './helpers';

type FiltersResetStatePayload = {
  fieldsList: string[];
  searchParams: URLSearchParams;
  currentFormData: FormData | null;
};

export const useFiltersResetState = ({
  fieldsList,
  searchParams,
  currentFormData,
}: FiltersResetStatePayload) => {
  const filtersState = useMemo(() => {
    if (!currentFormData || !searchParams) {
      return 'INITIAL';
    }

    const sanitizedFormData = getDesiredParamsData({
      params: currentFormData,
      fieldsList,
      accumulator: new FormData(),
    });

    const sanitizedParams = getDesiredParamsData({
      params: searchParams,
      fieldsList,
      accumulator: new URLSearchParams(),
    });

    const stringifiedForm = stringifyFromEntries(sanitizedFormData);
    const stringifiedParams = stringifyFromEntries(sanitizedParams);

    if (stringifiedParams == '{}' && stringifiedForm == '{}') {
      return 'INITIAL';
    }

    return stringifiedParams !== stringifiedForm ? 'SEARCHABLE' : 'CLEARABLE';
  }, [currentFormData, searchParams]);

  return filtersState;
};
