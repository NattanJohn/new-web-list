import styles from './Skeleton.module.scss';

type SkeletonProps = {
  width?: string;
  height?: string;
  variant?: 'block' | 'list' | 'article';
  count?: number;
};

const SkeletonBlock = ({ width, height }: { width?: string; height?: string }) => (
  <div className={styles.skeleton} style={{ width, height }} />
);

export const Skeleton = ({ width, height, variant = 'block', count = 6 }: SkeletonProps) => {
  if (variant === 'list') {
    return (
      <section aria-label="Carregando notícias" className={styles.wrapper}>
        <div className={styles.grid}>
          {[...Array(count)].map((_, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.image}>
                <SkeletonBlock height="100%" width="100%" />
              </div>

              <div className={styles.metaRow}>
                <div className={styles.metaSmall}>
                  <SkeletonBlock height="12px" width="40%" />
                </div>
                <div className={styles.metaSmall}>
                  <SkeletonBlock height="12px" width="60%" />
                </div>
              </div>

              <div className={styles.titleLine}>
                <SkeletonBlock height="100%" width="90%" />
              </div>

              <div className={styles.textBlock}>
                <SkeletonBlock height="14px" width="100%" />
                <SkeletonBlock height="14px" width="95%" />
                <SkeletonBlock height="14px" width="88%" />
              </div>

              <div className={styles.cta}>
                <SkeletonBlock height="100%" width="100%" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (variant === 'article') {
    return (
      <article aria-label="Carregando artigo" className={styles.articleWrapper}>
        <div className={styles.backButton}>
          <SkeletonBlock height="24px" width="60px" />
        </div>

        <header className={styles.articleHeader}>
          <div className={styles.articleTitle}>
            <SkeletonBlock height="36px" width="100%" />
            <SkeletonBlock height="28px" width="90%" />
          </div>

          <div className={styles.articleMeta}>
            <SkeletonBlock height="14px" width="45%" />
            <SkeletonBlock height="14px" width="40%" />
          </div>
        </header>

        <div className={styles.articleImage}>
          <SkeletonBlock height="100%" width="100%" />
        </div>

        <div className={styles.articleContent}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={styles.articleParagraph}>
              <SkeletonBlock height="18px" width="100%" />
              <SkeletonBlock height="18px" width="100%" />
              <SkeletonBlock height="18px" width={i === 4 ? '60%' : '100%'} />
            </div>
          ))}
        </div>
      </article>
    );
  }

  return <SkeletonBlock width={width} height={height} />;
};