vi.mock('~/i18next.server', () => ({
  default: {
    getFixedT: async () => (key: string) => key,
  },
}));
