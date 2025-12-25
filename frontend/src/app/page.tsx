import { HomeTemplate } from '@/components/templates/HomeTemplate/HomeTemplate';
import { ArticleList } from '@/components/organisms/ArticleList/ArticleList';
import { api } from '@/services/api';
import type { Article } from '@/types';

export const revalidate = 60; 

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
      <ArticleList initialArticles={initialArticles} initialError={initialError} />
    </HomeTemplate>
  );
}