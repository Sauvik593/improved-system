// Tested in e2e specs. Not going to run if this fails.
import { Agent } from 'node:https';

const BASE_ROUTE = process.env.FRONTEND_API_URL || 'http://frontend-api.kyero.test:5000';
const AUTH_TOKEN = process.env.FRONTEND_API_AUTH_TOKEN || '603d658419402c4b5d36687c9cd3875c';

const getFetchHeaders = () => ({
  Authorization: `Bearer ${AUTH_TOKEN}`,
  'Content-Type': 'application/json',
});

export async function preloadRoutesFromAPI() {
  const fullPath = '/v1/links/navigation';
  const url = new URL(fullPath, BASE_ROUTE);

  console.log('BASE ROUTE: ', BASE_ROUTE);
  const isHttps = url.protocol === 'https:';

  const resp = await fetch(url, {
    method: 'GET',
    headers: getFetchHeaders(),
    // eslint-disable-next-line
    // @ts-ignore
    agent: isHttps ? new Agent({ rejectUnauthorized: false }) : undefined,
  });
  const clonedResponse = resp.clone();

  if (!resp.ok) {
    throw new Error(`Failed to preload routes from API: ${resp.status}, ${resp.statusText}`);
  }

  try {
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log('Failed to parse JSON');
    const responseBody = await clonedResponse.text();
    console.log(`status: ${clonedResponse.status}, statusText: ${clonedResponse.statusText}`);
    console.log('body ', responseBody);

    throw error;
  }
}
