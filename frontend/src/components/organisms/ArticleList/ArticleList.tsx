'use client';

import { useState, useEffect, useCallback } from 'react';
import { PostCard } from '../../molecules/PostCard/PostCard';
import { ArticleListSkeleton } from './ArticleListSkeleton';
import { EmptyState } from '../../atoms/EmptyState/EmptyState';
import { api, ApiError } from '@/services/api';
import styles from './ArticleList.module.scss';
import type { Article } from '@/types';

export const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const data = await api.getArticles();
      setArticles(data);
    } catch (err) {
      console.error('Erro ao carregar artigos:', err);
      if (err instanceof ApiError) {
        setErrorMessage(err.message || 'Erro na requisição');
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Erro desconhecido');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  if (isLoading) return <ArticleListSkeleton />;

  const isEmpty = !articles || articles.length === 0;

  if (errorMessage || isEmpty) {
    const isNetwork = errorMessage?.toLowerCase().includes('network') || false;

    return (
      <section className={`${styles.container} ${'centerMain'}`} aria-label="Lista de artigos">
        <div className={styles.emptyFullscreen}>
          <EmptyState
            title={errorMessage ? 'Não foi possível carregar as notícias' : 'Nenhuma notícia disponível'}
            message={
              errorMessage
                ? isNetwork
                  ? 'Parece que você está offline ou o servidor está indisponível. Tente reconectar.'
                  : errorMessage
                : 'Atualmente não há notícias para exibir. Volte mais tarde.'
            }
            actions={[{ label: 'Tentar novamente', onClick: () => loadArticles() }]}
          />
        </div>
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