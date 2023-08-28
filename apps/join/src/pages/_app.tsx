import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import '../../styles/application.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
