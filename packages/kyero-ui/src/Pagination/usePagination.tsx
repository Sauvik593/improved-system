import { useMemo } from 'react';

import {
  checkNextPageNotLast,
  checkPrevPageNotFirst,
  getPaginationList,
  isNotLastAndFirstPage,
} from './helpers';

export const usePagination = (search: string, currentPage: number, totalPages: number) => {
  const pagesArray = useMemo(
    () => getPaginationList(currentPage, totalPages).filter(isNotLastAndFirstPage(totalPages)),
    [currentPage, totalPages],
  );

  const showNextDots = useMemo(
    () => checkNextPageNotLast(pagesArray, totalPages),
    [pagesArray, totalPages],
  );

  const showPrevDots = useMemo(() => checkPrevPageNotFirst(pagesArray), [pagesArray]);

  return {
    search,
    pagesArray,
    showNextDots,
    showPrevDots,
  };
};
