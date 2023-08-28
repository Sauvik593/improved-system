import { createContext } from 'react';

interface ContentUrlContentProps {
  url: string;
  suffixPath?: string | null | ((locale: string) => string);
}

export const ContentUrlContext = createContext<ContentUrlContentProps>({
  url: '',
  suffixPath: null,
});
