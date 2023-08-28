import cn from 'classnames';
import { Page } from './Page';
import { Button } from './Button';
import { usePagination } from './usePagination';

import type { LinkComponentProps } from '../types';

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  pathname: string;
  nextPage: number | null;
  prevPage: number | null;
  LinkComponent?: (props: LinkComponentProps) => React.ReactElement;
  search: string;
}

const DefaultComponent = ({ to, children, className }: LinkComponentProps) => {
  const path = typeof to === 'string' ? to : `${to?.pathname}?${to?.search}`;
  return (
    <a href={path} className={cn(className)}>
      {children}
    </a>
  );
};

export const Pagination = ({
  currentPage,
  totalPages,
  pathname,
  prevPage,
  nextPage,
  LinkComponent = DefaultComponent,
  search,
}: PaginationProps) => {
  const { showPrevDots, showNextDots, pagesArray } = usePagination(search, currentPage, totalPages);
  return (
    <nav className="mt-4">
      <ul className="flex items-center gap-2">
        <Button
          page={prevPage}
          pathname={pathname}
          search={search}
          type="prev"
          LinkComponent={LinkComponent}
          testId="pagination-prev"
        />
        {totalPages >= 2 && (
          <Page
            page={1}
            currentPage={currentPage}
            pathname={pathname}
            search={search}
            LinkComponent={LinkComponent}
            testId="pagination-firstpage"
          />
        )}
        {showPrevDots && (
          <li className="font-bold" data-testid="pagination-more-prev-dots">
            ...
          </li>
        )}
        {pagesArray.map((page) => {
          return (
            <Page
              key={page}
              page={page}
              currentPage={currentPage}
              pathname={pathname}
              search={search}
              LinkComponent={LinkComponent}
              testId={`pagination-page-${page}`}
            />
          );
        })}
        {showNextDots && (
          <li className="font-bold" data-testid="pagination-more-next-dots">
            ...
          </li>
        )}
        <Page
          page={totalPages}
          currentPage={currentPage}
          pathname={pathname}
          search={search}
          LinkComponent={LinkComponent}
          testId="pagination-lastpage"
        />
        <Button
          page={nextPage}
          pathname={pathname}
          search={search}
          type="next"
          testId="pagination-next"
          LinkComponent={LinkComponent}
        />
      </ul>
    </nav>
  );
};
