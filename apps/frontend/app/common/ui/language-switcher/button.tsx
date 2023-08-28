import cn from 'classnames';
import { Globe } from '@kyero/icons';
import { useAppContext } from '~/common/contexts/app.context';
import { useModalsContext } from '~/common/contexts/modals.context';

import { TRANSLATIONS } from './constants';

export const LanguageSwitcherButton = () => {
  const { openModal } = useModalsContext();
  const { locale } = useAppContext();
  const currentTranslation = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] as string;

  return (
    <button
      className="bg-sierra-night-5 flex h-full w-full items-center justify-center gap-2 p-2 text-center lg:px-0"
      onClick={() => openModal('language-switcher')}
      data-testid="mobile-menu.footer-language-switcher"
    >
      <Globe className="text-ocean-100" />
      <span className={cn('hover:text-ocean-100 focus:text-ocean-100 font-semibold')}>
        {currentTranslation}
      </span>
    </button>
  );
};
