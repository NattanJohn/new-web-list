import { Skeleton } from '../../atoms';
import styles from './ArticleList.module.scss';

export const ArticleListSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <section className={styles.container}>
      {[...Array(count)].map((_, i) => (
        <div key={i} style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '1rem' }}>
          <Skeleton height="200px" width="100%" />
          <Skeleton height="14px" width="30%" />
          <Skeleton height="28px" width="85%" />
          <Skeleton height="60px" width="100%" />
        </div>
      ))}
    </section>
  );
};
