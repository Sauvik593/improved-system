import { Media } from '@lib/api/strapi/media';
import { SocialConfig as Props } from '@lib/types';

export const TwitterConfig = ({ title, description, img }: Props) => (
  <>
    <meta name="twitter:site" content="@kyero" />
    <meta name="twitter:domain" content="kyero.com" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {img && <meta name="twitter:image" content={Media.getTwitterSizeUrl(img.url)} />}
  </>
);
