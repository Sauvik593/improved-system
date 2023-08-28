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

export const getClientEnv = () => envSchema.parse(window.ENV);

declare global {
  interface Window {
    ENV: {
      SENTRY_DSN: string;
      BASE_URL: string;
      FACEBOOK_APP_ID: string;
      GTM_ID: string;
    };
    dataLayer: [] | undefined;
    clarity?: () => {
      q: any[];
    };
  }
}

export type ClientEnv = ReturnType<typeof getClientEnv>;
