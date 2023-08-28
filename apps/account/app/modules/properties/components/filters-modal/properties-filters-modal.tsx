import { useTranslation } from 'react-i18next';

import { FiltersModal } from '~/components/filters-modal';
import { useFiltersResetState } from '~/client/use-filters-reset-state';
import { PROPERTIES_FIELDS_CONFIG } from './constants';

interface Props {
  onClose: () => void;
  opened: boolean;
  currentFormData: FormData | null;
  searchParams: URLSearchParams;
  onClearFilters: () => void;
}

export const PropertiesFiltersModal = ({
  onClose,
  opened,
  currentFormData,
  searchParams,
  onClearFilters,
}: Props) => {
  const { t } = useTranslation();
  const fieldsList = PROPERTIES_FIELDS_CONFIG.map((field) => field.fieldName);
  const searchButtonState = useFiltersResetState({
    fieldsList,
    currentFormData,
    searchParams,
  });

  return (
    <FiltersModal
      title={t('properties.filters.title')}
      config={PROPERTIES_FIELDS_CONFIG}
      onClose={onClose}
      opened={opened}
      searchButtonState={searchButtonState}
      onClearFilters={onClearFilters}
    />
  );
};

PropertiesFiltersModal.displayName = 'PropertiesFiltersModal';
