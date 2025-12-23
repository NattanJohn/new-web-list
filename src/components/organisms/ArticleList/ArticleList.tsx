'use client';

import { useState, useEffect } from 'react';
import { PostCard } from '../../molecules/PostCard/PostCard';
import { Skeleton } from '../../atoms/Skeleton/Skeleton';
import styles from './ArticleList.module.scss';
import articlesData from '@/data/news.json';
import { Article } from '@/types/article';

export const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setArticles(articlesData as Article[]);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section className={styles.container}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px' }}>
            <Skeleton height="14px" width="30%" />
            <Skeleton height="28px" width="85%" />
            <Skeleton height="60px" width="100%" />
          </div>
        ))}
      </section>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <section className={styles.container} aria-label="Lista de artigos">
        Nenhuma notícia encontrada.
      </section>
    );
  }

  return (
    <section className={styles.container} aria-label="Lista de artigos">
      {articles.map((article) => (
        <PostCard
          key={article.id ?? article.slug}
          slug={article.slug}
          title={article.title}
          summary={article.summary ?? ''}
          date={article.date ?? ''}
        />
      ))}
    </section>
  );
};