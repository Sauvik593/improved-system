import { useHydrated } from 'remix-utils';

export const JSField = () => {
  const hydrated = useHydrated();

  return (
    <input
      type="checkbox"
      hidden
      name="js"
      value="true"
      checked={hydrated}
      readOnly
      data-testid="js-field"
    />
  );
};
