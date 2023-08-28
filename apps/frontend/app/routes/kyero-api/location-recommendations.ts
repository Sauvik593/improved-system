import { json, type LoaderFunction } from '@remix-run/node';
import { apiService } from '~/server/api/service.server';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const locale = url.searchParams.get('locale') || 'en';

  const [locations] = await apiService.get(`/locations/suggestions`, {
    request,
    locale,
    params: url.searchParams,
  });

  return json({
    locations,
  });
};
