import { PostCard } from '../../molecules/PostCard/PostCard';
import styles from './ArticleList.module.scss';
import articlesData from '@/data/news.json';
import type { Article } from '@/types/article';

type Props = {
  articles?: Article[];
};

export const ArticleList = ({ articles = articlesData as Article[] }: Props) => {
  if (!articles || articles.length === 0) {
    return (
      <section className={styles.container}>
        Nenhum artigo encontrado.
      </section>
    );
  }

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