import { Media } from '@lib/api/strapi/media';
import type { SocialConfig as Props } from '@lib/types';

export const FacebookConfig = ({ img }: Props) => (
  <>
    <meta property="article:author" content="https://www.facebook.com/kyero.co.uk" />
    <meta property="article:publisher" content="https://www.facebook.com/kyero.co.uk" />
    {img && <meta property="og:image:url" content={Media.getTwitterSizeUrl(img.url)} />}
    {img && <meta property="og:image:secure_url" content={Media.getTwitterSizeUrl(img.url)} />}
    <meta property="og:image:width" content="1200" />
  </>
);
