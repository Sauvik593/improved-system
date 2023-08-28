const isArray = (value: unknown): value is Array<unknown> => Array.isArray(value);
const isNotNull = (value: unknown) => value !== null;
const isObject = (value: unknown) => typeof value === 'object';
const isRecord = (value: unknown): value is Record<string, unknown> =>
  isArray(value) && isNotNull(value) && isObject(value);

export const handleValue = (value: unknown): unknown => {
  if (!value) {
    return null;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }

  if (isArray(value)) {
    return value.map(handleValue);
  }

  if (isRecord(value)) {
    return transformFormData(value as Record<string, unknown>);
  }

  return value;
};

export const transformFormData = (data: Record<string, unknown>): Record<string, unknown> => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (isArray(value)) {
      return {
        ...acc,
        [`${key}[]`]: value.map(handleValue),
      };
    }

    return {
      ...acc,
      [key]: handleValue(value),
    };
  }, {});
};
