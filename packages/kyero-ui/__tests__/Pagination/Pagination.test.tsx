import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import { Pagination, PaginationProps } from '../../src';

const getProps = (props: Partial<PaginationProps> = {}) => ({
  totalPages: 10,
  currentPage: 1,
  pathname: '/',
  nextPage: 2,
  prevPage: null,
  search: '?search=test',
  ...props,
});

const renderPagination = (props: PaginationProps) => <Pagination {...props} />;

describe('<Pagination />', () => {
  describe('when there is only 1 page results', () => {
    const props = getProps({ totalPages: 1, nextPage: null });
    const pagination = renderer.create(renderPagination(props)).toJSON();
    beforeEach(() => render(renderPagination(props)));

    it('renders correctly', () => {
      expect(pagination).toMatchSnapshot();
    });

    it('should render just a first page', () => {
      const onlyPage = screen.queryByTestId('pagination-lastpage');
      const secondPage = screen.queryByTestId('pagination-page-2');
      expect(onlyPage).toBeInTheDocument();
      expect(secondPage).toBeNull();
    });

    it('should render inactive next and prev buttons', () => {
      const prevButton = screen.queryByTestId('pagination-prev-inactive');
      const nextButton = screen.queryByTestId('pagination-next-inactive');

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it('should not render "more" dots in between', () => {
      const prevDots = screen.queryByTestId('pagination-more-prev-dots');
      const nextDots = screen.queryByTestId('pagination-more-next-dots');

      expect(prevDots).toBeNull();
      expect(nextDots).toBeNull();
    });
  });

  describe('when in the middle of pagination', () => {
    const props = getProps({ currentPage: 6, nextPage: 7, prevPage: 5 });
    const pagination = renderer.create(renderPagination(props)).toJSON();
    beforeEach(() => render(renderPagination(props)));

    it('renders correctly', () => {
      expect(pagination).toMatchSnapshot();
    });

    it('should render more than one page', () => {
      const currentPage = screen.queryByTestId('pagination-page-6');
      const prevPage = screen.queryByTestId('pagination-page-5');
      const nextPage = screen.queryByTestId('pagination-page-7');

      expect(currentPage).toBeInTheDocument();
      expect(prevPage).toBeInTheDocument();
      expect(nextPage).toBeInTheDocument();
    });

    it('should render active next and prev buttons', () => {
      const nextButton = screen.queryByTestId('pagination-next');
      const prevButton = screen.queryByTestId('pagination-prev');

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it('should render "more" dots in between', () => {
      const prevDots = screen.queryByTestId('pagination-more-prev-dots');
      const nextDots = screen.queryByTestId('pagination-more-next-dots');

      expect(prevDots).toBeInTheDocument();
      expect(nextDots).toBeInTheDocument();
    });

    it('should still render first page', () => {
      const firstPage = screen.queryByTestId('pagination-firstpage');

      expect(firstPage).toBeInTheDocument();
    });
  });

  describe('when at the beginning of the pagination', () => {
    const props = getProps();
    const pagination = renderer.create(renderPagination(props)).toJSON();
    beforeEach(() => render(renderPagination(props)));

    it('renders correctly', () => {
      expect(pagination).toMatchSnapshot();
    });

    it('should start at first page', () => {
      const currentPage = screen.queryByTestId('pagination-firstpage');
      const nextPage = screen.queryByTestId('pagination-page-2');
      const thirdPage = screen.queryByTestId('pagination-page-3');

      expect(currentPage).toBeInTheDocument();
      expect(nextPage).toBeInTheDocument();
      expect(thirdPage).toBeInTheDocument();
    });

    it('should render active next and prev buttons', () => {
      const prevButton = screen.queryByTestId('pagination-prev-inactive');
      const nextButton = screen.queryByTestId('pagination-next');

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it('should render "more" dots at the end of pagination', () => {
      const prevDots = screen.queryByTestId('pagination-more-prev-dots');
      const nextDots = screen.queryByTestId('pagination-more-next-dots');

      expect(prevDots).toBeNull();
      expect(nextDots).toBeInTheDocument();
    });
  });

  describe('when at the end of the pagination', () => {
    const props = getProps({ currentPage: 10, nextPage: null, prevPage: 9 });
    const pagination = renderer.create(renderPagination(props)).toJSON();
    beforeEach(() => render(renderPagination(props)));

    it('renders correctly', () => {
      expect(pagination).toMatchSnapshot();
    });

    it('should render end on last page', () => {
      const currentPage = screen.queryByTestId('pagination-lastpage');
      const nextPage = screen.queryByTestId('pagination-page-11');
      const prevPage = screen.queryByTestId('pagination-page-9');

      expect(currentPage).toBeInTheDocument();
      expect(nextPage).toBeNull();
      expect(prevPage).toBeInTheDocument();
    });

    it('should render active next and prev buttons', () => {
      const prevButton = screen.queryByTestId('pagination-prev');
      const nextButton = screen.queryByTestId('pagination-next-inactive');

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it('should render "more" dots at the end of pagination', () => {
      const prevDots = screen.queryByTestId('pagination-more-prev-dots');
      const nextDots = screen.queryByTestId('pagination-more-next-dots');

      expect(prevDots).toBeInTheDocument();
      expect(nextDots).toBeNull();
    });
  });
});
