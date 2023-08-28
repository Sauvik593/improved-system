import { createMachine, type StateFrom } from 'xstate';
import { sendInstrument } from '~/modules/tracking/instrument';
import { type LocationRecommendation } from './location-recommendations.types';

export type LocationRecommendationStates = StateFrom<typeof locationRecommendationMachine>;

export const locationRecommendationMachine = createMachine<{
  abortController: AbortController | null;
  nationId: null | number;
  locale: string | null;
  results: LocationRecommendation[];
}>(
  {
    predictableActionArguments: true,
    id: 'fetch',
    initial: 'idle',
    context: {
      abortController: null,
      nationId: null,
      locale: null,
      results: [],
    },
    states: {
      idle: {
        on: {
          FETCH: [
            {
              target: 'fetching',
              actions: 'assignToContext',
            },
          ],
        },
      },
      fetching: {
        invoke: {
          src: 'fetchRecommendations',
          onDone: {
            actions: 'handleSuccess',
            target: 'success',
          },
          onError: {
            target: 'failure',
          },
        },
      },
      failure: {},
      success: {},
    },
  },
  {
    actions: {
      handleSuccess: (context, event) => {
        const { locations } = event.data;
        const kyeroCount = locations.length;
        context.results = locations;

        sendInstrument('suggested.location.kyero.count', { kyeroCount });
      },

      assignToContext: (context, event) => {
        context.nationId = event.nationId;
        context.locale = event.locale;
      },
    },

    services: {
      fetchRecommendations: async (context) => {
        const abortController = context.abortController;
        const { nationId, locale } = context;

        if (abortController) {
          abortController.abort();
        }

        context.abortController = new AbortController();

        const signal = context.abortController.signal;
        const resp = await fetch(
          `/kyero-api/location-recommendations?nation_id=${nationId}&locale=${locale}`,
          { signal },
        );
        const data = await resp.json();

        return data;
      },
    },
  },
);
