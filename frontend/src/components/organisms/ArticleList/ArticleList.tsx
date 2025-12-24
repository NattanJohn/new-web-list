'use client';

import { useState, useEffect } from 'react';
import { PostCard } from '../../molecules/PostCard/PostCard';
import { ArticleListSkeleton } from './ArticleListSkeleton';
import { EmptyState } from '../../atoms/EmptyState/EmptyState';
import { api } from '@/services/api';
import styles from './ArticleList.module.scss';
import type { Article } from '@/types';

export const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        const data = await api.getArticles();
        setArticles(data);
      } catch (err) {
        console.error("Erro ao carregar artigos:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (isLoading) return <ArticleListSkeleton />;

  if (error || !articles || articles.length === 0) {
    return (
      <section className={styles.container} aria-label="Lista de artigos">
        <EmptyState message={error ? 'Erro ao carregar notícias. Verifique se o servidor está online.' : 'Nenhuma notícia encontrada.'} />
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
          image={article.image}
        />
      ))}
    </section>
  );
};