import NextHead from 'next/head';

import { GeneralConfig, SeoConfig } from '@lib/types';
import { useHeadLang } from '@hooks/useHeadLang';
import { useSeoConfig } from '@hooks/useSeoConfig';
import { TwitterConfig } from './Seo/TwitterConfig';
import { FacebookConfig } from './Seo/FacebookConfig';
import { getAssetsUrl } from '@helpers/assetsUrl';

interface Props {
  seoConfig: SeoConfig | null;
  title?: string;
  description?: string | null;
  generalConfig: GeneralConfig;
}

export const Head: React.FunctionComponent<Props> = ({
  seoConfig,
  generalConfig,
  title,
  description,
}) => {
  const { seo, robotsIndexContent, builtTitle, descriptionTag, SEO_IMAGE, strippedDescription } =
    useSeoConfig({
      title,
      description,
      generalConfig,
      seoConfig,
    });
  const { canonical, alternatives, xDefault } = useHeadLang();

  return (
    <NextHead>
      <title>{builtTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {generalConfig.owner && <meta name="owner" content={`${generalConfig.owner}`} />}
      {generalConfig.copyright && <meta name="copyright" content={`${generalConfig.copyright}`} />}
      <meta name="robots" content={robotsIndexContent} />

      <meta property="og:title" content={builtTitle} />
      {descriptionTag && <meta property="og:description" content={strippedDescription as string} />}
      <meta property="og:type" content="article" />
      <meta property="og:image" content={SEO_IMAGE} />
      <meta property="og:url" content={builtTitle} />
      <meta property="og:site_name" content={`"${generalConfig.siteName}"`} />

      {descriptionTag && <meta name="description" content={strippedDescription as string} />}
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}

      <link rel="sitemap" href={getAssetsUrl('/static/sitemap.xml')} type="application/xml" />

      <link href={canonical} rel="canonical" />
      {alternatives.map((alternate) => {
        return (
          <link
            href={alternate.href}
            rel="alternate"
            hrefLang={alternate.locale}
            key={alternate.href}
          />
        );
      })}

      <link href={xDefault} hrefLang="x-default" rel="alternate" />

      <link
        rel="icon"
        type="image/png"
        href="https://data-assets.kyero.com/common/logo/favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="https://data-assets.kyero.com/common/logo/favicon-16x16.png"
        sizes="16x16"
      />
      <link
        rel="mask-icon"
        href="https://data-assets.kyero.com/common/logo/safari-pinned-tab.svg"
        color="#e93f46"
      />

      <link
        rel="preload"
        href={getAssetsUrl('/static/fonts/gilroy-bold-webfont.woff2')}
        as="font"
        type="font/woff2"
      />
      <link
        rel="preload"
        href={getAssetsUrl('/static/fonts/gilroy-medium-webfont.woff2')}
        as="font"
        type="font/woff2"
      />
      <link
        rel="preload"
        href={getAssetsUrl('/static/fonts/gilroy-semibold-webfont.woff2')}
        as="font"
        type="font/woff2"
      />

      {seo.twitter && <TwitterConfig {...seo.twitter} />}

      {generalConfig.facebookAppId && (
        <meta property="fb:app_id" content={generalConfig.facebookAppId} />
      )}
      {seo.facebook && <FacebookConfig {...seo.facebook} />}
    </NextHead>
  );
};
