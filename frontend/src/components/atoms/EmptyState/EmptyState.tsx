import styles from './EmptyState.module.scss';
import Link from 'next/link';

interface Action {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  actions?: Action[];
}

export const EmptyState = ({
  title,
  message = 'Nenhuma notícia encontrada.',
  icon,
  actions,
}: EmptyStateProps) => {
  return (
    <div className={styles.empty} role="status" aria-live="polite">
      <div className={styles.visual}>{icon ?? <span className={styles.defaultIcon}>📰</span>}</div>
      {title && <h3 className={styles.title}>{title}</h3>}
      <p className={styles.message}>{message}</p>

      {actions && actions.length > 0 && (
        <div className={styles.actions}>
          {actions.map((a, i) => (
            a.href ? (
              <Link key={i} href={a.href} className={styles.actionButton} onClick={a.onClick}>
                {a.label}
              </Link>
            ) : (
              <button key={i} className={styles.actionButton} onClick={a.onClick}>
                {a.label}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
};
