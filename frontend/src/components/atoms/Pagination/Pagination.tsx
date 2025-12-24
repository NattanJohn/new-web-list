import styles from './Pagination.module.scss';

type Props = {
  total: number;
  current: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ total, current, perPage, onPageChange }: Props) => {
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  // Se houver apenas uma página, não precisamos mostrar a paginação
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={styles.container} aria-label="Navegação de páginas">
      <div className={styles.pages}>
        <button
          className={styles.btn}
          onClick={() => onPageChange(Math.max(1, current - 1))}
          disabled={current === 1}
          aria-label="Página anterior"
        >
          ‹
        </button>

        {pages.map((p) => (
          <button
            key={p}
            className={`${styles.btn} ${p === current ? styles.current : ''}`}
            onClick={() => onPageChange(p)}
            aria-current={p === current ? 'page' : undefined}
          >
            {p}
          </button>
        ))}

        <button
          className={styles.btn}
          onClick={() => onPageChange(Math.min(totalPages, current + 1))}
          disabled={current === totalPages}
          aria-label="Próxima página"
        >
          ›
        </button>
      </div>
    </nav>
  );
};

export default Pagination;