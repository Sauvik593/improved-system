export const formDataWithoutEmptyFields = (form: HTMLFormElement) => {
  const originalFormData = new FormData(form);
  const newFormData = new FormData();

  for (const [key, value] of originalFormData.entries()) {
    if (value !== '') {
      newFormData.append(key, value);
    }
  }

  return newFormData;
};

export const getDesiredParamsData = ({
  params,
  fieldsList,
  accumulator,
}: {
  params: FormData | URLSearchParams;
  fieldsList: string[];
  accumulator: URLSearchParams | FormData;
}) => {
  return Array.from(params.entries()).reduce((acc, [key, value]) => {
    if (!fieldsList.includes(key)) {
      return acc;
    }

    if (value !== '' && typeof value === 'string') {
      acc.append(key, value);
    }

    return acc;
  }, accumulator);
};

export const stringifyFromEntries = (formData: URLSearchParams | FormData) =>
  JSON.stringify(Object.fromEntries(formData.entries()));
