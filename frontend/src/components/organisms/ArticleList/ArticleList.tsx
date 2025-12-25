'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PostCard } from '../../molecules/PostCard/PostCard';
import { Skeleton, Pagination } from '../../atoms';
import { EmptyState } from '../../atoms/EmptyState/EmptyState';
import { api } from '@/services/api';
import { handleApiError } from '@/utils/errorHandler';
import styles from './ArticleList.module.scss';
import type { Article } from '@/types';

const ITEMS_PER_PAGE = 6;

interface ArticleListProps {
  initialArticles?: Article[];
  initialError?: string | null;
}

export const ArticleList = ({ initialArticles = [], initialError = null }: ArticleListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);
  const currentPage = Number(searchParams.get('page')) || 1;

  const loadArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const data = await api.getArticles();
      setArticles(data);
    } catch (err) {
      console.error('Erro ao carregar artigos:', err);
      setErrorMessage(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialArticles || initialArticles.length === 0) {
      void loadArticles();
    }
  }, [initialArticles, loadArticles]);

  useEffect(() => {
    if (!articles || !articles.length) return;
    if (currentPage !== 1) return;

    const first = articles[0];
    const url = first?.image;
    if (!url) return;

    try {
      const existing = Array.from(document.querySelectorAll('link[rel="preload"][as="image"]')).find(
        (l) => (l as HTMLLinkElement).href === url
      );
      if (existing) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      link.setAttribute('fetchpriority', 'high');
      document.head.appendChild(link);
    } catch {
    }
  }, [articles, currentPage]);

  const handlePageChange = (page: number) => {
    // Atualizar URL com nova página
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('page'); // Remove ?page=1 para URL limpa
    } else {
      params.set('page', String(page));
    }
    
    const newUrl = params.toString() ? `/?${params.toString()}` : '/';
    router.push(newUrl, { scroll: false });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const total = articles.length;

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return articles.slice(start, start + ITEMS_PER_PAGE);
  }, [articles, currentPage]);

  if (isLoading) return <div aria-busy="true" aria-live="polite"><Skeleton variant="list" /></div>;

  if (errorMessage || !articles.length) {
    return (
      <div className={styles.emptyWrapper} role="alert" aria-live="assertive">
        <EmptyState
          title={errorMessage ? 'Ops! Algo deu errado' : 'Nenhuma notícia encontrada'}
          message={errorMessage ?? 'Aguarde novos conteúdos em breve.'}
          actions={[{ label: 'Tentar novamente', onClick: loadArticles }]}
        />
      </div>
    );
  }

  return (
    <div className={styles.mainWrapper} aria-busy={isLoading}>
      <section className={styles.grid} aria-label="Lista de notícias" aria-live="polite">
        {paginated.map((article, index) => (
          <PostCard
            key={article.id ?? article.slug}
            slug={article.slug}
            title={article.title}
            summary={article.summary ?? ''}
            date={article.date ?? ''}
            image={article.image}
            priority={currentPage === 1 && index === 0}
          />
        ))}
      </section>

      <footer className={styles.paginationSection}>
        <Pagination
          total={total}
          current={currentPage}
          perPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </footer>
    </div>
  );
};