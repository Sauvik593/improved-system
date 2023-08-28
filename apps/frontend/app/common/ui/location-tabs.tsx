import cn from 'classnames';
import { Tab } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import { type NationTreeResponse } from '~/modules/homepage/api/get-nation-tree.server';
import { useTranslation } from 'react-i18next';
interface Props {
  tree: NationTreeResponse;
}

const TABS = ['regions', 'islands', 'costas', 'provinces'];

export const LocationTabs = ({ tree }: Props) => {
  const { t } = useTranslation();
  const tabs = TABS.reduce<{ title: string; locations: { name: string; link: string }[] }[]>(
    (acc, tab) => {
      const locations = tree[tab as keyof NationTreeResponse];
      if (!locations || locations.length === 0) {
        return acc;
      }

      const data = {
        title: t(`common.homepage.location_tree.${tab}`),
        locations: locations.map((location) => ({
          name: location.name,
          link: location.for_sale_path,
        })),
      };

      return [...acc, data];
    },
    [],
  );
  const listRef = useRef<HTMLDivElement>(null);
  return (
    <Tab.Group>
      <Tab.List
        className="no-scrollbar flex gap-2 overflow-auto whitespace-nowrap lg:gap-4"
        ref={listRef}
      >
        {tabs.map((tab, index) => (
          <Tab as={Fragment} key={tab.title}>
            {({ selected }) => {
              return (
                <button
                  className={cn(
                    'text-h-6-sm sm:text-h-6 focus:text-sierra-night-100 hover:text-sierra-night-100 border-b-2 border-transparent py-1 font-bold transition-colors duration-200',
                    {
                      'text-sierra-night-100 border-ocean-100': selected,
                      'text-sierra-night-40': !selected,
                    },
                  )}
                  onClick={(ev) => {
                    if (listRef.current) {
                      const button = ev.currentTarget as HTMLButtonElement;
                      const scrollToLeft =
                        index === 0 ? 0 : button.offsetLeft - button.offsetWidth / 2;

                      listRef.current.scrollTo(scrollToLeft, 0);
                    }
                  }}
                >
                  {tab.title}
                </button>
              );
            }}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-4">
        {tabs.map((tab) => (
          <Tab.Panel key={tab.title}>
            <ul className="flex flex-col sm:block sm:columns-4">
              {tab.locations.map((location) => (
                <li key={location.name} className="my-1 sm:my-2">
                  <a
                    href={location.link}
                    className="text-ocean-100 focus:text-ocean-150 hover:text-ocean-150 hover:underline focus:underline"
                  >
                    {location.name}
                  </a>
                </li>
              ))}
            </ul>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
