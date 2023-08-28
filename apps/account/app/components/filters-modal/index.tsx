import { Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';

import { Close } from '@kyero/icons';
import { Button } from '@kyero/ui';

import { HiddenFields } from '../hidden-fields';
import { useFiltersModal } from './use-filters-modal';

import { type ElementType } from 'react';

export type PaneConfig =
  | {
      fieldName: string;
      type: 'single';
      Component: ElementType<{ className?: string; defaultValue: string | null }>;
    }
  | {
      fieldName: string;
      type: 'multiple';
      Component: ElementType<{ className?: string; defaultValue: string[] | null }>;
    };

interface Props {
  onClose: () => void;
  opened: boolean;
  config: PaneConfig[];
  title: string;
  searchButtonState: 'INITIAL' | 'SEARCHABLE' | 'CLEARABLE';
  onClearFilters: () => void;
}

export const FiltersModal = ({
  config,
  opened,
  title,
  searchButtonState = 'SEARCHABLE',
  onClearFilters,
  onClose,
}: Props) => {
  const { t } = useTranslation();
  const { searchParams, fieldsList } = useFiltersModal({ config, opened, onClose });

  const renderButton = () => {
    switch (searchButtonState) {
      case 'CLEARABLE':
        return (
          <Button
            variant="outline"
            buttonType="blue"
            message={t('ui.resetFilters')}
            fullWidth
            onClick={onClearFilters}
          />
        );

      case 'SEARCHABLE':
      default:
        return (
          <Button
            variant="full"
            buttonType="blue"
            message={t('ui.search')}
            fullWidth
            type="submit"
          />
        );
    }
  };

  return (
    <>
      <HiddenFields searchParams={searchParams} fieldsList={fieldsList} visible={!opened} />
      <Transition show={opened} className="fixed right-0 top-0 z-1 h-screen">
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="opacity-0"
          enterTo="opacity-75"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="opacity-75"
          leaveTo="opacity-0"
          className="fixed top-0 left-0 right-0 bottom-0 h-full w-full bg-sierra-night-60"
          onClick={onClose}
        />
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
          className="flex h-full w-full items-center md:w-[400px]"
        >
          <section className="ml-auto grid max-h-screen w-full grid-cols-1 grid-rows-[80px,1fr,90px] bg-white shadow-card md:mr-10 md:max-h-[calc(100vh-80px)] md:rounded-md">
            <header className="flex justify-between p-6 px-4">
              <h2 className="text-h-4 font-bold text-sierra-night-100">{title}</h2>
              <button
                className="px-2"
                onClick={onClose}
                type="button"
                title={t('ui.close') || 'close'}
              >
                <Close />
              </button>
            </header>
            <div className="overflow-auto ">
              <fieldset className="p-6 py-2 text-sierra-night-100 disabled:bg-sierra-night-10 disabled:text-sierra-night-40">
                {config.map(({ Component, fieldName, type }, index) => {
                  const className = index > 0 ? 'mt-2' : undefined;

                  if (type === 'single') {
                    return (
                      <Component
                        key={fieldName}
                        defaultValue={searchParams.get(fieldName)}
                        className={className}
                      />
                    );
                  }

                  return (
                    <Component
                      key={fieldName}
                      defaultValue={searchParams.getAll(fieldName)}
                      className={className}
                    />
                  );
                })}
              </fieldset>
            </div>
            <footer className="flex items-center justify-center p-6">{renderButton()}</footer>
          </section>
        </Transition.Child>
      </Transition>
    </>
  );
};
