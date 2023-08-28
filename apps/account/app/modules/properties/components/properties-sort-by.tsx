import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from '@kyero/ui';

interface Props {
  onChange: () => void;
  sortByValue: string | null;
  sortDirectionValue: string | null;
}

type SortByOption = {
  value: string;
  key: string;
  sortBy: string;
  sortByDir: string;
};

const OPTIONS = [
  {
    value: 'created_at[desc]',
    key: 'filters.propertiesSort.newest',
    sortBy: 'created_at',
    sortByDir: 'desc',
  },
  {
    value: 'created_at[asc]',
    key: 'filters.propertiesSort.oldest',
    sortBy: 'created_at',
    sortByDir: 'asc',
  },
  {
    value: 'enquiry_created_at[desc]',
    key: 'filters.propertiesSort.recent',
    sortBy: 'enquiry_created_at',
    sortByDir: 'desc',
  },
  {
    value: 'price[asc]',
    key: 'filters.propertiesSort.expensive',
    sortBy: 'price',
    sortByDir: 'asc',
  },
  {
    value: 'price[desc]',
    key: 'filters.propertiesSort.cheapest',
    sortBy: 'price',
    sortByDir: 'desc',
  },
  {
    value: 'views[desc]',
    key: 'filters.propertiesSort.views',
    sortBy: 'views',
    sortByDir: 'desc',
  },
  {
    value: 'enquiries[desc]',
    key: 'filters.propertiesSort.enquiries',
    sortBy: 'enquiries',
    sortByDir: 'desc',
  },
];

const getInitialSortValue = (sortBy: string | null, sortDirection: string | null) => {
  if (sortBy && sortDirection) {
    return OPTIONS.find((option) => option.sortBy === sortBy && option.sortByDir === sortDirection)
      ?.value;
  }

  return 'created_at[desc]';
};

const getSelectedOption = (value: string) => OPTIONS.find((option) => option.value === value);

export const PropertiesSortBy = (props: Props) => {
  const { t } = useTranslation();
  const defaultValue = getInitialSortValue(props.sortByValue, props.sortDirectionValue);
  const sortByRef = useRef<HTMLInputElement>(null);
  const sortByDirRef = useRef<HTMLInputElement>(null);

  const handleChange = (value: string) => {
    if (sortByDirRef.current && sortByRef.current) {
      const option = getSelectedOption(value) as SortByOption;

      sortByRef.current.value = option.sortBy;
      sortByDirRef.current.value = option.sortByDir;

      props.onChange();
    }
  };

  return (
    <>
      <Select
        name="sort_by"
        options={OPTIONS.map(({ key, value }) => ({ value, label: t(key) }))}
        id="sort_by"
        prependedMessage={t('ui.sortBy') as string}
        onChange={handleChange}
        defaultValue={defaultValue as string}
      />
      <input type="hidden" name="sort_by" defaultValue={props.sortByValue || ''} ref={sortByRef} />
      <input
        type="hidden"
        name="sort_direction"
        defaultValue={props.sortDirectionValue || ''}
        ref={sortByDirRef}
      />
    </>
  );
};

PropertiesSortBy.displayName = 'PropertiesSortBy';
