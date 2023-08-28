import { useTranslation } from 'react-i18next';
import { Processing } from '@kyero/icons';

export const Pending = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center gap-2 text-p-3 font-bold">
      <Processing />
      <span>{t('ui.boostStatus.pending.title')}</span>
    </div>
  );
};

Pending.displayName = 'Pending';
