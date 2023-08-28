import cn from 'classnames';
import { useRadioGroupState, type RadioGroupState } from 'react-stately';
import { useRadio, useRadioGroup } from 'react-aria';
import { useRef, useContext, createContext } from 'react';
import { type SearchData, type SearchType } from '.';
import { useTranslation } from 'react-i18next';

interface Props {
  searchData: SearchData;
  onChange: (searchType: string) => void;
  activeSearch: SearchType;
  type: 'desktop' | 'mobile';
}

const ACTIVE_CLASS =
  'peer-checked/radio:text-sierra-night-100 peer-checked/radio:after:content-[""] peer-checked/radio:after:absolute peer-checked/radio:after:bottom-0 peer-checked/radio:after:left-0 peer-checked/radio:after:w-full peer-checked/radio:after:h-[2px] peer-checked/radio:after:bg-ocean-100';
const INACTIVE_CLASS = 'text-sierra-night-60 ';

let RadioContext = createContext<RadioGroupState | null>(null);

const SearchBoxRadio = ({
  searchData,
  type,
}: {
  searchData: SearchData[number];
  type: 'desktop' | 'mobile';
}) => {
  const id = `${searchData.type}Route`;
  const ref = useRef(null);
  const state = useContext(RadioContext);
  const { t } = useTranslation();

  let { inputProps } = useRadio(
    {
      value: searchData.type,
      id: `${searchData.type}-${type}`,
      'aria-label': t('common.ui.select') as string,
    },
    state as RadioGroupState,
    ref,
  );

  const label = `${id}-label`;
  return (
    <label key={searchData.type} data-testid={`searchbox.${type}.route-${inputProps.value}`}>
      <input
        {...inputProps}
        className="peer/radio block h-0 w-0 opacity-0"
        name="route"
        aria-describedby={label}
      />
      <p
        className={cn(
          'relative pb-1 font-bold peer-focus-visible/radio:ring ',
          INACTIVE_CLASS,
          ACTIVE_CLASS,
        )}
        id={label}
      >
        <span className="hidden md:block">{t(searchData.title)}</span>
        <span className="md:hidden">{t(searchData.titleMobile)}</span>
      </p>
    </label>
  );
};

export const SearchBoxNavigation = ({ searchData, onChange, activeSearch, type }: Props) => {
  const state = useRadioGroupState({
    onChange,
    value: activeSearch,
  });
  const { t } = useTranslation();

  const { radioGroupProps } = useRadioGroup(
    {
      name: 'route',
      'aria-label': t('common.homepage.searchbox.route_label') as string,
      id: `searchType-${type}`,
    },
    state,
  );

  return (
    <fieldset className="flex gap-6" {...radioGroupProps}>
      <RadioContext.Provider value={state}>
        {searchData.map((searchData) => {
          return <SearchBoxRadio searchData={searchData} key={searchData.type} type={type} />;
        })}
      </RadioContext.Provider>
    </fieldset>
  );
};

SearchBoxNavigation.displayName = 'SearchBoxNavigation';
