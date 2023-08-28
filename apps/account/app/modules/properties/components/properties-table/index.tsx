import { PropertiesRow } from './properties-row';

import { type Property } from '~/modules/properties/types';
import { EmptyRow } from './empty-row';
import { TableHead } from './table-head';

interface Props {
  properties: Property[];
}

export const PropertiesTable = ({ properties }: Props) => {
  const emptyResults = properties.length === 0;

  return (
    <div className="mt-6 overflow-hidden rounded-t-xl">
      <table className="w-full table-fixed">
        <TableHead />
        <tbody className="flex flex-col gap-4 lg:table-row-group">
          {emptyResults && <EmptyRow />}
          {properties.map((property) => (
            <PropertiesRow key={property.id} property={property} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
