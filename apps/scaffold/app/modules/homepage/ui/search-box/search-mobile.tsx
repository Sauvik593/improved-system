import cn from 'classnames';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { Form } from '@remix-run/react';
import { Search as SearchIcon } from '@kyero/icons';

import { Results } from './results';
import { useLocationSuggestion } from './use-location-suggestion';

import { ClearButton } from './clear-button';
import { CloseModalButton } from '~/common/ui/close-modal-button';
import { SuggestionRenderer } from './suggestion-rendered';

interface LocationSuggestion {
  id: number;
  name: string;
  popularity: number;
  parent: string;
  nation_id: number;
  agent_list_path: string;
  to_rent_path: string;
  for_sale_path: string;
}

interface Props {
  selected: LocationSuggestion | null;
  onSelect: (value: LocationSuggestion | null) => void;
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}
export const SearchMobile = ({ selected, onSelect, isOpen, onClose, children }: Props) => {
  const {
    shouldRenderClear,
    handleClear,
    handleInput,
    inputRef,
    state,
    isSubmitting,
    results,
    handleSelect,
    inputQuery,
  } = useLocationSuggestion({ selected, onSelect });

  return (
    <Transition show={isOpen}>
      <Dialog onClose={onClose} initialFocus={inputRef}>
        <Transition.Child
          as={'div'}
          enter="ease-out duration-100"
          enterFrom="opacity-0 translate-y-12"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-100"
          leaveFrom="opacity-50 translate-y-0"
          leaveTo="opacity-0 translate-y-12"
          className="fixed inset-0 z-10 overflow-y-auto bg-white"
        >
          <Dialog.Panel className="flex h-full w-full flex-col" data-testid="searchbox.modal">
            <Dialog.Title className="text-tile-100 text-h-3-sm flex items-center gap-2 p-5 py-4 font-bold">
              <CloseModalButton onClose={onClose} />
              Search
            </Dialog.Title>
            <Form
              className="flex h-full flex-col overflow-hidden bg-white"
              action="/kyero-api/home-search"
              method="post"
              data-testid="searchbox-mobile"
            >
              <div className="bg-sierra-night-5 relative flex h-full flex-col gap-5 px-5 py-4 pb-0">
                {children}
                <Combobox
                  value={selected}
                  onChange={handleSelect}
                  disabled={isSubmitting}
                  className="relative flex h-auto flex-1 flex-col"
                  as="div"
                >
                  <div className="flex gap-2">
                    <div className="border-1 border-sierra-night-40 relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none sm:text-sm">
                      <Combobox.Input
                        type="text"
                        id="search-mobile"
                        name="search"
                        ref={inputRef}
                        onChange={handleInput}
                        displayValue={(suggestion: LocationSuggestion) => suggestion?.name}
                        autoComplete="off"
                        autoCorrect="off"
                        data-testid="searchbox.mobile-input"
                        className={cn(
                          'text-sierra-night-100 rounded-md bg-white p-2',
                          'placeholder:text-sierra-night-40 w-full',
                        )}
                        placeholder={'Search by country, region or city'}
                      />
                      {shouldRenderClear ? <ClearButton onClear={handleClear} /> : null}
                    </div>
                    <button
                      className={cn(
                        'bg-ocean-100 flex h-[40px] w-[40px] items-center justify-center rounded-full p-2 text-white',
                        {
                          'bg-ocean-40 cursor-not-allowed': isSubmitting,
                        },
                      )}
                    >
                      <SearchIcon className="pointer-events-none m-auto text-white" />
                    </button>
                  </div>
                  <div className="text-sierra-night-20 text-h-5 r ounded-md absolute bottom-0 top-[60px] left-0 right-0 -mx-5 flex-1 overflow-auto bg-white">
                    <SuggestionRenderer state={state} inputQuery={inputQuery}>
                      <Results results={results as LocationSuggestion[]} type="mobile" />
                    </SuggestionRenderer>
                  </div>
                </Combobox>
              </div>
              <input
                type="hidden"
                name="location"
                value={selected ? JSON.stringify(selected) : ''}
              />
            </Form>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

SearchMobile.displayName = 'SearchMobile';
