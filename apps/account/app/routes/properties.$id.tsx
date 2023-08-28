import { LoaderFunction, V2_MetaFunction, redirect } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  // For now redirect to properties route
  // because this view is not yet implemented
  return redirect('/properties');
};

export const meta: V2_MetaFunction = ({ data }) => [
  {
    title: data['title'],
  },
];

export default null;
