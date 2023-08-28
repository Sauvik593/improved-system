export interface Localization {
  locale: string;
  publishedAt: string | null;
  url: string;
  slug: string;
  features_url: string;
  pricing_url: string;
  integrations_url: string;
  contact_url: string;
  tell_us_about_url: string;
}

export interface MediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  placeholder?: string;
}

export type MediaFormatName = 'large' | 'medium' | 'small' | 'thumbnail' | 'placeholder' | 'base64';

export type ImageSize = 'article' | 'featured_image' | 'author';

export interface MediaImage {
  id: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    [key in MediaFormatName]: MediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
}

export interface BaseLayoutProps {
  applicationSettings: GeneralConfig;
  country: Country | null;
  countries: Country[];
  url: string;
  locale: string;
  locales: string[];
  localizations: Localization[];
  className?: string;
  children?: React.ReactNode;
  suffixPath?: string | ((locale: string) => string) | null;
  title?: string;
  seo?: SeoConfig;
  description?: string | null;
}

export interface CreationMetaData {
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface LinkComponent {
  id: number;
  title: string;
  url: string;
}

export interface Country {
  id: number;
  slug: string;
  title: string;
  name: string;
  nation_id: number;
  url: string;
  locale: string;
  prefix: string;
  translation_key: string;
  localizations: Country[];
  publishedAt: Date | null;
  hubspot_newsletter_id: string | undefined;
  guides_newsletter_id: string | undefined;
}

export interface SocialConfig {
  id: string;
  title: string;
  description: string;
  img: MediaImage;
}

export interface GeneralConfig {
  id: number;
  siteName: string;
  owner?: string;
  copyright?: string;
  facebookAppId?: string;
}

export interface SeoConfig {
  id: number;
  title: string | null;
  description: string | null;
  keywords: string;
  preventIndexing: boolean;
  facebook: SocialConfig | null;
  twitter: SocialConfig | null;
}
