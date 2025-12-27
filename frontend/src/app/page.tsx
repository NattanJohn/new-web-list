import { Suspense } from 'react';
import { HomeTemplate } from '@/components/templates/HomeTemplate/HomeTemplate';
import { ArticleList } from '@/components/organisms/ArticleList/ArticleList';
import { Skeleton } from '@/components/atoms';
import { api } from '@/services/api';
import type { Article, ArticlePageMeta } from '@/types';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

const ITEMS_PER_PAGE = 6;

export default async function HomePage({ 
  searchParams 
}: { 
  searchParams?: Promise<{ page?: string }> 
} = {}) {
  let initialArticles: Article[] = [];
  let initialMeta: ArticlePageMeta | null = null;
  let initialError: string | null = null;

  const params = await searchParams;
  const currentPage = Number.parseInt(params?.page || '1', 10) || 1;

  try {
    const { data, meta } = await api.getArticlesPaginated(currentPage, ITEMS_PER_PAGE);
    initialArticles = data;
    initialMeta = meta;
  } catch (error) {
    console.error('Erro ao carregar artigos no servidor:', error);
    initialError = 'Não foi possível carregar as notícias no momento.';
  }

  return (
    <>
      <HomeTemplate>
        <Suspense fallback={<Skeleton variant="list" />}>
          <ArticleList
            initialArticles={initialArticles}
            initialMeta={initialMeta}
            initialError={initialError}
            perPage={ITEMS_PER_PAGE}
          />
        </Suspense>
      </HomeTemplate>
    </>
  );
}