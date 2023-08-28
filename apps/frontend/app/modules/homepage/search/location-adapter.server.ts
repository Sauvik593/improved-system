import { type DataFunctionArgs } from '@remix-run/node';
import { type SearchRoute } from './home-search.action.server';
import { type LocationSuggestion } from '../ui/search-box';

export class LocationAdapter {
  context: DataFunctionArgs['context'];
  location: LocationSuggestion;

  constructor(context: DataFunctionArgs['context'], location: LocationSuggestion) {
    this.context = context;
    this.location = location;
  }

  getRedirectPath = (locale: string, searchRoute: SearchRoute) => {
    switch (searchRoute) {
      case 'buy':
        return this.location.for_sale_path;
      case 'rent':
        return this.location.to_rent_path;
      case 'agents':
        return this.location.agent_list_path;
    }
  };
}
