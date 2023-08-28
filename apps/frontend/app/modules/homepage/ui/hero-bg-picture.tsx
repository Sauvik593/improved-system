import { type ServerCountry } from '../country-specific/helpers';

import { assetsPathTo } from '~/common/client-router/helpers';

interface Props {
  countryKey: ServerCountry['key'];
}

const VERSION = '1';

const getHeroAssetPath = (countryKey: ServerCountry['key']) => (name: string) => {
  return assetsPathTo(`/images/homepage/v${VERSION}/${countryKey}/${name}`);
};

export const HeroBgPicture = ({ countryKey }: Props) => {
  const heroAssetPath = getHeroAssetPath(countryKey);
  return (
    <picture>
      <source
        media="(max-width: 799px)"
        srcSet={`${heroAssetPath('home-mobile.webp')}, ${heroAssetPath('home-mobile@2x.webp')} 2x`}
        type="image/webp"
      />
      <source
        media="(max-width: 799px)"
        srcSet={`${heroAssetPath('home-mobile.avif')}, ${heroAssetPath('home-mobile@2x.avif')} 2x`}
        type="image/avif"
      />
      <source
        media="(max-width: 799px)"
        srcSet={`${heroAssetPath('home-mobile.jpg')}, ${heroAssetPath('home-mobile@2x.jpg')} 2x`}
      />
      <source
        media="(max-width: 1279px)"
        srcSet={`${heroAssetPath('home-tablet.webp')}, ${heroAssetPath('home-tablet@2x.webp')} 2x`}
        type="image/webp"
      />
      <source
        media="(max-width: 1279px)"
        srcSet={`${heroAssetPath('home-tablet.avif')}, ${heroAssetPath('home-tablet@2x.avif')} 2x`}
        type="image/avif"
      />
      <source
        media="(max-width: 1279px)"
        srcSet={`${heroAssetPath('home-tablet.jpg')}, ${heroAssetPath('home-tablet@2x.jpg')} 2x`}
      />
      <source
        media="(max-width: 1400px)"
        srcSet={`${heroAssetPath('home-md.jpg')}, ${heroAssetPath('home-md@2x.jpg')} 2x`}
      />
      <source
        media="(max-width: 1400px)"
        srcSet={`${heroAssetPath('home-md.avif')}, ${heroAssetPath('home-md@2x.avif')} 2x`}
        type="image/avif"
      />
      <source
        media="(max-width: 1400px)"
        srcSet={`${heroAssetPath('home-md.webp')}, ${heroAssetPath('home-md@2x.webp')} 2x`}
        type="image/webp"
      />
      <source
        srcSet={`${heroAssetPath('home-hi.webp')}, ${heroAssetPath('home-hi@2x.webp')} 2x`}
        type="image/webp"
      />
      <source
        srcSet={`${heroAssetPath('home-hi.avif')}, ${heroAssetPath('home-hi@2x.avif')} 2x`}
        type="image/avif"
      />
      <img
        src={heroAssetPath('home-hi.jpg')}
        srcSet={`${heroAssetPath('home-hi.jpg')}, ${heroAssetPath('home-hi@2x.jpg')} 2x`}
        alt={countryKey}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-center"
        role="presentation"
      />
    </picture>
  );
};

export const preloadHeroImage = (country: ServerCountry) => {
  const getUrl = (path: string) =>
    assetsPathTo(`/images/homepage/v${VERSION}/${country.key}/${path}.webp`);

  return [
    {
      rel: 'preload',
      as: 'image' as const,
      href: getUrl('home-mobile'),
      type: 'image/webp',
      imageSrcSet: `${getUrl('home-mobile@2x')} 2x`,
      media: '(max-width: 799px)',
    },
    {
      rel: 'preload',
      as: 'image' as const,
      href: getUrl('home-tablet'),
      type: 'image/webp',
      imageSrcSet: `${getUrl('home-tablet@2x')} 2x`,
      media: '(min-width: 799.1px) and (max-width: 1279px)',
    },
    {
      rel: 'preload',
      as: 'image' as const,
      href: getUrl('home-md'),
      type: 'image/webp',
      imageSrcSet: `${getUrl('home-md@2x')} 2x`,
      media: '(min-width: 1279.1px) and (max-width: 1400px)',
    },
    {
      rel: 'preload',
      as: 'image' as const,
      href: getUrl('home-hi'),
      type: 'image/webp',
      imageSrcSet: `${getUrl('home-hi@2x')} 2x`,
      media: '(min-width: 1400.1px)',
    },
  ];
};
