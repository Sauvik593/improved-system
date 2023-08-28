import { ParsedUrlQuery } from 'querystring';

interface Paginatable {
  total_count: string;
}

const BASE_PAGINATION = 10;

interface PaginatedPaths {
  params: ParsedUrlQuery;
  locale?: string;
}

type ParamsGetter<T> = (param: T) => PaginatedPaths;

export function getPaginatedStaticPaths<T extends Paginatable>(paramsGetter: ParamsGetter<T>) {
  return (paginatables: T[]) => {
    const paths = paginatables.reduce((acc: PaginatedPaths[], paginatable) => {
      const totalCount = parseInt(paginatable.total_count, 10);
      const pagesCount = Math.ceil(totalCount / BASE_PAGINATION);

      if (pagesCount === 1) {
        return acc;
      }

      const staticPathsForPages = Array.from({ length: pagesCount }).map((_, index) => {
        const staticPaths = paramsGetter(paginatable);
        return {
          ...staticPaths,
          params: {
            ...staticPaths.params,
            pageNumber: (index + 1).toString(),
          },
        };
      });

      return [...acc, ...staticPathsForPages];
    }, []);

    return paths;
  };
}
