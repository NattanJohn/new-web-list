import { Metadata } from "next";
import { api } from "@/services/api";
import { ArticleTemplate } from "@/components/templates";
import { ArticleDetail } from "@/components/organisms/ArticleDetail/ArticleDetail";
import { ScrollToTop } from "@/components/atoms";
import NotFound from "@/app/not-found";
import { SITE_CONFIG } from "@/lib/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await api.getArticleBySlug(slug);

    if (!article) {
      return { title: "Artigo não encontrado" };
    }

    const description =
      article.summary ?? (article.content ? `${String(article.content).slice(0, 160).trim()}...` : "Leia a notícia completa na Gazeta News");

    return {
      title: article.title,
      description,
      alternates: {
        canonical: `/article/${slug}`,
      },
      openGraph: {
        title: article.title,
        description,
        images: article.image ? [{ url: article.image }] : [],
        type: "article",
        publishedTime: article.date,
        authors: article.author ? [article.author] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description,
        images: article.image ? [article.image] : undefined,
      },
    };
  } catch {
    return { title: "Gazeta News" };
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await api.getArticleBySlug(slug);

  if (!article) {
    return <NotFound />;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url || 'http://localhost:3000';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary || article.content?.slice(0, 160),
    image: article.image,
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: article.author || 'Gazeta News',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Gazeta News',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleTemplate>
        <ScrollToTop>
          <ArticleDetail article={article} />
        </ScrollToTop>
      </ArticleTemplate>
    </>
  );
}
