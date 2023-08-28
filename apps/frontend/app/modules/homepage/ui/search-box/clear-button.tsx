import { XIcon } from '@kyero/icons';
import { useTranslation } from 'react-i18next';

interface Props {
  onClear: () => void;
}

export const ClearButton = ({ onClear }: Props) => {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      className="bg-sierra-night-40 absolute right-2 top-1/2  m-auto -translate-y-1/2 transform rounded-full p-2"
      onClick={onClear}
      aria-label={t('common.homepage.searchbox.clear_cta') as string}
    >
      <XIcon />
    </button>
  );
};

ClearButton.displayName = 'ClearButton';
