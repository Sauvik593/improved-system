import { useTranslation } from 'next-i18next';

import { ChevronLeft } from '@kyero/icons';
import { LanguageList } from '../../../LanguageSwitcher/LanguageList';
import { DrawerContainer } from './DrawerContainer';

export interface Props {
  isActive: boolean;
  onClose: () => void;
}

export const LanguageDrawer: React.FunctionComponent<Props> = (props) => {
  const { t } = useTranslation('common');
  return (
    <DrawerContainer
      isActive={props.isActive}
      theme="white"
      direction="left"
      headerVariant="single"
      headerButton={
        <button
          className="px-6"
          onClick={props.onClose}
          data-testid="drawer-left-button"
          aria-label={t('menu.language_switcher.close')}
        >
          <ChevronLeft ariaHidden />
        </button>
      }
    >
      <section className="text-h-4 text-sierra-night-100 mt-6 px-6 font-bold">
        <h3 className="text-h-3-sm text-tile-100 mb-2">{t('menu.language_switcher.title')}</h3>
        <LanguageList />
      </section>
    </DrawerContainer>
  );
};
