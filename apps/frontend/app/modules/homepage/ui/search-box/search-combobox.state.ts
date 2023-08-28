import { createMachine, assign, type AnyEventObject, type StateFrom } from 'xstate';

const searchValid = (_: unknown, event: AnyEventObject) => {
  return event.query && event.query.length >= 3;
};

export type SearchComboboxStates = StateFrom<typeof searchMachine>;
export const searchMachine = createMachine<{
  retries: number;
  search: string;
  nationId: number | null;
  locale: string;
  abortController: AbortController | null;
  action: undefined | AnyEventObject['action'];
  results: unknown[];
}>(
  {
    predictableActionArguments: true,
    id: 'fetch',
    initial: 'idle',
    context: {
      retries: 0,
      search: '',
      locale: 'en',
      nationId: null,
      abortController: null,
      action: undefined,
      results: [],
    },
    states: {
      idle: {
        on: {
          SEARCH: [
            {
              target: 'debouncing',
              cond: searchValid,
              actions: 'assignActionToContext',
            },
            {
              target: 'idle',
              actions: 'clearRequest',
            },
          ],
        },
      },
      debouncing: {
        on: {
          SEARCH: [
            {
              actions: 'assignActionToContext',
              target: 'debouncing',
            },
          ],
        },
        after: {
          300: {
            target: 'fetching',
            actions: 'performAction',
          },
        },
      },
      fetching: {
        invoke: {
          src: 'fetchSuggestions',
          onDone: {
            actions: 'handleSuccess',
            target: 'idle',
          },
        },
        on: {
          SEARCH: [
            {
              target: 'debouncing',
              cond: searchValid,
              actions: 'assignActionToContext',
            },
            {
              target: 'idle',
              actions: 'clearRequest',
            },
          ],
        },
      },
      failure: {
        on: {
          RETRY: {
            target: 'fetching',
            actions: assign({
              retries: (context, event) => context.retries + 1,
            }),
          },
        },
      },
    },
  },
  {
    actions: {
      handleSuccess: (context, event) => {
        context.results = event.data.results;
      },
      assignActionToContext: assign((_, event) => {
        return {
          action: event.action,
          search: event.query,
          locale: event.locale,
          nationId: event.nationId,
        };
      }),
      performAction: (context) => {
        if (context.action) {
          context.action();
        }
      },
      clearRequest: (context, event) => {
        context.results = [];
        context.search = '';

        if (context.abortController) {
          context.abortController.abort();
        }

        context.abortController = null;
      },
    },
    services: {
      fetchSuggestions: async (context) => {
        const abortController = context.abortController;

        if (abortController) {
          abortController.abort();
        }

        context.abortController = new AbortController();

        const signal = context.abortController.signal;
        const { locale, nationId, search } = context;

        const resp = await fetch(
          `/kyero-api/location-suggestions?locale=${locale}&nation_id=${nationId}&q=${search}`,
          { signal },
        );
        const data = await resp.json();

        return data;
      },
    },
    guards: {
      searchValid,
    },
  },
);
