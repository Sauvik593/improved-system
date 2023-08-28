import { XIcon } from '@kyero/icons';

interface Props {
  onClear: () => void;
}

export const ClearButton = ({ onClear }: Props) => (
  <button
    type="button"
    className="bg-sierra-night-40 absolute right-2 top-1/2  m-auto -translate-y-1/2 transform rounded-full p-2"
    onClick={onClear}
    aria-label="Clear search"
  >
    <XIcon />
  </button>
);

ClearButton.displayName = 'ClearButton';
