import { type EntryContext } from '@remix-run/node';
import { ErrorHeads } from '~/modules/errors';

import { Head } from '~/root';

export const hydrateHead = (remixContext: EntryContext) => {
  const { statusCode, errors, loaderData } = remixContext.staticHandlerContext;

  const ErrorHead = ErrorHeads[statusCode as keyof typeof ErrorHeads];

  if (ErrorHead) {
    return {
      HeadElement: ErrorHead,
      loaderData: {
        ...loaderData,
        'route-errors': errors?.root.data,
      },
    };
  }

  return {
    HeadElement: Head,
    loaderData,
  };
};
