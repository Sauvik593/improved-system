import { createContext, useState } from 'react';
import { cookieBarMachine } from '@components/CookieModal/stateMachine';
import { InterpreterFrom } from 'xstate';
import Cookies from 'js-cookie';

export type CookieBarStateMachine = InterpreterFrom<typeof cookieBarMachine>;

interface CookieContextParams {
  nonEssentialCookies: boolean;
  setCookieValue: (cookieValue: boolean) => void;
}

// eslint-disable-next-line
// @ts-ignore
export const CookieContext = createContext<CookieContextParams>({});

export const CookieProvider = (props: { children: React.ReactNode }) => {
  const nonEssentialCookieValue = Cookies.get('non_essential_cookies');
  const [nonEssentialCookies, setNonEssentialCookies] = useState(Boolean(nonEssentialCookieValue));
  const setCookieValue = (cookieValue: boolean) => {
    Cookies.set('non_essential_cookies', `${cookieValue}`, {
      expires: 365,
      path: '',
      ...(process.env.NODE_ENV === 'production' && { secure: true }),
    });
    setNonEssentialCookies(Boolean(cookieValue));
  };

  return (
    <CookieContext.Provider value={{ nonEssentialCookies, setCookieValue }}>
      {props.children}
    </CookieContext.Provider>
  );
};
