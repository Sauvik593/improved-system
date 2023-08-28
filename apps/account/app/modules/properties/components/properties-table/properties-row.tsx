import { BoostStatus } from './boost-status';

import { type Property } from '~/modules/properties/types';
import { PrimeSwitch } from '~/modules/properties/components/prime-switch';
import { PropertyCell } from './property-cell';

export const PropertiesRow = ({ property }: { property: Property }) => {
  const { id, prime, stats, createdAtFormatted } = property;
  return (
    <tr className="grid grid-cols-2 bg-white lg:table-row lg:border-b lg:border-t lg:border-sierra-night-10">
      <td className="order-2 flex items-center p-4 text-center md:p-4 lg:table-cell lg:py-4 lg:pl-8">
        <PrimeSwitch name="prime[][property_id]" disabled={true} defaultValue={prime} value={id} />
      </td>
      <td className="col-span-2 pb-0 lg:py-4 lg:pl-8">
        <PropertyCell property={property} />
      </td>
      <td className="hidden p-4 xl:table-cell">{createdAtFormatted}</td>
      <td className="hidden p-4 xl:table-cell">{stats.viewsCount}</td>
      <td className="hidden p-4 xl:table-cell">{stats.enquiriesCount}</td>
      <td className="order-3 whitespace-nowrap p-4 md:whitespace-normal lg:px-6">
        <BoostStatus property={property} />
      </td>
    </tr>
  );
};

PropertiesRow.displayName = 'PropertiesRow';
