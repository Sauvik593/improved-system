import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useSearchParams, useSubmit } from '@remix-run/react';
import { formDataWithoutEmptyFields } from '~/client/helpers';

export const useFiltersSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [currentFormData, setCurrentFormData] = useState<FormData | null>(null);
  const [filtersOpened, handleFilters] = useState(false);
  const [searchParams] = useSearchParams();
  const submit = useSubmit();

  const handleSubmit = (ev?: FormEvent<HTMLFormElement>) => {
    if (ev) {
      ev.preventDefault();
    }

    const currentRef = formRef.current;

    if (currentRef) {
      const formData = formDataWithoutEmptyFields(currentRef);

      submit(formData);
    }
  };

  const handleClearFilters = () => {
    submit(new FormData());
  };

  const handleFormChange = (ev: ChangeEvent<HTMLFormElement>) => {
    setCurrentFormData(new FormData(ev.currentTarget));
  };

  const openFilters = () => handleFilters(true);
  const closeFilters = () => handleFilters(false);

  return {
    formRef,
    handleFormChange,
    handleSubmit,
    currentFormData,
    searchParams,
    filtersOpened,
    handleClearFilters,
    openFilters,
    closeFilters,
  };
};
