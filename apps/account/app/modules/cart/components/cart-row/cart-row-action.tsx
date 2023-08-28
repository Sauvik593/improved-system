import { forwardRef, MouseEvent } from 'react';
import { useFetcher } from '@remix-run/react';

import { DeleteIcon } from '@kyero/icons';

interface Props {
  onRemove: (ev: MouseEvent<HTMLButtonElement>) => void;
  fetcher: ReturnType<typeof useFetcher<unknown>>;
  id: string;
}
export const CartRowAction = forwardRef<HTMLFormElement, Props>(
  ({ fetcher, onRemove, id }, ref) => (
    <fetcher.Form method="delete" ref={ref} action="/cart">
      <button className="mx-auto" type="submit" onClick={onRemove}>
        <DeleteIcon />
      </button>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="action" value="remove" />
    </fetcher.Form>
  ),
);

CartRowAction.displayName = 'CartRowAction';
