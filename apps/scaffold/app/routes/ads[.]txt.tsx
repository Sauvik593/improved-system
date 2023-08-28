import type { LoaderFunction } from '@remix-run/node';

export let loader: LoaderFunction = async () => {
  return new Response('google.com, pub-6935382283176616, DIRECT, f08c47fec0942fa0', {
    headers: {
      'Cache-Control': 'public, max-age=600',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
