import { LocationTabs } from '~/common/ui/location-tabs';
import { type NationTreeResponse } from '../api/get-nation-tree.server';
import { Trans } from 'react-i18next';

interface Props {
  tabs: NationTreeResponse;
  location: string;
}

export const SectionLocationTree = ({ tabs, location }: Props) => (
  <section className="curved-hero bg-white py-8" data-testid="homepage.location-recommendations">
    <div className="mx-auto max-w-[1176px] overflow-hidden px-5">
      <h2 className="text-h-4-sm md:text-h-4 text-sierra-night-100 font-bold">
        <Trans i18nKey="common.homepage.location_tree.title" values={{ location }} />
      </h2>
      <hr className="my-3 block h-2 w-20 border-0 bg-[url(/new-frontend-assets/images/shapes/wave-underline.svg)] bg-[auto_100%] bg-repeat-x" />
      <div className="lg:w-full">
        <LocationTabs tree={tabs} />
      </div>
    </div>
  </section>
);
