import { usePagination } from './usePagination';

import { Button } from './Button';
import { Page } from './Page';

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  pathname: string;
  nextPage: number | null;
  prevPage: number | null;
}

export const Pagination = ({
  currentPage,
  totalPages,
  pathname,
  prevPage,
  nextPage,
}: PaginationProps) => {
  const { showPrevDots, showNextDots, pagesArray } = usePagination(currentPage, totalPages);
  return (
    <nav className="mt-6">
      <ul className="flex items-center gap-2">
        <Button
          page={prevPage}
          pathname={pathname}
          type="prev"
          testId="pagination-prev"
          pages={pagesArray}
        />
        {totalPages >= 2 && (
          <Page
            page={1}
            currentPage={currentPage}
            pathname={pathname}
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
          testId="pagination-lastpage"
        />
        <Button
          page={nextPage}
          pathname={pathname}
          type="next"
          testId="pagination-next"
          pages={pagesArray}
        />
      </ul>
    </nav>
  );
};
