import React from 'react';

import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { useFooterLinks } from '@hooks/useFooterLinks';

export const FooterLinks = () => {
  const { t } = useTranslation('common');
  const { footerLinks } = useFooterLinks(t);
  return (
    <>
      {footerLinks.map((column, index) => (
        <ul key={column.columnTitle} data-testid={`footer-column-${index}`}>
          <li className="mb-3">
            <h5 className="text-h-4-sm text-sierra-night-100 font-bold">{column.columnTitle}</h5>
          </li>
          {column.links.map((link, index) => (
            <li className="mb-1" key={index} data-testid="footer-link">
              <Link href={link.path}>
                <a className="text-sierra-night-100 font-medium hover:text-orange-100">
                  {link.key}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </>
  );
};
