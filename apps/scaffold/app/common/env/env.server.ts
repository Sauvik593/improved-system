import { z } from 'zod';

const envSchema = z.object({
  SENTRY_DSN: z.string().optional(),
  FACEBOOK_APP_ID: z.string().optional(),
  BASE_URL: z.string(),
  HUBSPOT_ID: z.string().optional(),
  CLARITY_ID: z.string().optional(),
  FRESHRELEVANCE_ID: z.string().optional(),
  GTM_ID: z.string().optional(),
  KYERO_ENV: z.enum(['production', 'staging', 'development']),
});

export const getBackendEnv = () => envSchema.parse(process.env);

export type BackendEnv = ReturnType<typeof getBackendEnv>;
