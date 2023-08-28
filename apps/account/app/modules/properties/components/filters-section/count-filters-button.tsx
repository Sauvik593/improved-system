import cn from 'classnames';
import { useTranslation } from 'react-i18next';

interface Props {
  count: number;
  onOpen: () => void;
}

export const CountFiltersButton = ({ onOpen, count }: Props) => {
  const { t } = useTranslation();
  const countPresent = count > 0;

  return (
    <button
      className={cn('h-full w-full rounded-md font-bold transition-all', {
        'border-1 border-ocean-100': countPresent,
      })}
      onClick={onOpen}
      type="button"
    >
      <div className="flex items-center justify-center gap-2">
        <span> {t('ui.filter')}</span>

        <div
          className={cn('h-5 w-5 scale-0 transition-all delay-200', {
            'scale-100': countPresent,
          })}
        >
          {count > 0 && (
            <span className="absolute flex h-5 w-5 items-center justify-center rounded-full bg-ocean-100 text-p-3 text-white">
              {count}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};
