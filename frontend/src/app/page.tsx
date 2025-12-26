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

  const firstImage = initialArticles[0]?.image;

  return (
    <>
      {firstImage && (
        <link
          rel="preload"
          as="image"
          href={firstImage}
          imageSrcSet={`
            /_next/image?url=${encodeURIComponent(firstImage)}&w=640&q=75 640w,
            /_next/image?url=${encodeURIComponent(firstImage)}&w=750&q=75 750w,
            /_next/image?url=${encodeURIComponent(firstImage)}&w=828&q=75 828w
          `}
          imageSizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          fetchPriority="high"
        />
      )}
      <HomeTemplate>
        <Suspense fallback={<Skeleton variant="list" />}>
          <ArticleList initialArticles={initialArticles} initialError={initialError} />
        </Suspense>
      </HomeTemplate>
    </>
  );
}