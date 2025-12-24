'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { PostCard } from '../../molecules/PostCard/PostCard';
import { SkeletonList, Pagination } from '../../atoms';
import { EmptyState } from '../../atoms/EmptyState/EmptyState';
import { api, ApiError } from '@/services/api';
import styles from './ArticleList.module.scss';
import type { Article } from '@/types';

const ITEMS_PER_PAGE = 6;

export const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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
      } else {
        setErrorMessage('Não foi possível conectar ao servidor');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10);

    return () => clearTimeout(timer);
  }, [currentPage]);

  const total = articles.length;

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return articles.slice(start, start + ITEMS_PER_PAGE);
  }, [articles, currentPage]);

  if (isLoading) return <SkeletonList />;

  if (errorMessage || !articles.length) {
    return (
      <div className={styles.emptyWrapper}>
        <EmptyState
          title={errorMessage ? 'Ops! Algo deu errado' : 'Nenhuma notícia encontrada'}
          message={errorMessage ?? 'Aguarde novos conteúdos em breve.'}
          actions={[{ label: 'Tentar novamente', onClick: loadArticles }]}
        />
      </div>
    );
  }

  return (
    <div className={styles.mainWrapper}>
      <section className={styles.grid} aria-label="Lista de notícias">
        {paginated.map((article) => (
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

      <footer className={styles.paginationSection}>
        <Pagination
          total={total}
          current={currentPage}
          perPage={ITEMS_PER_PAGE}
          onPageChange={(p) => setCurrentPage(p)}
        />
      </footer>
    </div>
  );
};