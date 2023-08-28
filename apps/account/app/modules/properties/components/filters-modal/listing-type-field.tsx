import { useTranslation } from 'react-i18next';
import { FiltersField, RadioList } from '@kyero/ui';

interface Props {
  defaultValue: string | null;
  className?: string;
}

export const NAME = 'q[scheduled_for_prime]';
const OPTIONS = [
  { key: 'filters.listingType.options.all', value: '' },
  { key: 'filters.listingType.options.prime', value: 'true' },
  { key: 'filters.listingType.options.free', value: 'false' },
];

export const ListingTypeField = ({ defaultValue, className }: Props) => {
  const { t } = useTranslation();
  return (
    <FiltersField label={t('filters.listingType.label')} className={className}>
      <RadioList
        options={OPTIONS.map((option) => ({ label: t(option.key), value: option.value }))}
        defaultValue={defaultValue}
        name={NAME}
      />
    </FiltersField>
  );
};

ListingTypeField.displayName = 'ListingTypeField';
