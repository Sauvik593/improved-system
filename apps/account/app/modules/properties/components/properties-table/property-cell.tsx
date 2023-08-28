import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from '@remix-run/react';

import { Edit, Eye, Chat } from '@kyero/icons';
import { StatusBadge } from '~/components/property-badges';
import { Property } from '~/modules/properties/types';

interface Props {
  price: string;
  refNumber: string;
  id: string;
  createdAtFormatted: string;
}

export const PropertyInfo = ({ price, refNumber, createdAtFormatted, id }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <p>{price}</p>
      <p className="truncate">Ref: {refNumber}</p>
      <p className="truncate lg:hidden">{createdAtFormatted}</p>
      <Link to={`/properties/${id}`} className="flex gap-1 text-ocean-100 hover:text-ocean-150">
        <Edit />
        <span>{t('ui.edit')}</span>
      </Link>
    </>
  );
};

const BadgeList = ({ status }: { status: Property['status'] }) => (
  <ul className="inline-flex w-full gap-2  whitespace-nowrap">
    <li className="inline-block">
      <StatusBadge status={status} />
    </li>
  </ul>
);

export const PropertyCell = ({ property }: { property: Property }) => (
  <>
    <div className="grid  auto-cols-min grid-cols-[112px,1fr] grid-rows-[1fr,min-content] gap-4 p-4 lg:grid-cols-[112px,1fr,min-content] lg:grid-rows-[1fr,min-content,min-content] lg:gap-0">
      <div className="lg:row-span-2 lg:mr-4 lg:flex lg:items-start">
        <img
          src={property.coverImageUrl}
          alt={property.name}
          loading="lazy"
          width={112}
          height={80}
          className={cn('overflow-hidden rounded-md bg-sierra-night-10 object-cover', {
            'opacity-[0.1]': property.status === 'hidden',
          })}
        />
      </div>
      <div className="flex flex-col overflow-auto lg:col-span-1">
        <div className="overflow-auto">
          <BadgeList status={property.status} />
        </div>
        <p className="flex-none py-1 text-h-5 font-bold text-sierra-night-100">{property.name}</p>
      </div>
      <div className="col-span-2 flex gap-4 lg:col-span-2 lg:row-span-1">
        <PropertyInfo
          price={property.price}
          id={property.id}
          refNumber={property.refNumber}
          createdAtFormatted={property.createdAtFormatted}
        />
      </div>
    </div>
    <div className="-mx-4 border-t border-b border-sierra-night-10 px-8 py-2 lg:-mx-0 lg:border-0 lg:py-0 lg:px-4 xl:hidden">
      <ul className="flex gap-8">
        <li className="flex gap-2">
          <Eye />
          <span>{property.stats.viewsCount}</span>
        </li>
        <li className="flex gap-2">
          <Chat />
          <span>{property.stats.enquiriesCount}</span>
        </li>
      </ul>
    </div>
  </>
);
