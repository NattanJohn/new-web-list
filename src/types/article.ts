export type Article = {
  id?: string | number;
  slug: string;
  title: string;
  summary?: string;
  date?: string;
};

export type ArticleList = Article[];
