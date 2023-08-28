import { type DataFunctionArgs } from '@remix-run/node';
import { type ServerCountry } from '../country-specific/helpers';
import { type SearchRoute } from './home-search.action.server';

export class FallbackCountryAdapter {
  context: DataFunctionArgs['context'];
  location: ServerCountry;

  constructor(context: DataFunctionArgs['context'], location: ServerCountry) {
    this.context = context;
    this.location = location;
  }

  getRedirectPath = (locale: string, searchRoute: SearchRoute) => {
    const routes = this.context.KyeroRouter.getFrontendRoutes(locale);

    switch (searchRoute) {
      case 'buy':
      default:
        return routes.properties_for_sale[
          this.location.key as keyof typeof routes.properties_for_sale
        ];
      case 'rent':
        return routes.properties_to_rent[
          this.location.key as keyof typeof routes.properties_to_rent
        ];

      case 'agents':
        return routes.agents_search[this.location.key as keyof typeof routes.agents_search];
    }
  };
}
