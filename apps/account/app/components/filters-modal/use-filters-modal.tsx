import { useEffect } from 'react';
import { useSearchParams, useNavigation } from '@remix-run/react';

import { PaneConfig } from '.';

interface Props {
  config: PaneConfig[];
  opened: boolean;
  onClose: () => void;
}

export const useFiltersModal = ({ config, opened, onClose }: Props) => {
  const [searchParams] = useSearchParams();
  const { formMethod } = useNavigation();
  const fieldsList = config.map(({ fieldName }) => fieldName);

  useEffect(() => {
    if (formMethod === 'GET' && opened) {
      onClose();
    }
  }, [formMethod, opened]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.code === 'Escape' && opened) {
        onClose();
      }
    }

    window.addEventListener('keyup', closeOnEscape);
    return () => {
      window.removeEventListener('keyup', closeOnEscape);
    };
  });

  return {
    searchParams,
    fieldsList,
  };
};
