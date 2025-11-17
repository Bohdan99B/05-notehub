import styles from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const buttons = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className={styles.pagination}>
      <li onClick={() => onChange(Math.max(page - 1, 1))}>
        <a>{"<"}</a>
      </li>

      {buttons.map(num => (
        <li
          key={num}
          className={num === page ? styles.active : ""}
          onClick={() => onChange(num)}
        >
          <a>{num}</a>
        </li>
      ))}

      <li onClick={() => onChange(Math.min(page + 1, totalPages))}>
        <a>{">"}</a>
      </li>
    </ul>
  );
}
