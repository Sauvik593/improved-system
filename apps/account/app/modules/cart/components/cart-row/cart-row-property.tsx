interface Props {
  name: string;
  refNumber: string;
  createdAtFormatted: string;
  priceFormatted: string;
  coverImageUrl: string;
}

export const CartRowProperty = ({
  name,
  refNumber,
  createdAtFormatted,
  coverImageUrl,
  priceFormatted,
}: Props) => {
  return (
    <div className="grid auto-cols-min grid-cols-[112px,1fr] grid-rows-[1fr,min-content] gap-4 lg:grid-cols-[112px,1fr,min-content] lg:grid-rows-[1fr,min-content,min-content] lg:gap-0">
      <div className="lg:row-span-2 lg:mr-4 lg:flex lg:items-center">
        <img className="rounded-md" src={coverImageUrl} alt={'test'} />
      </div>
      <div className="flex flex-col overflow-auto lg:col-span-1">
        <p className="flex-none py-1 text-h-4-sm font-bold text-sierra-night-100 lg:text-h-5">
          {name}
        </p>
        <div className="text-p-3-sm flex gap-2 whitespace-nowrap lg:text-p-2">
          <p>{priceFormatted}</p>
          <p>Ref: {refNumber}</p>
        </div>
        <p className="hidden text-p-2">Created {createdAtFormatted}</p>
      </div>
    </div>
  );
};

CartRowProperty.displayName = 'CartRowProperty';
