import { Switch as KyeroSwitch } from '@kyero/ui';
import { Tooltip, TooltipTrigger, TooltipContent } from '@kyero/ui';
import { useState, useRef, useEffect } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import type { Props } from './types';

export const DisabledPrimeSwitch = ({
  disabled = true,
  defaultValue = true,
  value,
  name,
}: Props) => {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const openTooltip = () => {
    setOpened(true);
  };

  const closeTooltip = () => {
    setOpened(false);
  };

  const handleClick = (ev: MouseEvent) => {
    const target = ev.target;
    const refElement = mainRef.current;

    if (!refElement || !target) {
      return;
    }

    if (!refElement.contains(target as Node)) {
      closeTooltip();
    }
  };

  const handleEscape = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        closeTooltip();
      }
    },
    [opened],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="relative" ref={mainRef}>
      <Tooltip open={opened} onOpenChange={openTooltip}>
        <TooltipTrigger onClick={openTooltip}>
          <KyeroSwitch
            defaultValue={defaultValue}
            disabled={disabled}
            name={name}
            value={value}
            label={'Switch prime'}
          />
        </TooltipTrigger>
        <TooltipContent>{t('properties.primeSwitch.unavailableMessage')}</TooltipContent>
      </Tooltip>
    </div>
  );
};
