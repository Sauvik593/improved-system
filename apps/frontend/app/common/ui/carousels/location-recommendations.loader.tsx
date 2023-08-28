export const MIN_LOADERS_SIZE = 4;

export const LoaderItem = () => (
  <div className="w-full flex-none" data-testid="location-recommendation.loader-item">
    <div className="relative h-[212px] overflow-hidden rounded-md bg-white lg:h-[288px]">
      <div className="shadow-spread hover:shadow-spread-xl rounded-ms card absolute top-0 left-0 block h-full w-full overflow-hidden">
        <div className="transition-duration bg-sierra-night-10 absolute h-full w-full transition-opacity" />
        <div className="relative max-w-[200px] p-4">
          <div className="skeleton-pulse bg-sierra-night-20 mb-2 h-6 w-full" />
        </div>
        <div className="absolute bottom-8 flex h-6 w-full justify-center p-5">
          <div className="skeleton-pulse bg-sierra-night-20 h-8 w-full" />
        </div>
      </div>
    </div>
  </div>
);
