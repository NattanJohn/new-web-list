'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PostCard } from '../../molecules/PostCard/PostCard';
import { Skeleton, Pagination } from '../../atoms';
import { EmptyState } from '../../atoms/EmptyState/EmptyState';
import { api } from '@/services/api';
import { handleApiError } from '@/utils/errorHandler';
import styles from './ArticleList.module.scss';
import type { Article, ArticlePageMeta } from '@/types';

interface ArticleListProps {
  initialArticles?: Article[];
  initialMeta?: ArticlePageMeta | null;
  initialError?: string | null;
  perPage: number;
}

export const ArticleList = ({ initialArticles = [], initialMeta = null, initialError = null, perPage }: ArticleListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [meta, setMeta] = useState<ArticlePageMeta | null>(initialMeta);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);
  const currentPage = Number(searchParams.get('page')) || 1;
  const previousPageRef = useRef(currentPage);

  // Scroll suave quando a página muda
  useEffect(() => {
    if (previousPageRef.current !== currentPage) {
      previousPageRef.current = currentPage;
      
      // Aguarda 2 frames de renderização para garantir layout completo
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    }
  }, [currentPage]);

  useEffect(() => {
    // Busca artigos ao montar se não veio do SSR ou sempre que a página mudar
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const { data, meta } = await api.getArticlesPaginated(currentPage, perPage);
        setArticles(data);
        setMeta(meta);
      } catch (err) {
        console.error('Erro ao carregar artigos:', err);
        setErrorMessage(handleApiError(err));
      } finally {
        setIsLoading(false);
      }
    };

    const noSSRData = !initialArticles || initialArticles.length === 0;
    const missingMetaForPage = meta && meta.page !== currentPage;

    if (noSSRData || missingMetaForPage) {
      void fetchArticles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, perPage]);

  const handlePageChange = (page: number) => {
    // Se clicou na mesma página, só faz scroll sem re-render
    if (page === currentPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Página diferente: muda URL (useEffect cuida do scroll)
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    
    const newUrl = params.toString() ? `/?${params.toString()}` : '/';
    router.push(newUrl, { scroll: false });
  };

  const total = meta?.total ?? articles.length;

  if (isLoading) {
    return (
      <div className={styles.mainWrapper} aria-busy="true" aria-live="polite">
        <Skeleton variant="list" />
      </div>
    );
  }

  if (errorMessage || !articles.length) {
    return (
      <div className={styles.emptyWrapper} role="alert" aria-live="assertive">
        <EmptyState
          title={errorMessage ? 'Ops! Algo deu errado' : 'Nenhuma notícia encontrada'}
          message={errorMessage ?? 'Aguarde novos conteúdos em breve.'}
          actions={[{ label: 'Tentar novamente', onClick: () => window.location.reload() }]}
        />
      </div>
    );
  }

  return (
    <div className={styles.mainWrapper} aria-busy={isLoading}>
      <section className={styles.grid} aria-label="Lista de notícias" aria-live="polite">
        {articles.map((article, index) => (
          <PostCard
            key={article.id ?? article.slug}
            slug={article.slug}
            title={article.title}
            summary={article.summary ?? ''}
            date={article.date ?? ''}
            image={article.image}
            category={article.category}
            priority={currentPage === 1 && index === 0}
          />
        ))}
      </section>

      <footer className={styles.paginationSection}>
        <Pagination
          total={total}
          current={currentPage}
          perPage={perPage}
          onPageChange={handlePageChange}
        />
      </footer>
    </div>
  );
};