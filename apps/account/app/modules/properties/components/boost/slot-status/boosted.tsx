import { useTranslation } from 'react-i18next';
import { BoostRocket } from '@kyero/icons';

export const Boosted = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center gap-2 text-p-3 font-bold">
      <BoostRocket className="h-6 w-6 text-orange-100" />
      <span>{t('ui.boostStatus.boosted.title')}!</span>
    </div>
  );
};

Boosted.displayName = 'Boosted';
