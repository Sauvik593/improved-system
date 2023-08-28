import { ChevronLeft } from '@kyero/icons';

interface Props {
  onClose: () => void;
  label?: string;
}

export const CloseModalButton = ({ onClose, label = 'Close modal' }: Props) => (
  <button
    className="flex h-8 w-8 items-center justify-center"
    aria-label={label}
    onClick={onClose}
    data-testid="searchbox.close-modal"
  >
    <ChevronLeft className="text-ocean-100" aria-hidden="true" />
  </button>
);
