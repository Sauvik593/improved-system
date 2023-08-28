import { type AnyEventObject, createMachine, type StateFrom, assign } from 'xstate';
export type CookieBarStates = StateFrom<typeof cookieBarMachine>;

const hasNotMadeDecision = (_: unknown, event: AnyEventObject) => {
  return event.nonEssentialCookies === null || typeof event.nonEssentialCookies === 'undefined';
};

export const cookieBarMachine = createMachine<{
  nonEssentialCookies?: null | string;
}>(
  {
    predictableActionArguments: true,
    id: 'cookies',
    initial: 'loading',
    context: {
      nonEssentialCookies: null,
    },
    states: {
      loading: {
        on: {
          LOAD: [
            {
              target: 'loaded',
              actions: ['setNonEssentialCookies'],
              cond: hasNotMadeDecision,
            },
            {
              target: 'hidden',
              actions: ['setNonEssentialCookies'],
            },
          ],
        },
      },
      loaded: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              OPEN: {
                target: 'open',
              },
              SUCCESS: {
                target: '#cookies.hidden',
              },
            },
          },
          open: {
            on: {
              CLOSE: {
                target: 'idle',
              },
              SUCCESS: [
                {
                  target: 'closing',
                },
              ],
            },
          },
          closing: {
            after: {
              200: {
                target: '#cookies.hidden',
              },
            },
          },
        },
      },
      hidden: {},
    },
  },
  {
    actions: {
      setNonEssentialCookies: assign((_, event) => {
        return {
          nonEssentialCookies: event.nonEssentialCookies,
        };
      }),
    },
    guards: {
      hasNotMadeDecision,
    },
  },
);
