import cn from 'classnames';
import { useRef } from 'react';
import { useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import { CartRowLocation } from './cart-row-location';
import { CartRowProperty } from './cart-row-property';
import { CartRowAction } from './cart-row-action';

import { type MouseEvent } from 'react';
import { type PrimeBoost } from '~/modules/properties';

interface Props {
  primeBoost: PrimeBoost;
}

export const CartRow = ({ primeBoost: { location, property, priceFormatted, id } }: Props) => {
  const { t } = useTranslation();
  const fetcher = useFetcher<unknown>();
  const ref = useRef<HTMLFormElement>(null);

  const handleRemove = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    const confirmation = confirm(t('ui.cart.removeAlert') as string);

    if (!!confirmation && ref.current) {
      fetcher.submit(ref.current, { method: 'delete' });
    }
  };

  return (
    <tr
      className={cn(
        'grid grid-cols-[1.5fr,1fr,0.5fr] items-center bg-white lg:table-row lg:border-b lg:border-t lg:border-sierra-night-10',
        {
          ['animate-pulse bg-sierra-night-5']: fetcher.state === 'submitting',
        },
      )}
    >
      <td className="col-span-3 border-b border-sierra-night-10 p-4 pb-0 lg:py-4 lg:pl-8">
        <CartRowProperty {...property} />
      </td>
      <td className="p-4">
        <CartRowLocation name={location.name} />
      </td>
      <td className="p-4 text-p-3 font-bold lg:text-h-6">{priceFormatted}</td>
      <td className="p-4 text-center">
        <CartRowAction fetcher={fetcher} id={id} onRemove={handleRemove} ref={ref} />
      </td>
    </tr>
  );
};

CartRow.displayName = 'CartRow';
