import { redirect, type LoaderFunction } from '@remix-run/node';
import { type LocationSuggestion } from '~/modules/homepage/ui/search-box';

const wait = (time: number) => new Promise((res) => setTimeout(res, time));

// Dummy logic before backend integration
export const action: LoaderFunction = async ({ request }) => {
  let locationId: number | string = '';
  const form = await request.formData();

  try {
    const data = JSON.parse(form.get('location') as string) as LocationSuggestion;
    locationId = data.id;
  } catch (e) {
    locationId = '';
  }

  const route = form.get('route');
  const search = form.get('search');
  await wait(100);

  return redirect(`/?location=${locationId}&route=${route}&search=${search}`);
};
