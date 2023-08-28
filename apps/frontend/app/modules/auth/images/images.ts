import mobileJPG from '~/modules/auth/images/mobile-auth.jpg';
import mobileJPGRetina from '~/modules/auth/images/mobile-auth@2x.jpg';
import mobileAVIF from '~/modules/auth/images/mobile-auth.avif';
import mobileAVIFRetina from '~/modules/auth/images/mobile-auth@2x.avif';
import mobileWEBP from '~/modules/auth/images/mobile-auth.webp';
import mobileWEBPRetina from '~/modules/auth/images/mobile-auth@2x.webp';

import tabletJPG from '~/modules/auth/images/tablet-auth.jpg';
import tabletJPGRetina from '~/modules/auth/images/tablet-auth@2x.jpg';
import tabletAVIF from '~/modules/auth/images/tablet-auth.avif';
import tabletAVIFRetina from '~/modules/auth/images/tablet-auth@2x.avif';
import tabletWEBP from '~/modules/auth/images/tablet-auth.webp';
import tabletWEBPRetina from '~/modules/auth/images/tablet-auth@2x.webp';

import desktopJPG from '~/modules/auth/images/desktop-auth.jpg';
import desktopJPGRetina from '~/modules/auth/images/desktop-auth@2x.jpg';
import desktopAVIF from '~/modules/auth/images/desktop-auth.avif';
import desktopAVIFRetina from '~/modules/auth/images/desktop-auth@2x.avif';
import desktopWEBP from '~/modules/auth/images/desktop-auth.webp';
import desktopWEBPRetina from '~/modules/auth/images/desktop-auth@2x.webp';

export const mobile = {
  key: 'mobile',
  query: `(max-width: 768px)`,
  jpg: [mobileJPG, mobileJPGRetina],
  avif: [mobileAVIF, mobileAVIFRetina],
  webp: [mobileWEBP, mobileWEBPRetina],
};

export const tablet = {
  key: 'tablet',
  jpg: [tabletJPG, tabletJPGRetina],
  avif: [tabletAVIF, tabletAVIFRetina],
  webp: [tabletWEBP, tabletWEBPRetina],
};

export const desktop = {
  key: 'desktop',
  query: undefined,
  jpg: [desktopJPG, desktopJPGRetina],
  avif: [desktopAVIF, desktopAVIFRetina],
  webp: [desktopWEBP, desktopWEBPRetina],
};
