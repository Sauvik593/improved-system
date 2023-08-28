import { useTranslation } from 'react-i18next';
import { CheckboxList, FiltersField } from '@kyero/ui';

interface Props {
  defaultValue: string[] | null;
  className?: string;
}

export const NAME = 'q[types][]';
const OPTIONS = [
  { key: 'filters.propertyTypes.options.apartment', value: '1' },
  { key: 'filters.propertyTypes.options.villa', value: '2' },
  { key: 'filters.propertyTypes.options.townhouse', value: '3' },
  { key: 'filters.propertyTypes.options.countryhouse', value: '4' },
  { key: 'filters.propertyTypes.options.land', value: '5' },
  { key: 'filters.propertyTypes.options.cave', value: '6' },
  { key: 'filters.propertyTypes.options.garage', value: '7' },
  { key: 'filters.propertyTypes.options.commercial', value: '8' },
  { key: 'filters.propertyTypes.options.wooden', value: '9' },
];

export const PropertyTypesField = ({ defaultValue, className }: Props) => {
  const { t } = useTranslation();
  return (
    <FiltersField label={t('filters.propertyTypes.label')} className={className}>
      <CheckboxList
        options={OPTIONS.map((option) => ({ label: t(option.key), value: option.value }))}
        defaultValue={defaultValue}
        name={NAME}
      />
    </FiltersField>
  );
};

PropertyTypesField.displayName = 'PropertyTypesField';
