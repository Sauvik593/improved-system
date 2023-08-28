import { URL } from 'node:url';

import { redirect, type DataFunctionArgs, json } from '@remix-run/node';
import { captureRemixServerException } from '@sentry/remix';
import { withZod } from '@remix-validated-form/with-zod';
import { type z } from 'zod';

import i18next from '~/i18next.server';
import { DEFAULT_LOCALE } from '~/i18n';
import { COUNTRIES, type ServerCountry } from '../country-specific/helpers';

import { apiService } from '~/server/api/service.server';
import { FallbackCountryAdapter } from './fallback-country-adapter.server';
import { LocationAdapter } from './location-adapter.server';

import { type HomeSearchSchema, getFormSchema } from './home-search.form.validator';
import { type LocationSuggestion } from '~/modules/homepage/ui/search-box';
export type SearchRoute = 'buy' | 'rent' | 'agents';

const OLD_FRONTEND_URL =
  process.env.KYERO_ENV !== 'production' ? 'https://devmodo.com' : 'https://www.kyero.com';

/**
 * This class handles action for homepage search and few scenarios
 * First on is a correct path so a user selects a suggetion and gets redirected to the correct path
 * which are buy | rent | agents
 *
 * Second scenario is when someone types something and submitted a form without the response.
 * In this case we do a suggestion search on a backend side and redirect to the first result
 *
 * The fird scenario is when there is no input or fetching suggestions failed.
 * Then we redirect to the default country route based on a selected option
 */
export class HomeSearchAction {
  context: DataFunctionArgs['context'];
  request: DataFunctionArgs['request'];
  params: DataFunctionArgs['params'];

  constructor(args: DataFunctionArgs) {
    this.context = args.context;
    this.request = args.request;
    this.params = args.params;
  }

  async run() {
    const locale = await this.getLocaleFromForm();
    const { data, error } = await this.validate(locale);

    if (error) {
      return await this.redirectoToDefaultLocation(locale as string, data);
    }

    try {
      if (data?.location) {
        return await this.redirectToLocation(
          new LocationAdapter(this.context, data.location as LocationSuggestion),
          locale as string,
          data,
        );
      }
    } catch (error) {
      return await this.redirectoToDefaultLocation(locale as string, data);
    }

    return await this.redirectoToDefaultLocation(locale as string, data);
  }

  async redirectoToDefaultLocation(locale: string, data: z.infer<HomeSearchSchema> | undefined) {
    const adaptedLocation = await this.handleNoLocation(locale, data);

    return await this.redirectToLocation(adaptedLocation, locale as string, data);
  }

  async getLocaleFromForm(): Promise<string> {
    const clonedForm = await this.request.clone().formData();
    return ((await clonedForm.get('locale')) as string) || DEFAULT_LOCALE;
  }

  async handleNoLocation(locale: string, data: z.infer<HomeSearchSchema> | undefined) {
    const search = data?.search || '';
    const nation_id = data?.nation_id || '';
    const isSearchValid = !!search && search.length > 0 && search.length < 10;

    if (isSearchValid && !!nation_id) {
      try {
        const [results, , status] = await apiService.get<LocationSuggestion[]>(
          `/locations/search`,
          {
            request: this.request,
            locale,
            params: new URLSearchParams({ nation_id, locale, q: search }),
          },
        );

        if (status === 'ok' && results.length > 0) {
          return new LocationAdapter(this.context, results[0]);
        }
      } catch (e) {
        return new FallbackCountryAdapter(
          this.context,
          this.getFallbackCountry(nation_id) as ServerCountry,
        );
      }
    }

    return new FallbackCountryAdapter(
      this.context,
      this.getFallbackCountry(nation_id) as ServerCountry,
    );
  }

  getFallbackCountry(nation_id: string | undefined) {
    if (!nation_id) {
      return COUNTRIES.SPAIN;
    }

    const foundCountry = Object.values(COUNTRIES).find(
      (country) => country.id === parseInt(nation_id, 10),
    );

    return foundCountry || COUNTRIES.SPAIN;
  }

  redirectToLocation(
    locationAdapter: LocationAdapter | FallbackCountryAdapter,
    locale: string,
    data: z.infer<HomeSearchSchema> | undefined,
  ) {
    const route = data?.route || 'buy';
    const js = data?.js || false;

    const url = new URL(locationAdapter.getRedirectPath(locale, route), OLD_FRONTEND_URL);

    if (js) {
      return json({ url: url.toString() });
    }

    return redirect(url.toString());
  }

  handleErrorCapture(error: Error | unknown) {
    if (error instanceof Error) {
      captureRemixServerException(error, 'remix.server', this.request);
    }
  }

  async validate(locale: string) {
    const t = await i18next.getFixedT(locale);
    const schema = getFormSchema(t);
    const formData = await this.request.formData();

    const { data, error } = await withZod(schema).validate(formData);

    return { data, error };
  }
}
