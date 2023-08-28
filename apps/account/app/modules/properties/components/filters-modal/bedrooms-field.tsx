import { useTranslation } from 'react-i18next';
import { CheckboxList, FiltersField } from '@kyero/ui';

interface Props {
  defaultValue: string[] | null;
  className?: string;
}

export const NAME = 'q[bedrooms][]';
const OPTIONS = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5+', value: '5' },
];

export const BedroomsField = ({ defaultValue, className }: Props) => {
  const { t } = useTranslation();
  return (
    <FiltersField label={t('filters.bedrooms.label')} className={className}>
      <CheckboxList options={OPTIONS} defaultValue={defaultValue} name={NAME} />
    </FiltersField>
  );
};

BedroomsField.displayName = 'BedroomsField';
