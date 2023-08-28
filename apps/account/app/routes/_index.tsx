import { json, LoaderFunction, V2_MetaFunction } from '@remix-run/node';

import { SectionHeader } from '~/components/base-layout/section-header';
import { getT } from '~/server/helpers';

const PAGE_TITLE_KEY = 'dashboard.title';

export const loader: LoaderFunction = async ({ request }) => {
  const t = await getT(request);

  return json({ title: t(PAGE_TITLE_KEY) });
};

export const meta: V2_MetaFunction = ({ data }) => [
  {
    title: data['title'],
  },
];

export default function Index() {
  return (
    <div>
      <SectionHeader />
    </div>
  );
}
