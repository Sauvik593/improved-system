import { type LoaderFunction } from '@remix-run/node';
import { handleNotFound } from '~/modules/errors/helpers.server';

export const loader: LoaderFunction = async (args) => {
  return handleNotFound(args);
};

export default function () {
  return null;
}
