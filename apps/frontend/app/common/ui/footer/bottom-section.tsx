import cn from 'classnames';
import { Advertise } from '@kyero/icons';
import { Button } from '@kyero/ui';
import { useNavLinks } from '~/common/hooks/use-nav-links';
import { Trans } from 'react-i18next';

interface Props {
  visible: boolean;
  className?: string;
  visibleClassNames?: string;
  invisibleClassNames?: string;
}

export const FooterBottomSection = ({
  visible,
  className = '',
  visibleClassNames = '',
  invisibleClassNames = '',
}: Props) => {
  const { stickyFooterLinks, advertiseLink } = useNavLinks();
  return (
    <section
      className={cn(
        'border-sierra-night-10 border-t-1 bottom-0 left-0 w-full bg-white py-2 transition-all duration-200',
        className,
        {
          [visibleClassNames]: visible,
          [invisibleClassNames]: !visible,
        },
      )}
    >
      <div className="mx-auto max-w-[1176px] overflow-hidden px-5">
        <nav className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <ul className="text-p-3 grid w-full grid-cols-3 gap-2 md:flex md:items-center md:gap-4">
            <li className=" text-sierra-night-80 col-span-3 w-full whitespace-nowrap font-bold md:w-auto">
              © Portal47 Ltd
            </li>
            {stickyFooterLinks.map(([text, link]) => (
              <li key={text}>
                <a
                  href={link}
                  title={text}
                  className="text-sierra-night-100 block max-w-[100px] truncate hover:text-orange-100 focus:text-orange-100 lg:max-w-none lg:max-w-[200px]"
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
          <Button
            type="button"
            variant="full"
            buttonType="orange"
            fullWidth
            linkProps={{ to: advertiseLink }}
            className="md:w-auto md:whitespace-nowrap"
            message={
              <span className="flex items-center justify-center gap-2">
                <i>
                  <Advertise />
                </i>
                <span className="w-full truncate md:max-w-[150px] lg:max-w-none">
                  <Trans i18nKey="common.footer.join_cta" />
                </span>
              </span>
            }
          />
        </nav>
      </div>
    </section>
  );
};
