import { type LoaderFunction, type LoaderArgs, redirect } from '@remix-run/node';

import { handleNotFound } from '~/modules/errors/helpers.server';
import { getHomepageCountry, DEFAULT_COUNTRY_KEY } from './helpers';

import { SpainHomepageLoader } from './spain.server';
import { PortugalHomepageLoader } from './portugal.server';
import { ItalyHomepageLoader } from './italy.server';
import { FranceHomepageLoader } from './france.server';

import { type CountryLoaderResponse } from './country.loader.server';

const COUNTRY_LOADER_MAP = {
  spain: SpainHomepageLoader,
  portugal: PortugalHomepageLoader,
  italy: ItalyHomepageLoader,
  france: FranceHomepageLoader,
};

type COUNTRY_KEY = keyof typeof COUNTRY_LOADER_MAP;

export const loader: LoaderFunction = async (params) => {
  const specificLoader = await getCountrySpecificLoader(params);
  return await specificLoader.init();
};

export const getCountrySpecificLoader = async (args: LoaderArgs) => {
  const { params } = args;
  const { countryKey, locale } = params;

  const country = getHomepageCountry(locale as string, countryKey as string);

  if (!country) {
    return await handleNotFound(args);
  }

  const key = country.key as COUNTRY_KEY;

  if (key === DEFAULT_COUNTRY_KEY) {
    throw redirect(`/${locale}`, { status: 301 });
  }

  const Loader = COUNTRY_LOADER_MAP[key] || SpainHomepageLoader;
  return new Loader(args);
};

export type CountrySpecificLoaderType = CountryLoaderResponse;
