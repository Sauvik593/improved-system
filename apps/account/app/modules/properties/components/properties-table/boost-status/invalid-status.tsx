import { useTranslation } from 'react-i18next';
import { Tooltip, TooltipContent, TooltipTrigger } from '@kyero/ui';
import { AlertInfo } from '@kyero/icons';

export const InvalidStatus = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center gap-2 text-p-3">
      <Tooltip>
        <TooltipTrigger>
          <AlertInfo className="text-ocean-100" />
        </TooltipTrigger>
        <TooltipContent>{t('ui.boostStatus.invalidStatus.message')}</TooltipContent>
      </Tooltip>
      <span>{t('ui.boostStatus.invalidStatus.title')}</span>
    </div>
  );
};

InvalidStatus.displayName = 'InvalidStatus';
