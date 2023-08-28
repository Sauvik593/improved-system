// config.server.ts
export const ENV = {
  SENTRY_DSN: process.env.SENTRY_DSN || false,
} as const;

export type ENV = typeof ENV;

declare global {
  interface Window {
    ENV: ENV;
  }
}
