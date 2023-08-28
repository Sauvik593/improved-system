import { useTranslation } from 'react-i18next';
import { FiltersField, RadioList } from '@kyero/ui';

interface Props {
  defaultValue: string | null;
  className?: string;
}

export const NAME = 'q[boost_status]';
const OPTIONS = [
  { key: 'filters.boostStatus.options.any', value: '' },
  { key: 'filters.boostStatus.options.noBoost', value: 'no_boost' },
  { key: 'filters.boostStatus.options.anyBoost', value: 'any_boost' },
  { key: 'filters.boostStatus.options.live', value: 'live' },
  { key: 'filters.boostStatus.options.pending', value: 'pending' },
  { key: 'filters.boostStatus.options.inCart', value: 'in_cart' },
];

export const BoostedField = ({ defaultValue, className }: Props) => {
  const { t } = useTranslation();
  return (
    <FiltersField label={t('filters.boostStatus.label')} className={className}>
      <RadioList
        options={OPTIONS.map((option) => ({ label: t(option.key), value: option.value }))}
        defaultValue={defaultValue}
        name={NAME}
      />
    </FiltersField>
  );
};

BoostedField.displayName = 'BoostedField';
