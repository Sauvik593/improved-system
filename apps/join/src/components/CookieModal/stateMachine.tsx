import { assign } from 'lodash';
import { type AnyEventObject, createMachine, type StateFrom } from 'xstate';
export type CookieBarStates = StateFrom<typeof cookieBarMachine>;

const hasNotMadeDecision = (_: unknown, event: AnyEventObject) => {
  return event.nonEssentialCookies === undefined || event.nonEssentialCookies === false;
};

export const cookieBarMachine = createMachine<{
  nonEssentialCookies?: boolean;
}>(
  {
    predictableActionArguments: true,
    id: 'cookies',
    initial: 'loading',
    context: {
      nonEssentialCookies: undefined,
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
              POLICY_CHANGE: { actions: ['setCookieValue'], target: '#cookies.hidden' },
            },
          },
          open: {
            on: {
              CLOSE: {
                target: 'idle',
              },
              POLICY_CHANGE: { actions: ['setCookieValue'], target: 'closing' },
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
      setCookie: assign((_, action) => ({ cookie: action.nonEssentialCookies })),
    },
    guards: {
      hasNotMadeDecision,
    },
  },
);
