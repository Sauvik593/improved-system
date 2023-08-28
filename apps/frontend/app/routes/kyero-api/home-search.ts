import { type LoaderFunction } from '@remix-run/node';
import { handleNotFound } from '~/modules/errors/helpers.server';
import { HomeSearchAction } from '~/modules/homepage/search/home-search.action.server';

export const action: LoaderFunction = async (data) => {
  return await new HomeSearchAction(data).run();
};

export const loader: LoaderFunction = async (data) => {
  return await handleNotFound(data);
};
