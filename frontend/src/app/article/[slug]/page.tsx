import { Metadata } from "next";
import { api } from "@/services/api";
import { HomeTemplate } from "@/components/templates/HomeTemplate/HomeTemplate";
import { ArticleDetail } from "@/components/organisms/ArticleDetail/ArticleDetail";
import NotFound from "@/app/not-found";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await api.getArticleBySlug(slug);

    if (!article) {
      return { title: "Artigo não encontrado | Gazeta News" };
    }

    const description =
      article.summary ?? (article.content ? `${String(article.content).slice(0, 160).trim()}...` : "Leia a notícia completa na Gazeta News");

    return {
      title: `${article.title} | Gazeta News`,
      description,
      openGraph: {
        title: article.title,
        description,
        images: article.image ? [{ url: article.image }] : [],
        type: "article",
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

  return (
    <HomeTemplate>
      <ArticleDetail article={article} />
    </HomeTemplate>
  );
}
