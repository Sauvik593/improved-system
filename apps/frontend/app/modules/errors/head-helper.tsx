import { useTranslation } from 'react-i18next';
import { createHead } from 'remix-island';
import { assetsPathTo } from '~/common/client-router/helpers';

export const createHeadSSR = (titleKey: string, headName: string) => {
  return createHead(
    () => {
      const { t } = useTranslation();
      return (
        <>
          <title>{`${t(titleKey)} | Kyero`}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {[
            { name: 'apple-mobile-web-app-title', content: 'Kyero' },
            { name: 'application-name', content: 'Kyero' },
            { name: 'msapplication-config', content: assetsPathTo('/favicon/browserconfig.xml') },
            { name: 'theme-color', content: '#1F4DEF' },
          ].map((props) => (
            <meta key={props.name} {...props} />
          ))}
          {[
            {
              rel: 'apple-touch-icon',
              sizes: '180x180',
              href: assetsPathTo('/favicon/apple-touch-icon.png'),
            },
            {
              rel: 'icon',
              type: 'image/png',
              href: assetsPathTo('/favicon/favicon-32x32.png'),
              sizes: '32x32',
            },
            {
              rel: 'icon',
              type: 'image/png',
              href: assetsPathTo('/favicon/favicon-16x16.png'),
              sizes: '16x16',
            },
            {
              rel: 'mask-icon',
              href: assetsPathTo('/favicon/safari-pinned-tab.svg'),
              color: '#1F4DEF',
            },
            { rel: 'shortcut icon', href: assetsPathTo('/favicon/favicon.ico') },
            { rel: 'manifest', href: '/manifest.json' },
          ].map((props) => (
            <link key={props.href} {...props} />
          ))}
        </>
      );
    },
    { id: headName },
  );
};
