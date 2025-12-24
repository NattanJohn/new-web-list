import styles from './EmptyState.module.scss';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState = ({ message = 'Nenhum item encontrado.' }: EmptyStateProps) => {
  return (
    <div className={styles.empty} role="status" aria-live="polite">
      {message}
    </div>
  );
};
