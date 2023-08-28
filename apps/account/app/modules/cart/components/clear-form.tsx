import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from '@remix-run/react';
import { DeleteIcon } from '@kyero/icons';

import { type MouseEvent } from 'react';

export const ClearForm = () => {
  const { t } = useTranslation();
  const clearRef = useRef<HTMLFormElement>(null);
  const clearFetcher = useFetcher();

  const handleClear = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    const confirmation = confirm(t('ui.cart.clearAlert') as string);

    if (!!confirmation && clearRef.current) {
      clearFetcher.submit(clearRef.current, { method: 'delete' });
    }
  };

  return (
    <clearFetcher.Form method="delete" ref={clearRef}>
      <button
        className="flex items-center gap-1 text-terracotta-100"
        type="submit"
        disabled={clearFetcher.state === 'submitting'}
        onClick={handleClear}
      >
        <DeleteIcon />
        <p className="font-bold">{t('ui.cart.clear')}</p>
      </button>
      <input type="hidden" name="action" value="clear" />
    </clearFetcher.Form>
  );
};

ClearForm.displayName = 'ClearForm';
