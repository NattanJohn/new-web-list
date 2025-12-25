import { Suspense } from 'react';
import { HomeTemplate } from '@/components/templates/HomeTemplate/HomeTemplate';
import { ArticleList } from '@/components/organisms/ArticleList/ArticleList';
import { Skeleton } from '@/components/atoms';
import { api } from '@/services/api';
import type { Article } from '@/types';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default async function HomePage() {
  let initialArticles: Article[] = [];
  let initialError: string | null = null;

  try {
    initialArticles = await api.getArticles();
  } catch (error) {
    console.error('Erro ao carregar artigos no servidor:', error);
    initialError = 'Não foi possível carregar as notícias no momento.';
  }

  return (
    <HomeTemplate>
      <Suspense fallback={<Skeleton variant="list" />}>
        <ArticleList initialArticles={initialArticles} initialError={initialError} />
      </Suspense>
    </HomeTemplate>
  );
}