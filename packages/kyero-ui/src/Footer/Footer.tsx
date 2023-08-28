import cn from 'classnames';
import { SunMark } from '@kyero/icons';
import { LanguageSwitcher, type LanguageSwitcherProps } from '../LanguageSwitcher';

export type FooterLink = {
  href: string;
  title: string;
  target?: string;
};

export interface FooterProps {
  linkProps: FooterLink[];
  className?: string;
  languageProps?: LanguageSwitcherProps;
  year?: number;
}

export const Footer = ({
  linkProps,
  className,
  languageProps,
  year = new Date(Date.now()).getUTCFullYear(),
}: FooterProps) => (
  <footer
    className={cn('relative w-full items-end p-2 md:flex md:justify-between md:py-0 md:pr-0', {
      [className || '']: true,
    })}
  >
    <nav className="block items-center px-4 md:flex md:pb-2">
      <section className="flex px-2 py-3 md:py-0">
        <SunMark />
        <p className="ml-2">© {year} Portal 47 Ltd</p>
      </section>
      <ul className="flex">
        {linkProps.map(({ title, ...anchorProps }) => (
          <li
            className="text-ocean-100 hover:text-ocean-150 px-2"
            key={`${title}_${anchorProps.href}`}
          >
            <a {...anchorProps}>{title}</a>
          </li>
        ))}
      </ul>
    </nav>
    {languageProps ? (
      <nav className="relative mt-2 flex items-end md:mt-0">
        <LanguageSwitcher {...languageProps} />
      </nav>
    ) : null}
  </footer>
);
