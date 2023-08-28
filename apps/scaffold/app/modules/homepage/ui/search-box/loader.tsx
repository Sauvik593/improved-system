import { Kyero } from '@kyero/icons';

export const Loader = () => (
  <div
    className="flex h-[180px] w-full items-center justify-center gap-2"
    data-testid="searchbox.loader"
  >
    <Kyero />
    <h3>Loading results...</h3>
  </div>
);

Loader.displayName = 'Loader';
