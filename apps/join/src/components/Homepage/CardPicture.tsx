import { getAssetsUrl } from '@helpers/assetsUrl';

const imageVariations = [
  { media: '(max-width: 639px)', type: 'webp', suffix: 'mobile' },
  { media: '(max-width: 639px)', type: 'avif', suffix: 'mobile' },
  { media: '(max-width: 639px)', type: 'png', suffix: 'mobile' },
  { media: '(max-width: 1023px)', type: 'webp', suffix: 'tablet' },
  { media: '(max-width: 1023px)', type: 'avif', suffix: 'tablet' },
  { media: '(max-width: 1023px)', type: 'png', suffix: 'tablet' },
  { type: 'webp', suffix: 'desktop' },
  { type: 'avif', suffix: 'desktop' },
  { type: 'png', suffix: 'desktop' },
];

export const CardPicture = ({ countryKey }: { countryKey: string }) => (
  <picture>
    {imageVariations.map(({ media, type, suffix }) => (
      <source
        key={`${countryKey}-${suffix}-${type}`}
        media={media}
        srcSet={getAssetsUrl(`/images/countries/${countryKey}/${suffix}.${type}`)}
        type={`image/${type}`}
      />
    ))}
    <img
      src={getAssetsUrl(`/images/countries/${countryKey}/desktop.png`)}
      alt={countryKey}
      className="absolute top-0 left-0 h-full w-full object-cover"
      role="presentation"
    />
  </picture>
);
