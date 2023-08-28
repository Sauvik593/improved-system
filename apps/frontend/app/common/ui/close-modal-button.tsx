import { ChevronLeft } from '@kyero/icons';
import { useTranslation } from 'react-i18next';

interface Props {
  onClose: () => void;
  label?: string;
}

export const CloseModalButton = ({ onClose }: Props) => {
  const { t } = useTranslation();
  return (
    <button
      className="flex h-8 w-8 items-center justify-center"
      aria-label={t('common.homepage.searchbox.close_modal') as string}
      onClick={onClose}
      data-testid="searchbox.close-modal"
    >
      <ChevronLeft className="text-ocean-100" aria-hidden="true" />
    </button>
  );
};
