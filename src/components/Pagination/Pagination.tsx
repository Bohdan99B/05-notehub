import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

export default function Pagination({ page, onPageChange, totalPages }: PaginationProps) {

  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      className={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      breakClassName={css.pageItem}
      breakLinkClassName={css.pageLink}
      activeClassName={css.active}
      previousLabel="«"
      nextLabel="»"
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={(selected) => onPageChange(selected.selected + 1)}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      breakLabel="..."
    />
  );
}
