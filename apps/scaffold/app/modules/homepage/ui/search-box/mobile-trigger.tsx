import cn from 'classnames';
import { Search } from '@kyero/icons';

interface Props {
  onModalOpen: () => void;
  label: string;
}

export const MobileTrigger = ({ onModalOpen, label }: Props) => (
  <button
    className="border-1 border-sierra-night-40 relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left sm:text-sm md:hidden"
    onClick={() => onModalOpen()}
    type="button"
    data-testid="searchbox.mobile-trigger"
  >
    <Search className="text-ocean-100 pointer-events-none absolute left-3 top-1/2 m-auto -translate-y-1/2 transform" />
    <div
      className={cn(
        'text-sierra-night-100 rounded-md bg-white p-2',
        'placeholder:text-sierra-night-40 w-full pl-12',
      )}
    >
      <p>{label}</p>
    </div>
  </button>
);
