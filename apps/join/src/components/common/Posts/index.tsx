import { Pagination } from '@components/common/Pagination';
import { Articles } from '@components/Articles';
import { Article } from '@lib/types';

interface Props {
  content: Article[];
  totalPages: number;
  currentPage: number;
  url: string;
}

export const Posts = (props: Props) => {
  return (
    <div className="container relative mx-auto -mt-24 md:-mt-36">
      <Articles content={props.content} />
      <Pagination
        totalPages={props.totalPages}
        currentPage={props.currentPage}
        pathname={props.url}
        nextPage={props.currentPage + 1}
        prevPage={props.currentPage - 1}
      />
    </div>
  );
};
