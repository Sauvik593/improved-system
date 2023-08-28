import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

export let loader: LoaderFunction = async () => {
  return json(
    {
      name: 'Kyero.com',
      theme_color: '#1F4DEF',
      background_color: '#1F4DEF',
      display: 'standalone',
      icons: [
        { src: 'favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: 'favicon/android-chrome-384x384.png', sizes: '384x384', type: 'image/png' },
        { src: 'favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=600',
        'Content-Type': 'application/manifest+json',
      },
    },
  );
};
