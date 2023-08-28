const { z } = require('zod');

const SERVER_ENV_SCHEMA = z.object({
  BASE_URL: z.string(),
  FRONTEND_API_URL: z.string(),
  FRONTEND_API_AUTH_TOKEN: z.string(),
  KYERO_ENV: z.enum(['production', 'staging', 'development', 'test']),
  SENTRY_DSN: z.string().optional(),
  VERSION: z.string().optional(),
  FACEBOOK_APP_ID: z.string().optional(),
  HUBSPOT_ID: z.string().optional(),
  CLARITY_ID: z.string().optional(),
  FRESHRELEVANCE_ID: z.string().optional(),
  GTM_ID: z.string().optional(),
  NODE_ENV: z.enum(['production', 'development', 'test']),
  ASSETS_PREFIX: z.string().optional(),
});

const CLIENT_ENV_SCHEMA = z.object({
  BASE_URL: z.string(),
  KYERO_ENV: z.enum(['production', 'staging', 'development', 'test']),
  SENTRY_DSN: z.string().optional(),
  FACEBOOK_APP_ID: z.string().optional(),
  HUBSPOT_ID: z.string().optional(),
  VERSION: z.string().optional(),
  CLARITY_ID: z.string().optional(),
  FRESHRELEVANCE_ID: z.string().optional(),
  GTM_ID: z.string().optional(),
  ASSETS_PREFIX: z.string().optional(),
});

const SERVER_ENV = SERVER_ENV_SCHEMA.parse(process.env);
const CLIENT_ENV = CLIENT_ENV_SCHEMA.parse(process.env);

function createEnvContext() {
  return {
    SERVER_ENV,
    CLIENT_ENV,
  };
}

module.exports = {
  createEnvContext,
  SERVER_ENV_SCHEMA,
  CLIENT_ENV_SCHEMA,
  CLIENT_ENV,
  SERVER_ENV,
};
