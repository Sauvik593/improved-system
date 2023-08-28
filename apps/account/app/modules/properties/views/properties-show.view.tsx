import { Link } from '@remix-run/react';
import { ChevronDown } from '@kyero/icons';

import { PhotoGrid } from '~/modules/properties/components/photo-grid';
import { FeaturesSection } from '~/modules/properties/components/features-section';
import { PropertyInfo } from '~/modules/properties/components/property-info';
import { PropertyDescription } from '~/modules/properties/components/property-description';

import { Header } from '~/modules/properties/components/header';

export const PropertiesShowView = () => {
  return (
    <div className="max-w-screen-md">
      {/* THIS WILL NEED TO BE MOVED TO THE BASE LAYOUT PROBABLY */}
      <Link to="/properties">
        <div className="inline-flex py-2">
          <p className="text-p-2 text-tile-100">Properties</p>
          <span className="ml-1 -rotate-90">
            <ChevronDown />
          </span>
        </div>
      </Link>
      <Header />
      <PhotoGrid />
      <div className="-mx-4 bg-white p-4 md:mx-0 md:rounded-md">
        <PropertyInfo />
        <PropertyDescription />
        <FeaturesSection />
      </div>
    </div>
  );
};
