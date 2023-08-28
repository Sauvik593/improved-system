import { type Fetcher } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { useField } from 'remix-validated-form';
import { useAppContext } from '~/common/contexts/app.context';

import { type ViewState } from './modal';
import { type InstrumentNewsletterPayload } from '~/modules/tracking/instrument';
import { getFormDataForInstrumentation } from './helper';

export const usePersonalisationModal = (
  formId: string,
  fetcher: Fetcher,
  buyersGuide: boolean,
  callback?: (payload: InstrumentNewsletterPayload) => void,
) => {
  const ref = useRef<HTMLFormElement>(null);
  const { user } = useAppContext();

  const [initialData, setInitialData] = useState({
    newsletter: false,
    email: user?.email ?? '',
    buyersGuide: buyersGuide,
  });

  const [activeModal, setActiveModal] = useState(false);
  const [activeView, setActiveView] = useState<ViewState>(null);

  const { error, getInputProps } = useField('email', {
    formId,
  });

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.state === 'success') {
      const data = getFormDataForInstrumentation(ref.current as HTMLFormElement, user);

      if (callback) {
        callback(data);
      }

      setInitialData({
        email: data.email,
        newsletter: !!data.newsletter,
        buyersGuide: buyersGuide,
      });
      setActiveView('intro');
      setActiveModal(true);
    }

    if (fetcher.state === 'idle' && fetcher.data?.state === 'error') {
      setActiveView('intro-error');
      setActiveModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher, buyersGuide]);

  const handleClose = () => {
    ref.current?.reset();
    setActiveModal(false);
    setTimeout(() => {
      setActiveView(null);
    }, 300);
  };

  return {
    fetcher,
    ref,
    handleClose,
    activeModal,
    activeView,
    initialData,
    setActiveView,
    getEmailProps: getInputProps,
    emailError: error,
  };
};
