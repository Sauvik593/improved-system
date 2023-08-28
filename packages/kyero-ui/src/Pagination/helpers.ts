import queryString from 'query-string';

const PAGE_RANGE = 2;

export const getPaginationList = (currentPage: number, totalPage: number) => {
  const { rangeStart, rangeEnd } = getRange(currentPage, totalPage);
  const arraySize = rangeEnd - rangeStart + 1;

  return Array.from({ length: arraySize }).map((_, index) => rangeStart + index);
};

const getRange = (currentPage: number, totalPage: number) => {
  let rangeStart = currentPage - PAGE_RANGE;
  let rangeEnd = currentPage + PAGE_RANGE;

  if (rangeEnd > totalPage) {
    rangeEnd = totalPage;
    rangeStart = totalPage - PAGE_RANGE * 2;
    rangeStart = rangeStart < 1 ? 1 : rangeStart;
  }

  if (rangeStart <= 1) {
    rangeStart = 1;
    rangeEnd = Math.min(PAGE_RANGE * 2 + 1, totalPage);
  }

  return {
    rangeStart,
    rangeEnd,
  };
};

export const buildPaginationParams = (search: string, page: number) => {
  const updatedSearch = queryString.stringify({
    ...queryString.parse(search),
    page,
  });

  return updatedSearch;
};

export const isNotLastAndFirstPage = (totalPages: number) => (page: number) =>
  page !== totalPages && page !== 1;

export const checkPrevPageNotFirst = (pages: number[]) => {
  const firstElement = pages[0];

  return firstElement - 1 > 1;
};

export const checkNextPageNotLast = (pages: number[], totalPages: number) => {
  const lastElement = pages[pages.length - 1];

  return lastElement + 1 < totalPages;
};
