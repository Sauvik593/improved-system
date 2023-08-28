import { useTranslation } from 'next-i18next';

import { DrawerContainer } from './DrawerContainer';
import { CountryList } from '../../../CountrySelectDropdown/CountryList';
import { ChevronLeft } from '@kyero/icons';

export interface Props {
  isActive: boolean;
  onClose: () => void;
}

export const CountryDrawer: React.FunctionComponent<Props> = (props) => {
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
          aria-label={t('menu.country_select.close')}
        >
          <ChevronLeft ariaHidden />
        </button>
      }
    >
      <section className="text-h-4 text-sierra-night-100 mt-6 px-6 font-bold">
        <h3 className="text-h-3-sm text-tile-100 mb-2">{t('menu.country_select.title')}</h3>
        <CountryList />
      </section>
    </DrawerContainer>
  );
};
