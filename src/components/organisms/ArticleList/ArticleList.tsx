import { PostCard } from '../../molecules/PostCard/PostCard';
import styles from './ArticleList.module.scss';
import articlesData from '@/data/news.json';

export const ArticleList = () => {
  return (
    <section className={styles.container}>
      {articlesData.map((article) => (
        <PostCard 
          key={article.id}
          slug={article.slug}
          title={article.title}
          summary={article.summary}
          date={article.date}
        />
      ))}
    </section>
  );
};