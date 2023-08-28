import snakeCase from 'lodash/snakeCase';

export type ObjectParam = Record<string, string>;

export const transformToSnakeCaseParams = (params: ObjectParam) =>
  Object.entries(params).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [snakeCase(key)]: value,
    }),
    {},
  );
