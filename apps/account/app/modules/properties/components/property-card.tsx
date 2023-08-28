import { useTranslation } from 'react-i18next';
import { HouseIcon } from '@kyero/icons';

export interface Props {
  name: string;
  price: string;
  imageCoverUrl: string;
  referenceNumber: string;
  url: string;
}

export const PropertyCard = ({ name, price, imageCoverUrl, referenceNumber, url }: Props) => {
  const { t } = useTranslation();

  return (
    <article className="grid grid-cols-[112px,1fr] grid-rows-[1fr,min-content] gap-1 rounded-md bg-white p-4 md:grid-cols-1 md:grid-rows-[1fr,min-content,min-content] md:p-0">
      <img
        src={imageCoverUrl}
        width="100%"
        height="100%"
        className="my-auto overflow-hidden rounded-md rounded-t-md object-cover"
      />
      <aside className="flex w-full flex-col gap-2 rounded-b-md px-4 py-4 text-tile-100 md:gap-1">
        <p className="text-p-1 leading-tight ">
          {name} <span className="block">(Ref: {referenceNumber})</span>
        </p>
        <p className="text-h-5 font-bold">{price}</p>
      </aside>
      <footer className="col-span-2 mt-2 flex gap-2 md:col-span-1 md:mt-0 md:px-4 md:py-2 md:pb-4">
        <a
          href={url}
          target="_blank"
          className="flex items-center font-semibold text-ocean-100 hover:text-ocean-150 focus:text-ocean-150"
          rel="noopener noreferrer"
        >
          <i className="mr-1">
            <HouseIcon />
          </i>
          {t('ui.property.view')}
        </a>
      </footer>
    </article>
  );
};
