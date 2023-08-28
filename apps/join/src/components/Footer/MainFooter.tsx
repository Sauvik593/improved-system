import Link from 'next/link';

import { LogoWide } from '@kyero/icons';

import { useRefPosition } from '@hooks/useRefPosition';

import { FooterAdvertise } from './FooterAdvertise';
import { FooterLinks } from './FooterLinks';
import { SocialIcons } from './SocialIcons';
import { FooterCertified } from './FooterCertified';

export const MainFooter = () => {
  const { ref } = useRefPosition();
  return (
    <section className={'bg-white py-5 lg:py-10'} ref={ref}>
      <section className="mx-auto max-w-[1176px] overflow-hidden px-5">
        <div className="flex flex-col gap-6 sm:grid sm:grid-cols-[1fr_1fr] sm:grid-rows-[max-content_max-content_max-content] sm:gap-5 lg:grid-cols-[340px_1fr]  lg:grid-rows-[max-content_max-content] lg:gap-6">
          <div className="sm:order-1">
            <Link href="https://www.kyero.com/">
              <a>
                <LogoWide variant="dark" width={120} />
              </a>
            </Link>
          </div>
          <FooterCertified />
          <SocialIcons />
          <nav className="flex flex-col gap-4 sm:order-4 sm:col-span-2 sm:grid sm:grid-cols-4 lg:col-span-1">
            <FooterLinks />
            <FooterAdvertise />
          </nav>
        </div>
      </section>
    </section>
  );
};
