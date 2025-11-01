import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  currentPage,
}) => {
  return (
    <ReactPaginate
      previousLabel={'← '}
      nextLabel={' →'}
      pageCount={pageCount}
      onPageChange={onPageChange}
      forcePage={currentPage}
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousClassName={css.previous}
      nextClassName={css.next}
      disabledClassName={css.disabled}
    />
  );
};

export default Pagination;
