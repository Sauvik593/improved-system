import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { HouseIcon, ShareIcon } from '@kyero/icons';

export const Header = () => {
  const { t } = useTranslation();
  return (
    <header className="mb-8 flex flex-col items-center sm:flex-row">
      <figure>
        <img
          src="https://loremflickr.com/177/122/city"
          alt={'test'}
          className="h-[243px] w-[343px] rounded-md bg-sierra-night-40 sm:h-[152px] sm:w-[214px]"
        />
      </figure>
      <article className="sm:ml-8">
        <h1 className={cn('mr-2 mt-2 text-h-3 font-semibold text-tile-100')}>
          4 bedroom villa in Benahavis
        </h1>
        <div className="mt-2 gap-4 text-h-5 font-semibold text-tile-100 sm:flex">
          <p>Benahavis, Malaga Province, Andalucian</p>
          <span className="h-auto w-[1px] bg-sierra-night-20" />
          <p>€2,325,000</p>
        </div>
        <footer className="mt-4 flex gap-4">
          <a
            href="/"
            target="_blank"
            className="flex items-center font-semibold text-ocean-100"
            rel="noopener noreferrer"
          >
            <i className="mr-1">
              <HouseIcon />
            </i>
            {t('ui.property.view')}
          </a>
          <a
            href="/"
            target="_blank"
            className="ml-auto flex items-center font-semibold text-ocean-100 sm:ml-0"
            rel="noopener noreferrer"
          >
            <i className="mr-1">
              <ShareIcon />
            </i>
            {t('ui.property.share')}
          </a>
        </footer>
      </article>
    </header>
  );
};
