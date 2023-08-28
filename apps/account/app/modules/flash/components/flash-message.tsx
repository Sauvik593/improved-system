import { useEffect } from 'react';
import { Link } from '@remix-run/react';

import { Alert } from '@kyero/ui';

import type { ExtendedFlash } from './reducer';

interface Props {
  flash: ExtendedFlash;
  onClose: (id: string) => void;
}

export const FlashMessage = ({ flash, onClose }: Props) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose(flash.id);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const action = flash.link ? { ...flash.link, LinkComponent: Link } : undefined;
  return (
    <div className="mb-3">
      <Alert type={flash.type} closable fullWidth onClose={() => onClose(flash.id)} action={action}>
        {flash?.message}
      </Alert>
    </div>
  );
};
