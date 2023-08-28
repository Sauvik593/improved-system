import { getClientEnv } from './env.client';
import { getBackendEnv } from './env.server';

const ENV = typeof window !== 'undefined' && window.ENV ? getClientEnv() : getBackendEnv();

export default ENV;
