import { useSearchParams } from '@remix-run/react';
import { isNil, ifElse, pipe } from 'ramda';
import { useMemo } from 'react';

type CountConfig = {
  fieldName: string;
  type: 'single' | 'multiple';
};

type ValueHandlerProps = {
  acc: number;
  field: CountConfig;
  searchParams: URLSearchParams;
};

const handleMultipleValue = ({ acc, field, searchParams }: ValueHandlerProps) =>
  pipe(
    () => searchParams.getAll(field.fieldName),
    (param) => acc + param.length,
  );

const handleSingleValue = ({ acc, field: { fieldName }, searchParams }: ValueHandlerProps) =>
  ifElse(
    () => isNil(searchParams.get(fieldName)),
    () => acc,
    () => acc + 1,
  );

const handleFieldsCount = (searchParams: URLSearchParams) => (acc: number, field: CountConfig) =>
  ifElse(
    ({ field }) => field.type === 'multiple',
    handleMultipleValue,
    handleSingleValue,
  )({ acc, field, searchParams })();

export const useParamsCount = (config: CountConfig[]) => {
  const [searchParams] = useSearchParams();
  const count = useMemo(() => config.reduce(handleFieldsCount(searchParams), 0), [searchParams]);

  return { count };
};
