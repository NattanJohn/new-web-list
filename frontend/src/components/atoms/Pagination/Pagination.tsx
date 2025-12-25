import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.scss';

type Props = {
  total: number;
  current: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ total, current, perPage, onPageChange }: Props) => {
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  if (totalPages <= 1) return null;

  const getVisiblePages = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];

    pages.push(1);

    if (current > 3) {
      pages.push('ellipsis');
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(totalPages - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < totalPages - 2) {
      pages.push('ellipsis');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className={styles.container} aria-label="Navegação de páginas">
      <div className={styles.pages}>
        <button
          className={styles.btn}
          onClick={() => onPageChange(Math.max(1, current - 1))}
          disabled={current === 1}
          aria-label="Página anterior"
        ><ChevronLeft size={20} />
        </button>

        {visiblePages.map((p, idx) => {
          if (p === 'ellipsis') {
            return (
              <span key={`ellipsis-${idx}`} className={styles.ellipsis} aria-hidden="true">
                ...
              </span>
            );
          }

          return (
            <button
              key={p}
              className={`${styles.btn} ${p === current ? styles.current : ''}`}
              onClick={() => onPageChange(p)}
              aria-current={p === current ? 'page' : undefined}
            >
              {p}
            </button>
          );
        })}

        <button
          className={styles.btn}
          onClick={() => onPageChange(Math.min(totalPages, current + 1))}
          disabled={current === totalPages}
          aria-label="Próxima página"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;