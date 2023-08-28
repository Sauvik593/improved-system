import { json, type LoaderFunction } from '@remix-run/node';
import { apiService } from '~/server/api/service.server';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  const [results] = await apiService.get(`/locations/search`, {
    request,
    locale,
    params: searchParams,
  });

  return json({
    status: 'success',
    results,
  });
};
