import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Close } from '@kyero/icons';
import { GetinTouchCommentsIcon } from '../../images/icons/GetInTouchCommentsIcon';
import { ArrowLink } from '@kyero/ui';

export const GetInTouchCTA = () => {
  const [showmodal, setShowModal] = useState(true);
  const { t } = useTranslation('common');
  return (
    <>
      {showmodal ? (
        <div
          className="bottom bg-sierra-night-100  fixed right-6 bottom-20 z-10 hidden  flex-col items-start justify-start space-x-2 rounded-full p-2  shadow-lg  md:flex"
          onClick={() => setShowModal(false)}
        >
          <i>
            <GetinTouchCommentsIcon />
          </i>
        </div>
      ) : (
        <div className="bottom bg-sierra-night-100 fixed right-6 bottom-20 z-10 hidden h-20 w-96 flex-col items-start justify-start space-x-2 rounded-xl p-4 shadow-lg  md:flex">
          <i className="absolute -top-2 -right-2">
            <Link href={'javascript:;'}>
              <a
                className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100"
                onClick={() => setShowModal(true)}
              >
                <Close className="h-4 w-4" />
              </a>
            </Link>
          </i>
          <div className="flex space-x-2">
            <i>
              <GetinTouchCommentsIcon />
            </i>
            <div>
              <h5 className="text-h-5 font-bold text-white">Want to speak to somebody?</h5>
              <Link href={'/contact'}>
                <ArrowLink
                  message={t('ui.buttons.get_in_touch')}
                  linkProps={{
                    to: '/',
                  }}
                  baseColorClassname="text-sky-100"
                  activeClassName="hover:text-sky-150 focus:text-sky-150"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
