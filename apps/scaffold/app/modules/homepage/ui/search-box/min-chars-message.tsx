import { Kyero } from '@kyero/icons';

export const MinCharsMessage = () => (
  <div
    className="flex h-[180px] w-full items-center justify-center gap-2"
    data-testid="min-chars-message"
  >
    <Kyero />
    <h3>Please type minimum 3 characters...</h3>
  </div>
);

MinCharsMessage.displayName = 'MinCharsMessage';
