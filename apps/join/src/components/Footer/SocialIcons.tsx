import React from 'react';

import Link from 'next/link';

import { FacebookIcon } from '@images/icons/SocialIcons/Facebook';
import { InstagramIcon } from '@images/icons/SocialIcons/Instagram';
import { LinkedinIcon } from '@images/icons/SocialIcons/Linkedin';
import { PintrestIcon } from '@images/icons/SocialIcons/Pintrest';
import { TwitterIcon } from '@images/icons/SocialIcons/Twitter';
import { YoutubeIcon } from '@images/icons/SocialIcons/Youtube';

export const SocialIcons = () => {
  const socialIcons = [
    {
      Element: FacebookIcon,
      socialTitle: 'Facebook',
      socialLink: 'https://www.facebook.com/kyero.co.uk/',
    },
    { Element: TwitterIcon, socialTitle: 'Twitter', socialLink: 'https://twitter.com/kyero' },
    {
      Element: InstagramIcon,
      socialTitle: 'Instagram',
      socialLink: 'https://www.instagram.com/kyero_property/',
    },
    { Element: YoutubeIcon, socialTitle: 'YouTube', socialLink: 'https://www.youtube.com/c/kyero' },
    {
      Element: PintrestIcon,
      socialTitle: 'Pinterest',
      socialLink: 'https://www.pinterest.co.uk/kyeroproperty/',
    },
    {
      Element: LinkedinIcon,
      socialTitle: 'Linkedin',
      socialLink: 'https://www.linkedin.com/company/kyero-com/mycompany/',
    },
  ];
  return (
    <ul className="flex gap-4 sm:order-2 sm:ml-auto">
      {socialIcons.map((icon) => (
        <li key={icon.socialTitle}>
          <Link target="_blank" aria-label={icon.socialTitle} href={icon.socialLink}>
            <a>
              <icon.Element aria-hidden />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
