import { useTranslation } from 'react-i18next';
import { FiltersField, RadioList } from '@kyero/ui';

interface Props {
  defaultValue: string | null;
  className?: string;
}

export const NAME = 'q[property_status]';
const OPTIONS = [
  { key: 'filters.propertyStatus.options.all', value: '' },
  { key: 'filters.propertyStatus.options.live', value: 'live' },
  { key: 'filters.propertyStatus.options.incomplete', value: 'incomplete' },
  { key: 'filters.propertyStatus.options.hold', value: 'hold' },
];

export const PropertyStatusField = ({ defaultValue, className }: Props) => {
  const { t } = useTranslation();
  return (
    <FiltersField label={t('filters.propertyStatus.label')} className={className}>
      <RadioList
        options={OPTIONS.map((option) => ({ label: t(option.key), value: option.value }))}
        defaultValue={defaultValue}
        name={NAME}
      />
    </FiltersField>
  );
};

PropertyStatusField.displayName = 'PropertyStatusField';
