import articlesData from '@/data/news.json';
import { notFound } from 'next/navigation';
import { HomeTemplate } from '@/components/templates/HomeTemplate/HomeTemplate';
import { ArticleDetail } from '@/components/organisms/ArticleDetail/ArticleDetail';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesData.find((a) => a.slug === slug);
  
  return {
    title: article ? `${article.title} | Gazeta News` : 'Artigo não encontrado',
    description: article?.summary || 'Detalhes do artigo',
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articlesData.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <HomeTemplate>
      <ArticleDetail article={article} />
    </HomeTemplate>
  );
}